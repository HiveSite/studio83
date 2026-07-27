import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/data/site.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const target = path.join(root, 'src/data/blog-posts.json');
const current = JSON.parse(fs.readFileSync(target, 'utf8'));
const response = await fetch(site.integrations.blogEndpoint, { headers: { accept: 'application/json' } });
if (!response.ok) throw new Error(`Blog API returned HTTP ${response.status}`);
const payload = await response.json();
if (!payload?.ok || !Array.isArray(payload.posts)) throw new Error(payload?.error || 'Blog API response is invalid');
const map = new Map(current.map(post => [post.slug, post]));
for (const remote of payload.posts) {
  if (!remote?.slug) continue;
  const old = map.get(remote.slug) || {};
  map.set(remote.slug, {
    ...old,
    slug: remote.slug,
    title: remote.title || old.title || '',
    excerpt: remote.excerpt || old.excerpt || '',
    description: remote.description || remote.excerpt || old.description || '',
    category: remote.category || old.category || 'blog',
    date: remote.date || old.date || '',
    cover: remote.cover_image?.startsWith('/sr-me/blog/covers/') ? remote.cover_image.replace('/sr-me/blog/covers/', '/images/blog/') : (old.cover || `/images/blog/${remote.slug}.svg`),
    coverAlt: remote.cover_alt || old.coverAlt || remote.title || '',
    tags: Array.isArray(remote.tags) ? remote.tags : (old.tags || []),
    body: remote.body || remote.content || old.body || '<p>Sadržaj je u pripremi.</p>'
  });
}
fs.writeFileSync(target, JSON.stringify([...map.values()], null, 2), 'utf8');
console.log(`Synchronized ${payload.posts.length} remote posts. Total local posts: ${map.size}`);
