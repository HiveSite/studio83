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
import {pagesEn} from '../src/i18n/en-pages.mjs';
import {moreEn} from '../src/i18n/en-more.mjs';
import {tailEn} from '../src/i18n/en-tail.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist=path.join(root,'dist');
const translations=new Map([...Object.entries(uiEn),...Object.entries(pagesEn),...Object.entries(moreEn),...Object.entries(tailEn)]);
const blogPosts=JSON.parse(fs.readFileSync(path.join(root,'src/data/blog-posts.json'),'utf8'));
const blogEnglish=new Map();
for(const post of blogPosts){
  const file=path.join(root,'src/i18n/blog-en',post.slug+'.json');
  if(!fs.existsSync(file)){
    missingPlaceholder(post.slug);
    continue;
  }
  const en=JSON.parse(fs.readFileSync(file,'utf8'));
  for(const field of ['title','excerpt','description','coverAlt']){
    if(!en[field] || typeof en[field]!=='string')throw new Error('Missing '+field+' in '+file);
    if(post[field]!==en[field])translations.set(post[field],en[field]);
  }
  if(!Array.isArray(en.tags)||en.tags.length!==post.tags.length)throw new Error('Tag mismatch: '+post.slug);
  post.tags.forEach((value,i)=>{if(value!==en.tags[i])translations.set(value,en.tags[i])});
  if(!Array.isArray(en.segments))throw new Error('Body translations missing: '+post.slug);
  blogEnglish.set(post.slug,en);
}
function missingPlaceholder(slug) { console.warn('English article missing: '+slug); }

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
function dynamicLabel(value){
  for(let i=0;i<industries.length;i++){
    const source=industries[i].title.toLowerCase();
    const english=industriesEn[i].title.toLowerCase();
    if(value==='Marketing za '+source+' u Crnoj Gori') return 'Marketing for '+english+' in Montenegro';
    if(value==='Složi plan za '+source+'.') return 'Plan for '+english+'.';
  }
  return null;
}
const unchangedEnglish = new Set(['Performance','Studio','Breadcrumb','Podgorica','UGC','checklist','event marketing','remarketing','case study','Meta Ads','funnel','Google Ads','CTA','CPC','CPL','SEO','Local SEO','Google Maps','Google Business','Performance marketing','Web + CRO','Creative system','Recruitment growth','Recruitment sprint','Creative plan','Website','Instagram Comment Picker','@username','SINDIKAT STUDIO 83','Instagram tool','Random comment picker','Paste post. Load comments. Pick a winner.','Load comments','RANDOM DRAW','READY','Start draw','Admin / preview','Test mode','Comments','©','↗','×']);
const specialBrand = /^(?:[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|@sindikat_studio83|https?:\/\/\S+|marko@email\.com \/ \+382\.\.\.)$/i;
function translateText(raw,route) {
  const trim=raw.trim();
  if(!trim||trim==='__SINDIKAT_EN_ARTICLE_SLOT__')return raw;
  const decoded=entityDecode(trim);
  if(/^od\s+[\d.,]+\s*€(?:\s*\/\s*mj\.)?$/i.test(decoded)) {
    return raw.replace(trim,decoded.replace(/^od\s+([\d.,]+)\s*€(?:\s*\/\s*mj\.)?$/i,(_all,value)=>'from €'+value+(decoded.includes('/ mj.')?' / month':'')));
  }
  // Compound document titles retain the brand suffix, translate their page title.
  const suffix=' | Sindikat Studio 83';
  if(decoded.endsWith(suffix)){
    const originalTitle=decoded.slice(0,-suffix.length);
    const localizedTitle=translations.get(originalTitle)??dynamicLabel(originalTitle);
    if(localizedTitle) return raw.replace(trim,escapeText(localizedTitle+suffix));
  }
  let translated=translations.get(decoded)??translations.get(trim)??dynamicLabel(decoded);
  if(!translated){
    if(unchangedEnglish.has(decoded) || specialBrand.test(decoded) || /^[\d\s€+%.,:!?#/\-]+$/.test(decoded) || /^\$\{/.test(decoded) ||
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
  // Preserve backend form values: original option text is the submitted value
  // where the HTML option has no explicit value attribute.
  transformed=transformed.replace(/<option>([^<]+)<\/option>/gi,(_whole,label)=>
    '<option value="'+label.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'">'+label+'</option>');
  // Text nodes only. Never alter embedded JSON, inline JS, CSS or SVG source.
  transformed=transformed.replace(/(<(?:script|style|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|svg)>|<[^>]+>|[^<]+)/gi,(token)=>{
    if(token.startsWith('<'))return token;
    return translateText(token,srRoute);
  });
  transformed=transformed.replace(/\b(alt|placeholder|aria-label|title)="([^"]*)"/g,(_,k,v)=>k+'="'+translateText(v,srRoute).replace(/"/g,'&quot;')+'"');
  transformed=transformed.replace(/(<meta\s+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"\s+content=")([^"]+)(")/gi,(_,a,v,c)=>a+translateText(v,srRoute).replace(/"/g,'&quot;')+c);
  // Localize status messages generated by the standalone comment-picker app.
  if(srRoute==='/comment-picker/'){
    const pickerMessages=new Map([
      [' komentara',' comments'],
      [' eligible entries',' eligible entries'],
      ['Otvori post','Open post'],
      ['Još nema učitanih komentara.','No comments have been loaded yet.'],
      ['Odaberi username za preview','Select a username to preview'],
      ['Učitavanje...','Loading...'],
      ['Nije moguće učitati komentare.','Unable to load comments.'],
      ['Post je pronađen, ali nema dostupnih komentara.','The post was found, but no comments are available.'],
      ['Greška pri učitavanju komentara.','An error occurred while loading comments.']
    ]);
    for(const [from,to] of pickerMessages){
      // HTML has already been localized; this only affects embedded JS strings.
      transformed=transformed.replaceAll(from,to);
    }
  }
  transformed=transformed.replace(/<html lang="sr-ME">/,'<html lang="en">');
  transformed=transformed.replace(/<meta property="og:locale" content="sr_ME">/,'<meta property="og:locale" content="en_US">');
  transformed=transformed.replace(/(<link rel="canonical" href=")[^"]+(")/,(_,a,b)=>a+'https://www.sindikatstudio83.me'+enRoute+b);
  transformed=transformed.replace(/(<meta property="og:url" content=")[^"]+(")/,(_,a,b)=>a+'https://www.sindikatstudio83.me'+enRoute+b);
  transformed=transformed.replace(/<head>/,'<head>\n  <link rel="alternate" hreflang="sr-ME" href="https://www.sindikatstudio83.me'+srRoute+'">\n  <link rel="alternate" hreflang="en" href="https://www.sindikatstudio83.me'+enRoute+'">\n  <link rel="alternate" hreflang="x-default" href="https://www.sindikatstudio83.me'+srRoute+'">');
  transformed=transformed.replace(/href="\/(?!\/|images\/|assets\/|favicon|en\/)([^"]*)"/g,(_,rest)=>'href="/en/'+rest+'"');
  const switcher='<a class="language-switch" href="'+srRoute+'" lang="sr-ME" hreflang="sr-ME" aria-label="Switch to Montenegrin">SR</a>';
  transformed=transformed.replace(/(<div class="nav-actions">)/,'$1'+switcher);
  transformed=transformed.replace(/(<nav aria-label="Mobilna navigacija">)/,'$1'+switcher);

  return transformed;
}
for(const post of blogPosts) {
 if(!blogEnglish.has(post.slug)) missing.set('Untranslated full blog article: '+post.slug,new Set(['/blog/'+post.slug+'/']));
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
  let html=fs.readFileSync(file,'utf8');
  const match=route.match(/^\/blog\/(p\d+)\/$/);
  let translatedBody=null;
  if(match&&blogEnglish.has(match[1])){
    const startTag='<div class="article-content" id="article-content">';
    const start=html.indexOf(startTag);
    const begin=start+startTag.length;
    const finish=html.indexOf('</div></div></section></article>',begin);
    if(start<0||finish<0)throw new Error('Article body markup changed: '+route);
    const original=html.slice(begin,finish);
    const segments=blogEnglish.get(match[1]).segments;
    let n=0;
    translatedBody=original.replace(/>([^<>]+)</g,(whole,v)=>{
      if(!v.trim()||!/[A-Za-zÀ-ž]/.test(v))return whole;
      if(n>=segments.length)throw new Error('Not enough article translations for '+route);
      const translated=segments[n++];
      if(typeof translated!=='string'||!translated.trim())throw new Error('Empty article segment '+route+' #'+n);
      return '>'+escapeText(translated)+'<';
    });
    if(n!==segments.length)throw new Error('Extra article translations for '+route+': '+n+' / '+segments.length);
    html=html.slice(0,begin)+'__SINDIKAT_EN_ARTICLE_SLOT__'+html.slice(finish);
  }
  const output=path.join(dist,englishRoute(route).replace(/^\//,''),'index.html');
  fs.mkdirSync(path.dirname(output),{recursive:true});
  let localized=localize(html,route);
  if(translatedBody!==null)localized=localized.replace('__SINDIKAT_EN_ARTICLE_SLOT__',translatedBody);
  fs.writeFileSync(output,localized);
}
// Ensure the Serbian page has reciprocal SEO references and a language switch.
for(const {file,route} of pages) {
  if(route.startsWith('/comment-picker/')) continue;
  let sr=fs.readFileSync(file,'utf8');
  const enRoute=englishRoute(route);
  if(!sr.includes('hreflang="en"')){
    const alternates='<link rel="alternate" hreflang="sr-ME" href="https://www.sindikatstudio83.me'+route+'">\n  <link rel="alternate" hreflang="en" href="https://www.sindikatstudio83.me'+enRoute+'">\n  <link rel="alternate" hreflang="x-default" href="https://www.sindikatstudio83.me'+route+'">';
    sr=sr.replace('<head>','<head>\n  '+alternates);
  }
  const localeSwitch='<a class="language-switch" href="'+enRoute+'" lang="en" hreflang="en" aria-label="Switch to English">EN</a>';
  sr=sr.replace(/(<div class="nav-actions">)/,'$1'+localeSwitch);
  sr=sr.replace(/(<nav aria-label="Mobilna navigacija">)/,'$1'+localeSwitch);
  fs.writeFileSync(file,sr);
}
const report=[...missing].map(([source,routes])=>({source,routes:[...routes]}));
const out=path.join(root,'reports','en-untranslated.json');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,JSON.stringify({pages:pages.length,missing:report.length,items:report},null,2)+'\n');
console.log('Generated '+pages.length+' EN structural mirrors. Missing translations: '+report.length);
if(report.length) report.forEach((item,index)=>console.log('UNTRANSLATED '+String(index+1).padStart(3,'0')+': '+JSON.stringify(item)));
if(report.length){
 console.error('English build is NOT release-ready. See reports/en-untranslated.json');
 process.exitCode=1;
}
