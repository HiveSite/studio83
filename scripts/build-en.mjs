import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {services} from '../src/data/services.mjs';
import {servicesEn} from '../src/data/services.en.mjs';
import {industries} from '../src/data/industries.mjs';
import {industriesEn} from '../src/data/industries.en.mjs';
import {cases} from '../src/data/cases.mjs';
import {casesEn} from '../src/data/cases.en.mjs';
import {uiEn} from '../src/i18n/en-ui.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist=path.join(root,'dist');
const translations=new Map(Object.entries(uiEn));
const missing=new Map();
const skipKeys=new Set(['slug','accent','id','category','cover','url','href']);
function align(sr,en,key='') {
  if (Array.isArray(sr)&&Array.isArray(en)) {
    if(sr.length!==en.length)throw new Error('Content structure mismatch at '+key);
    sr.forEach((x,i)=>align(x,en[i],key+'.'+i)); return;
  }
  if(sr&&en&&typeof sr==='object'&&typeof en==='object'){
    for(const k of Object.keys(sr)){
      if(!(k in en))throw new Error('EN field missing: '+key+'.'+k);
      align(sr[k],en[k],k);
    }
    return;
  }
  if(typeof sr==='string' && typeof en==='string' && !skipKeys.has(key)){
    if(sr!==en){
      const prev=translations.get(sr);
      if(prev && prev!==en)throw new Error('Conflicting translation: '+sr);
      translations.set(sr,en);
    }
  }
}
align(services,servicesEn,'services');
align(industries,industriesEn,'industries');
align(cases,casesEn,'cases');
const entityDecode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const escapeText=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function translateText(raw,route) {
  const trim=raw.trim();
  if(!trim)return raw;
  const decoded=entityDecode(trim);
  let translated=translations.get(decoded)??translations.get(trim);
  if(!translated){
    if(/^[\d\s€+%.,:!?#/\-]+$/.test(decoded) || /^\$\{/.test(decoded) ||
      /^(Sindikat Studio 83|ImaPosla.me|Instagram|Email|Meta|Google|GA4|GTM|Web|FAQ)$/.test(decoded))return raw;
    missing.set(decoded,(missing.get(decoded)||new Set()).add(route));
    return raw;
  }
  if(translated.startsWith('od ')&&/€/.test(translated)) translated=translated.replace(/^od\s+([\d.,]+)\s*€/,'from €$1');
  if(translated==='po ponudi')translated='on request';
  if(translated==='po specifikaciji')translated='as specified';
  return raw.replace(trim,escapeText(translated));
}
function englishRoute(sr) {return sr==='/'?'/en/':'/en'+sr;}
function localize(html,srRoute) {
  const enRoute=englishRoute(srRoute);
  let transformed=html;
  // Text nodes only. Never alter embedded JSON, inline JS, CSS or SVG source.
  transformed=transformed.replace(/(<(?:script|style|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|svg)>|<[^>]+>|[^<]+)/gi,(token)=>{
    if(token.startsWith('<'))return token;
    return translateText(token,srRoute);
  });
  transformed=transformed.replace(/\b(alt|placeholder|aria-label|title)="([^"]*)"/g,(_,k,v)=>k+'="'+translateText(v,srRoute).replace(/"/g,'&quot;')+'"');
  transformed=transformed.replace(/(<meta\s+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"\s+content=")([^"]+)(")/gi,(_,a,v,c)=>a+translateText(v,srRoute).replace(/"/g,'&quot;')+c);
  transformed=transformed.replace(/<html lang="sr-ME">/,'<html lang="en">');
  transformed=transformed.replace(/<meta property="og:locale" content="sr_ME">/,'<meta property="og:locale" content="en_US">');
  transformed=transformed.replace(/(<link rel="canonical" href=")[^"]+(")/,(_,a,b)=>a+'https://www.sindikatstudio83.me'+enRoute+b);
  transformed=transformed.replace(/(<meta property="og:url" content=")[^"]+(")/,(_,a,b)=>a+'https://www.sindikatstudio83.me'+enRoute+b);
  transformed=transformed.replace(/<head>/,'<head>\n  <link rel="alternate" hreflang="sr-ME" href="https://www.sindikatstudio83.me'+srRoute+'">\n  <link rel="alternate" hreflang="en" href="https://www.sindikatstudio83.me'+enRoute+'">\n  <link rel="alternate" hreflang="x-default" href="https://www.sindikatstudio83.me'+srRoute+'">');
  transformed=transformed.replace(/href="\/(?!\/|images\/|assets\/|favicon|en\/)([^"]*)"/g,(_,rest)=>'href="/en/'+rest+'"');
  const switcher='<a class="language-switch" href="'+srRoute+'" lang="sr-ME" hreflang="sr-ME" aria-label="Switch to Montenegrin">SR</a>';
  transformed=transformed.replace(/(<div class="nav-actions">)/,'$1'+switcher);
  return transformed;
}
const pages=[];
function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(entry.name==='en'||entry.name==='sr-me')continue;
    const file=path.join(dir,entry.name);
    if(entry.isDirectory())walk(file);
    else if(entry.name==='index.html'&&!file.includes('/sr-me/')){
      const rel=path.relative(dist,file).replaceAll('\\','/');
      const route=rel==='index.html'?'/':'/'+rel.replace(/index\.html$/,'');
      pages.push({file,route});
    }
  }
}
walk(dist);
for(const {file,route} of pages) {
  const html=fs.readFileSync(file,'utf8');
  const output=path.join(dist,englishRoute(route).replace(/^\//,''),'index.html');
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.writeFileSync(output,localize(html,route));
}
const report=[...missing].map(([source,routes])=>({source,routes:[...routes]}));
const out=path.join(root,'reports','en-untranslated.json');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,JSON.stringify({pages:pages.length,missing:report.length,items:report},null,2)+'\n');
console.log('Generated '+pages.length+' EN structural mirrors. Missing translations: '+report.length);
if(report.length){
 console.error('English build is NOT release-ready. See reports/en-untranslated.json');
 process.exitCode=1;
}
