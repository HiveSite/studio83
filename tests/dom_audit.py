from pathlib import Path
from bs4 import BeautifulSoup
import json, re, sys

root=Path(__file__).resolve().parents[1]/'dist'
errors=[]
warnings=[]
for file in root.rglob('*.html'):
    rel=file.relative_to(root)
    text=file.read_text(encoding='utf-8')
    soup=BeautifulSoup(text,'html.parser')
    redirect=soup.find('meta',attrs={'http-equiv':re.compile('refresh',re.I)}) is not None
    if redirect:
        continue
    h1=soup.find_all('h1')
    if len(h1)!=1:
        errors.append(f'{rel}: expected 1 h1, found {len(h1)}')
    ids=[node.get('id') for node in soup.find_all(attrs={'id':True})]
    dup={i for i in ids if ids.count(i)>1}
    if dup:
        errors.append(f'{rel}: duplicate ids {sorted(dup)}')
    for img in soup.find_all('img'):
        if img.get('alt') is None:
            errors.append(f'{rel}: image missing alt {img.get("src")}')
        if not img.get('width') or not img.get('height'):
            warnings.append(f'{rel}: image missing dimensions {img.get("src")}')
        if str(img.get('src','')).startswith('http'):
            errors.append(f'{rel}: hotlinked image {img.get("src")}')
    for button in soup.find_all('button'):
        if not button.get('type'):
            errors.append(f'{rel}: button missing type: {button.get_text(" ",strip=True)[:40]}')
    labels_for={label.get('for') for label in soup.find_all('label') if label.get('for')}
    for field in soup.find_all(['input','select','textarea']):
        if field.get('type')=='hidden' or field.get('aria-hidden')=='true':
            continue
        nested=field.find_parent('label')
        if not nested and field.get('id') not in labels_for and not field.get('aria-label'):
            errors.append(f'{rel}: unlabeled field {field.name}[name={field.get("name")}]')
    canon=soup.find_all('link',rel='canonical')
    if len(canon)!=1:
        errors.append(f'{rel}: canonical count {len(canon)}')
    for script in soup.find_all('script',attrs={'type':'application/ld+json'}):
        try: json.loads(script.string or '')
        except Exception as exc: errors.append(f'{rel}: invalid JSON-LD {exc}')

print(f'Audited {len(list(root.rglob("*.html")))} HTML files')
if warnings:
    print(f'Warnings: {len(warnings)}')
    for item in warnings[:30]: print('-',item)
if errors:
    print(f'Errors: {len(errors)}')
    for item in errors[:100]: print('-',item)
    sys.exit(1)
print('DOM audit passed')
