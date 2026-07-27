# Sindikat Studio 83 - produkcijski sajt

Ovo je kompletna produkcijska verzija sajta napravljena iz originalnog statičkog repoa i odobrenog homepage prototipa.

Nova verzija je i dalje statički sajt, ali više nije skup nepovezanih HTML fajlova. Stranice se generišu iz zajedničkih komponenti i strukturisanih podataka, pa se navigacija, footer, SEO, integracije i dizajn mijenjaju na jednom mjestu.

## Brzi start

Potrebno je imati Node.js 20 ili noviji i Python 3.

```bash
npm run build
npm run check
npm run dev
```

Lokalni sajt će biti dostupan na:

```text
http://localhost:4173
```

## Šta se nalazi u projektu

- `src/data/` - sadržaj usluga, industrija, projekata, bloga i globalne postavke
- `src/templates/` - header, footer, forme, kartice, layout i schema logika
- `src/assets/` - jedan zajednički CSS i jedan zajednički JavaScript
- `public/` - logo, favicon, OG slika i lokalni vizuelni asseti
- `build.mjs` - generiše kompletan sajt
- `dist/` - gotova produkcijska verzija spremna za upload
- `tests/` - provjere SEO-a, linkova, HTML strukture, schema podataka i pristupačnosti
- `docs/` - detaljna dokumentacija
- `vercel.json` - redirecti, clean URL pravila i sigurnosni headeri za Vercel

## Najvažnije komande

```bash
npm run build       # generiše dist/
npm run test        # provjerava stranice, SEO, linkove i integracije
npm run audit       # dodatna DOM i accessibility provjera
npm run check       # build + obje provjere
npm run sync:blog   # povlači podatke iz postojećeg blog Google Apps Script feeda
npm run dev         # lokalni statički server
```

## Produkcijska objava

Za Vercel postavi:

- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: može ostati prazan ili `npm install`

Za Netlify postavi:

- Build Command: `npm run build`
- Publish Directory: `dist`

Za obični hosting može se uploadovati sadržaj foldera `dist/`. U njemu se nalazi i `.htaccess` za Apache.

Detaljna uputstva: `docs/DEPLOYMENT.md`.

## Kritične stvari prije javne objave

1. Provjeriti kroz GTM Preview da li GTM kontejner već učitava isti GA4 property. Oba postojeća ID-a su namjerno sačuvana, ali mogu izazvati dupli `page_view` ako GTM već sadrži GA4 tag.
2. Testirati kontakt formu na produkcijskom domenu i potvrditi da Apps Script vraća `{ "ok": true }`.
3. Testirati listu angažmana, prijavu kandidata i objavu angažmana.
4. Pravno provjeriti stranice Privatnost, Kolačići i Uslovi korišćenja.
5. Potvrditi dozvolu za javno prikazivanje svih case study brojki i naziva projekata.
6. Zamijeniti ili dopuniti apstraktne vizuale stvarnim fotografijama čim budu spremne.

Kompletna lista: `docs/PRODUCTION_CHECKLIST.md`.
