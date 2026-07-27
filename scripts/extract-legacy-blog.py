from pathlib import Path
from bs4 import BeautifulSoup
import json, re

legacy = Path('/mnt/data/sindikat_source/sindiatstudio83-main/Pages/sr-me/blog')
out = Path('/mnt/data/sindikat_production/src/data/blog-posts.json')
meta = json.loads((legacy/'posts.json').read_text(encoding='utf-8'))
meta_by_slug = {p['slug']: p for p in meta}
posts=[]
for slug, p in sorted(meta_by_slug.items()):
    html_path = legacy/slug/'index.html'
    if not html_path.exists():
        continue
    soup=BeautifulSoup(html_path.read_text(encoding='utf-8'), 'html.parser')
    article=soup.select_one('#postContent') or soup.select_one('article.article')
    body=''
    if article:
        for bad in article.select('script, style'):
            bad.decompose()
        body='\n'.join(str(x) for x in article.contents).strip()
        body=re.sub(r'https?://[^"\']+', lambda m: m.group(0), body)
    posts.append({
        'slug': slug,
        'title': p.get('title',''),
        'excerpt': p.get('excerpt') or p.get('description',''),
        'description': p.get('description') or p.get('excerpt',''),
        'category': p.get('category','blog'),
        'date': p.get('date') or '',
        'cover': f'/images/blog/{slug}.svg',
        'coverAlt': p.get('cover_alt') or p.get('title',''),
        'tags': p.get('tags') or [],
        'body': body
    })
out.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Extracted {len(posts)} posts to {out}')
