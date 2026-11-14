import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist=path.join(root,'dist');
const domain='http://127.0.0.1';
const issues=[];
const screenDir=path.join(root,'reports','screenshots');
fs.mkdirSync(screenDir,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.json':'application/json','.xml':'application/xml'};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  const resolved=path.resolve(dist,pathname.replace(/^\/+/,''));
  if(!resolved.startsWith(dist+path.sep)&&resolved!==dist){res.writeHead(403).end('Forbidden');return;}
  const file=fs.existsSync(resolved)&&fs.statSync(resolved).isDirectory()?path.join(resolved,'index.html'):resolved;
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end('Not found');return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const port=server.address().port;
const url=route=>domain+':'+port+route;
const routes=[];
function walk(folder){
  for(const entry of fs.readdirSync(folder,{withFileTypes:true})){
    const file=path.join(folder,entry.name);
    if(entry.name==='en' || entry.name==='sr-me' || entry.name==='comment-picker')continue;
    if(entry.isDirectory())walk(file);
    else if(entry.name==='index.html'){
      const rel=path.relative(dist,file).replaceAll('\\','/');
      const route=rel==='index.html'?'/':'/'+rel.slice(0,-'index.html'.length);
      const body=fs.readFileSync(file,'utf8');
      if(!/name="robots" content="noindex/i.test(body) && !/http-equiv="refresh"/i.test(body))routes.push(route);
    }
  }
}
walk(dist);
routes.sort();
const representative=new Set(['/','/usluge/','/usluge/performance-marketing/','/industrije/','/radovi/','/radovi/battlebots-arena/','/blog/','/blog/p01/','/o-nama/','/kontakt/','/postani-dio-tima/','/privatnost/']);
const deviceWidths=[390,768,1440];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
let checked=0;
try{
for(const width of deviceWidths){
  const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
  const page=await context.newPage();
  const srRendered=new Map();
  page.setDefaultTimeout(7000);
  let pageError=[];
  page.on('pageerror',err=>pageError.push(err.message));
  for(const sr of routes){
    for(const locale of ['sr','en']){
      const route=locale==='en'?(sr==='/'?'/en/':'/en'+sr):sr;
      pageError=[];
      const response=await page.goto(url(route),{waitUntil:'domcontentloaded',timeout:15000}).catch(err=>{issues.push({route,width,kind:'navigation',detail:err.message});return null});
      if(!response||response.status()!==200){issues.push({route,width,kind:'http',detail:response?.status()||'no response'});continue}
      const state=await page.evaluate(()=>{
        const doc=document.documentElement;
        const controls=[...document.querySelectorAll('a,button,input,textarea,select')].filter(el=>{
          const cs=getComputedStyle(el);
          const r=el.getBoundingClientRect();
          return cs.display!=='none' && cs.visibility!=='hidden' && r.width>0 && r.height>0 && !el.closest('[hidden]');
        });
        const tiny=controls.filter(el=>el.tagName==='BUTTON' && el.getBoundingClientRect().height<28).map(el=>el.textContent.trim().slice(0,35));
        const anchors=[...document.querySelectorAll('a.language-switch')];
        return {
          lang:doc.lang,
          overflow:Math.max(doc.scrollWidth,document.body.scrollWidth)-innerWidth,
          offenders:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect(); const cs=getComputedStyle(el);return r.width>0&&cs.position!=='fixed'&&r.right>innerWidth+3}).slice(0,12).map(el=>({tag:el.tagName,cls:String(el.className).slice(0,90),id:el.id,parent:el.parentElement?.className,grandparent:el.parentElement?.parentElement?.className,text:el.textContent?.trim().slice(0,70),html:el.outerHTML.slice(0,180),right:Math.round(el.getBoundingClientRect().right),width:Math.round(el.getBoundingClientRect().width)})),
          h1:document.querySelectorAll('h1').length,
          missingAsset:[...document.querySelectorAll('link[rel="stylesheet"],script[src]')].filter(el=>el.src?.includes('127.0.0.1')&&el.sheet===null&&el.tagName==='LINK').map(el=>el.href),
          switches:anchors.map(a=>a.getAttribute('href')),
          rendered: {
            sections:document.querySelectorAll('main > section').length,
            h2:document.querySelectorAll('main h2').length,
            h3:document.querySelectorAll('main h3').length,
            form:document.querySelectorAll('main form').length,
            salesAreas:document.querySelectorAll('.sales-area-card').length,
            salesModels:document.querySelectorAll('.sales-model-card').length,
            salesChooser:document.querySelectorAll('[data-sales-chooser]').length,
            salesHome:document.body.classList.contains('sales-home'),
            salesServices:document.body.classList.contains('sales-service-index'),
            salesContact:document.body.classList.contains('sales-contact'),
            mainText:document.querySelector('main')?.innerText.slice(0,1000)||'',
            structure:[...document.querySelectorAll('main *')].map(el=>{
              const tag=el.tagName.toLowerCase();
              const attr=(el.getAttribute('class')||'').trim().replace(/\\s+/g,' ');
              return tag+'#'+(el.id||'')+'.'+attr;
            }),
            texts:(()=>{
              const m=document.querySelector('main');
              const w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT);
              const out=[];
              while(w.nextNode()){
                const n=w.currentNode;
                const v=n.nodeValue.replace(/\\s+/g,' ').trim();
                if(!v||n.parentElement.closest('script,style,noscript'))continue;
                out.push({tag:n.parentElement.tagName.toLowerCase(),value:v});
              }
              return out;
            })(),
            links:[...document.querySelectorAll('main a[href]')].map(el=>el.getAttribute('href')),
            forms:[...document.querySelectorAll('main input,main select,main textarea,main button')].map(el=>({
              tag:el.tagName.toLowerCase(),type:el.getAttribute('type')||'',
              name:el.getAttribute('name')||'',required:el.required||false,
              disabled:el.disabled||false,
              values:el.tagName==='SELECT'?[...el.options].map(o=>o.value):null
            }))
          },
          tinyButtons:tiny
        };
      });
      if(state.overflow>4)issues.push({route,width,kind:'horizontal overflow',detail:state.overflow+'px '+JSON.stringify(state.offenders)});
      if(state.h1!==1)issues.push({route,width,kind:'heading count',detail:state.h1});
      if(state.lang!==(locale==='en'?'en':'sr-ME'))issues.push({route,width,kind:'html lang',detail:state.lang});
      const expected=locale==='en'?sr:(sr==='/'?'/en/':'/en'+sr);
      if(!state.switches.includes(expected))issues.push({route,width,kind:'language switch missing',detail:expected+' got '+state.switches.join(',')});
      if(pageError.length)issues.push({route,width,kind:'javascript exception',detail:pageError.slice(0,3).join(' | ')});
      if(state.missingAsset.length)issues.push({route,width,kind:'stylesheet missing',detail:state.missingAsset.join(',')});
      if(state.tinyButtons.length)issues.push({route,width,kind:'tiny buttons',detail:state.tinyButtons.join(',')});
      if(locale==='sr') srRendered.set(sr,state.rendered);
      if(locale==='en'){
        const original=srRendered.get(sr);
        const actual=state.rendered;
        if(original){
          for(const key of ['structure','forms']){
            const source=original[key],english=actual[key];
            if(source.length!==english.length){
              issues.push({route,width,kind:'strict DOM '+key+' count mismatch',detail:'SR '+source.length+' vs EN '+english.length});
            }else{
              let differences=0;
              for(let k=0;k<source.length;k++){
                if(JSON.stringify(source[k])!==JSON.stringify(english[k])){
                  if(differences++<5)issues.push({route,width,kind:'strict DOM '+key+' mismatch',detail:k+': SR '+JSON.stringify(source[k]).slice(0,140)+' EN '+JSON.stringify(english[k]).slice(0,140)});
                }
              }
            }
          }
          if(original.texts.length!==actual.texts.length){
            issues.push({route,width,kind:'strict text node count mismatch',detail:'SR '+original.texts.length+' vs EN '+actual.texts.length});
          }else{
            let same=0;
            for(let k=0;k<original.texts.length;k++){
              const a=original.texts[k],b=actual.texts[k];
              if(a.tag!==b.tag) {
                if(same++<3)issues.push({route,width,kind:'text node alignment',detail:k+' '+a.tag+' vs '+b.tag});
                continue;
              }
              const v=a.value;
              if(v===b.value && /[čćžšđČĆŽŠĐ]/.test(v) && v.length>6 && same++<5){
                issues.push({route,width,kind:'Serbian text remains in English',detail:k+': '+v.slice(0,180)});
              }
              if(v===b.value && v.split(' ').length>=7 && !/(https?:|@|www\\.|Sindikat Studio|Meta Ads|Google Ads|Google Analytics|Instagram)/i.test(v) && same++<5){
                issues.push({route,width,kind:'Long untranslated identical text',detail:k+': '+v.slice(0,180)});
              }
            }
          }
          if(original.links.length!==actual.links.length) issues.push({route,width,kind:'anchor count differs',detail:original.links.length+' vs '+actual.links.length});
          else {
            let invalid=0;
            for(let k=0;k<original.links.length;k++){
              const a=original.links[k],b=actual.links[k];
              if(a?.startsWith('/') && !a.startsWith('//') && !a.startsWith('/en/')){
                const expected='/en'+a;
                if(b!==expected && invalid++<5)issues.push({route,width,kind:'incorrect EN link',detail:k+': '+a+' -> '+b+' expected '+expected});
              }
            }
          }
        }
      }
      if(locale==='en' && ['/','/usluge/','/kontakt/'].includes(sr)){
        const original=srRendered.get(sr);
        for(const field of ['sections','h2','h3','form','salesAreas','salesModels','salesChooser','salesHome','salesServices','salesContact']){
          if(original?.[field]!==state.rendered[field])issues.push({route,width,kind:'rendered SR/EN mismatch',detail:field+': '+original?.[field]+' vs '+state.rendered[field]});
        }
        if(/[čćžšđČĆŽŠĐ]/.test(state.rendered.mainText))issues.push({route,width,kind:'untranslated EN dynamic copy',detail:state.rendered.mainText.slice(0,250)});
        if(sr==='/' && (!state.rendered.salesHome || !state.rendered.mainText.includes('Digital, campaigns,'))) issues.push({route,width,kind:'English sales home not localized'});
        if(sr==='/usluge/' && (!state.rendered.salesServices || !state.rendered.mainText.includes('What would you like to achieve?')))issues.push({route,width,kind:'English sales services not localized'});
        if(sr==='/kontakt/' && (!state.rendered.salesContact || !state.rendered.mainText.includes('Tell us your goal.')))issues.push({route,width,kind:'English sales contact not localized'});
      }

      if(representative.has(sr)&&width!==768){
        const slug=sr==='/'?'home':sr.replace(/^\/|\/$/g,'').replaceAll('/','-');
        await page.screenshot({path:path.join(screenDir,slug+'-'+locale+'-'+width+'.png'),fullPage:false,animations:'disabled'});
      }
      checked++;
    }
  }
  if(width===390){
    for(const locale of ['sr','en']){
      const route=locale==='en'?'/en/':'/';
      await page.goto(url(route),{waitUntil:'domcontentloaded'});
      const menu=page.locator('[data-menu-toggle]');
      if(await menu.isVisible()){
        await menu.click();
        if(await menu.getAttribute('aria-expanded')!=='true')issues.push({route,width,kind:'mobile menu does not open'});
        await page.keyboard.press('Escape');
        if(await menu.getAttribute('aria-expanded')!=='false')issues.push({route,width,kind:'mobile menu does not close'});
      }
      const chooser=page.locator('[data-sales-chooser]');
      if(await chooser.count()){
        await chooser.locator('[data-step="goal"] [data-value="growth"]').click();
        await chooser.locator('[data-step="mode"] [data-value="one"]').click();
        await chooser.locator('[data-step="budget"] [data-value="under500"]').click();
        const recommendation=(await chooser.locator('[data-sales-result]').innerText()).trim();
        const href=await chooser.locator('[data-sales-brief]').getAttribute('href');
        const expectedPrefix=locale==='en'?'/en/kontakt/?':'/kontakt/?';
        if(!href?.startsWith(expectedPrefix))issues.push({route,width,kind:'chooser wrong locale link',detail:href||''});
        if(locale==='en' && /[čćžšđČĆŽŠĐ]/.test(recommendation))issues.push({route,width,kind:'chooser untranslated recommendation',detail:recommendation});
        if(!recommendation.includes(locale==='en'?'Initial assessment':'Početna dijagnostika'))issues.push({route,width,kind:'chooser wrong recommendation',detail:recommendation});
      } else issues.push({route,width,kind:'chooser missing'});
      await page.goto(url(locale==='en'?'/en/kontakt/':'/kontakt/'),{waitUntil:'domcontentloaded'});
      const form=page.locator('[data-contact-form]').first();
      if(await form.count()){
        const required=await form.locator('input[required],textarea[required],select[required]').count();
        if(required===0)issues.push({route,width,kind:'contact form required fields',detail:required});
        const valid=await form.evaluate(el=>el.checkValidity());
        if(valid)issues.push({route,width,kind:'empty form is valid'});
      } else issues.push({route,width,kind:'contact form missing'});
    }
  }
  await context.close();
}
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
const summary={routes:routes.length,localePages:routes.length*2,viewports:deviceWidths,checked,errors:issues.length,issues};
const file=path.join(root,'reports','browser-qa.json');
fs.writeFileSync(file,JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({routes:summary.routes,localePages:summary.localePages,checked,errors:issues.length},null,2));
if(issues.length){
  for(const issue of issues.slice(0,80))console.log('ISSUE '+JSON.stringify(issue));
  process.exitCode=1;
}else console.log('Browser QA passed at 390px, 768px and 1440px.');
