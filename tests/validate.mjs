import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const files=[];
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).forEach(entry=>{const full=path.join(dir,entry.name);entry.isDirectory()?walk(full):files.push(full)});
walk(root);
const htmlFiles=files.filter(file=>file.endsWith('.html'));
const errors=[];
const warnings=[];
const routes=new Set(htmlFiles.map(file=>{
  const rel=path.relative(root,file).replaceAll('\\','/');
  if(rel==='index.html')return '/';
  if(rel==='404.html')return '/404.html';
  return '/'+rel.replace(/index\.html$/,'');
}));
for(const file of htmlFiles){
  const html=fs.readFileSync(file,'utf8');
  const rel=path.relative(root,file).replaceAll('\\','/');
  const isRedirect = /http-equiv="refresh"/i.test(html) && /noindex,follow/i.test(html);
  if(!/<title>[^<]{10,}<\/title>/i.test(html))errors.push(`${rel}: missing/short title`);
  if(!isRedirect){
    if(!/<meta name="description" content="[^"]{50,}"/i.test(html)&&rel!=='404.html')errors.push(`${rel}: missing/short description`);
    if(!/<h1[ >]/i.test(html))errors.push(`${rel}: missing h1`);
    if(!/G-NH2FL5SP1Y/.test(html)||!/GTM-PBXVW3GK/.test(html))errors.push(`${rel}: analytics IDs not preserved`);
  }
  if(!/<link rel="canonical" href="https:\/\/www\.sindikatstudio83\.me\//i.test(html))errors.push(`${rel}: missing canonical`);
  if(/https:\/\/images\.unsplash\.com|pinterest|squarespace-cdn|posaouturizmu/i.test(html))errors.push(`${rel}: external hotlinked image`);
  if(/<style[ >]/i.test(html))warnings.push(`${rel}: inline style block`);
  const hrefs=[...html.matchAll(/href="(\/[^"]*)"/g)].map(m=>m[1].split('#')[0].split('?')[0]);
  for(const href of hrefs){
    if(!href||href.startsWith('/assets/')||href.startsWith('/images/')||href==='/favicon.png'||href.endsWith('.xml'))continue;
    const normalized=href.endsWith('/')||href.endsWith('.html')?href:`${href}/`;
    if(!routes.has(normalized)&&!fs.existsSync(path.join(root,href.replace(/^\//,''))))errors.push(`${rel}: broken internal link ${href}`);
  }
}
const css=fs.readFileSync(path.join(root,'assets/styles.css'),'utf8');
const js=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
if(css.length>120000)warnings.push(`styles.css is large: ${css.length}`);
if(js.length>50000)warnings.push(`app.js is large: ${js.length}`);
console.log(`Validated ${htmlFiles.length} HTML files, ${routes.size} routes.`);
if(warnings.length)console.log(`Warnings (${warnings.length}):\n- ${warnings.slice(0,20).join('\n- ')}`);
if(errors.length){console.error(`Errors (${errors.length}):\n- ${errors.slice(0,100).join('\n- ')}`);process.exit(1)}
console.log('Validation passed.');
