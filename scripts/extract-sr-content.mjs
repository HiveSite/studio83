import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'reports', 'sr-content-inventory.json');
const files = [];
function walk(folder) {
  if (!fs.existsSync(folder)) throw new Error('dist is missing. Run npm run build first.');
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html' && !full.includes(path.sep+'en'+path.sep)) files.push(full);
  }
}
walk(dist);
const decode = s => s.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const inventory = files.map(file => {
  const html = fs.readFileSync(file, 'utf8');
  const route = '/' + path.relative(dist,file).replaceAll('\\', '/').replace(/index\.html$/, '');
  const withoutScripts = html.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[^]*?-->/g, '');
  const text = [...withoutScripts.matchAll(/>([^<>]+)</g)]
    .map(x=>decode(x[1].replace(/\s+/g, ' ').trim()))
    .filter(x=>x && /[A-Za-zÀ-ž]/.test(x));
  const attrs = [...withoutScripts.matchAll(/\b(?:placeholder|aria-label|alt|title)=["']([^"']+)["']/gi)]
    .map(x=>decode(x[1].trim())).filter(Boolean);
  const meta = [...html.matchAll(/<meta\s+name="description"\s+content="([^"]+)"/gi)].map(x=>decode(x[1]));
  return {route, text, attributes: attrs, meta, totalSegments: text.length + attrs.length + meta.length};
}).sort((a,b)=>a.route.localeCompare(b.route));
fs.mkdirSync(path.dirname(out), {recursive:true});
fs.writeFileSync(out, JSON.stringify({routes:inventory.length, segments:inventory.reduce((s,p)=>s+p.totalSegments,0), pages:inventory},null,2)+'\n');
console.log('Extracted '+inventory.length+' SR pages into '+path.relative(root,out));
console.log('Translation segments: '+inventory.reduce((s,p)=>s+p.totalSegments,0));
