import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { services } from '../src/data/services.mjs';
import { industries } from '../src/data/industries.mjs';
import { cases } from '../src/data/cases.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src/data/blog-posts.json'), 'utf8'));
const routes = [
  '/', '/usluge/', ...services.map(x => `/usluge/${x.slug}/`),
  '/industrije/', ...industries.map(x => `/industrije/${x.slug}/`),
  '/radovi/', ...cases.map(x => `/radovi/${x.slug}/`),
  '/o-nama/', '/blog/', ...posts.map(x => `/blog/${x.slug}/`),
  '/kontakt/', '/postani-dio-tima/',
  '/privatnost/', '/kolacici/', '/uslovi-koriscenja/'
];
const fileAt = route => path.join(dist, route.replace(/^\//, ''), 'index.html');
const extract = (html, re) => (html.match(re) || [,''])[1] || '';
const normalize = value => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const counts = html => Object.fromEntries(['section','h1','h2','h3','form','button','details','article'].map(tag => [tag, (html.match(new RegExp(`<${tag}(?=[\\s>])`, 'gi')) || []).length]));
const failures = [];
const report = [];
for (const route of routes) {
  const srFile = fileAt(route);
  const enRoute = route === '/' ? '/en/' : `/en${route}`;
  const enFile = fileAt(enRoute);
  const entry = { sr: route, en: enRoute, srExists: fs.existsSync(srFile), enExists: fs.existsSync(enFile), issues: [] };
  if (!entry.srExists) entry.issues.push('Missing SR output');
  if (!entry.enExists) entry.issues.push('Missing EN output');
  if (entry.srExists && entry.enExists) {
    const sr = fs.readFileSync(srFile, 'utf8');
    const en = fs.readFileSync(enFile, 'utf8');
    if (!/<html[^>]+lang=["']en(?:-|["'])/i.test(en)) entry.issues.push('Missing English html lang');
    for (const [tag, amount] of Object.entries(counts(sr))) {
      const other = counts(en)[tag];
      if (amount !== other) entry.issues.push(`Structure ${tag}: SR=${amount}, EN=${other}`);
    }
    const srH1 = normalize(extract(sr, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
    const enH1 = normalize(extract(en, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
    if (srH1 && srH1 === enH1) entry.issues.push('Untranslated H1');
    if (!/hreflang=["']en["']/i.test(sr) || !/hreflang=["']sr-ME["']/i.test(en)) entry.issues.push('Incomplete reciprocal hreflang');
    if (!/<link\s+rel=["']canonical["'][^>]*href=["']https:\/\/www\.sindikatstudio83\.me\/en\//i.test(en)) entry.issues.push('Wrong EN canonical');
    if (/<html[^>]*lang=["']sr-ME["']/i.test(en)) entry.issues.push('EN page still uses SR locale');
  }
  if (entry.issues.length) failures.push(entry);
  report.push(entry);
}
const summary = { total: routes.length, failed: failures.length, passed: routes.length - failures.length };
console.log(JSON.stringify({ summary, routes: report }, null, 2));
if (failures.length) {
  console.error(`Language parity FAIL: ${failures.length}/${routes.length} routes are incomplete.`);
  process.exitCode = 1;
}
