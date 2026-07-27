# Počni odavde

Ovaj dokument je operativni vodič za preuzimanje, izmjene, testiranje i objavu novog Sindikat Studio 83 sajta.

## 1. Koji paket koristiti

### Za dalji razvoj

Koristi kompletan produkcijski repo. Sadržaj se mijenja u `src/`, zatim se pokreće build.

### Za direktan upload bez izmjena

Koristi sadržaj foldera `dist/`. To je već generisana statička produkcijska verzija.

## 2. Lokalno pokretanje

Potrebno:

- Node.js 20+
- Python 3 samo za dodatni DOM audit

Komande:

```bash
npm run check
npm run dev
```

Otvori:

```text
http://localhost:4173
```

`npm run check` prvo ponovo generiše cijeli `dist/`, zatim provjerava SEO, interne linkove, schema podatke, forme, slike, HTML strukturu i osnovnu pristupačnost.

## 3. Gdje se šta mijenja

### Globalni podaci i integracije

```text
src/data/site.mjs
```

Tu su:

- domen
- naziv i opis brenda
- email
- Instagram i ImaPosla link
- GA4 i GTM ID
- kontakt Apps Script endpoint
- jobs Apps Script endpoint
- blog feed endpoint
- globalna navigacija

### Usluge

```text
src/data/services.mjs
```

Jedna izmjena podataka automatski mijenja listing, detaljnu stranicu, interne linkove i schema podatke nakon builda.

### Industrije

```text
src/data/industries.mjs
```

### Case studies

```text
src/data/cases.mjs
```

Ne objavljivati rezultat, naziv projekta ili brojku bez dozvole i izvora.

### Blog

```text
src/data/blog-posts.json
```

Postojeći Google Apps Script feed može se sinhronizovati komandom:

```bash
npm run sync:blog
npm run check
```

### Dizajn

```text
src/assets/styles.css
```

Globalne boje, razmaci, tipografija, responsive pravila i komponente su na jednom mjestu.

### Interakcije i tracking

```text
src/assets/app.js
```

Tu su:

- mobilni meni
- CTA tracking
- UTM i click ID pamćenje
- kontakt forma
- cookie consent
- blog filter
- live blog feed
- jobs feed
- prijava kandidata
- objava angažmana

### Header, footer, sekcije i forme

```text
src/templates/components.mjs
src/templates/layout.mjs
```

## 4. Kako se objavljuje

### Vercel

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 20+

`vercel.json` sadrži redirecte, clean URL postavke, trailing slash pravila i sigurnosne headere.

### Netlify

- Build Command: `npm run build`
- Publish Directory: `dist`

Netlify koristi `dist/_redirects` i `dist/_headers`.

### cPanel ili Apache

Uploadovati sadržaj `dist/` foldera u web root i obavezno uključiti skriveni `.htaccess` fajl.

## 5. Šta mora biti provjereno prije zamjene starog sajta

1. Napraviti backup trenutne produkcije.
2. Pokrenuti `npm run check`.
3. Objaviti prvo na preview ili staging URL.
4. Testirati kontakt formu i potvrditi da upit stiže na postojeći sistem.
5. Testirati jobs feed, kandidat prijavu i objavu angažmana.
6. Otvoriti GTM Preview i GA4 DebugView.
7. Provjeriti da se `page_view` ne šalje dva puta.
8. Testirati Accept i Reject u cookie banneru.
9. Otvoriti stare URL-ove i potvrditi 301 redirect.
10. Provjeriti mobilni meni, sve CTA linkove i forme na stvarnom telefonu.
11. Potvrditi pravne tekstove i dozvole za javne case studies.
12. Povezati produkcijski domen i poslati novi sitemap u Search Console.

## 6. Zašto su GA4 i GTM oba ostavljena

Originalni sajt je koristio direktni GA4 ID `G-NH2FL5SP1Y` i GTM kontejner `GTM-PBXVW3GK`. Oba su sačuvana da se ne izgube postojeći tagovi, događaji ili conversion postavke.

To ne znači da oba treba trajno da šalju isti `page_view`. GTM kontejner nije vidljiv iz samog repoa, pa se odluka donosi tek nakon GTM Preview i GA4 DebugView testa.

## 7. Kako radi kontakt lead flow

1. Korisnik otvara stranicu sa UTM, gclid ili fbclid parametrima.
2. Parametri se pamte tokom sesije.
3. Korisnik popunjava formu.
4. Frontend šalje postojeća obavezna polja i dodatni kontekst na postojeći Apps Script.
5. Nakon uspješnog odgovora šalje se `generate_lead` u dataLayer.
6. Korisnik se preusmjerava na `/hvala/`.

## 8. Kako radi SEO sistem

Za svaku indeksabilnu stranicu build automatski pravi:

- jedinstveni title
- meta description
- canonical URL
- Open Graph podatke
- H1
- breadcrumb
- odgovarajući JSON-LD
- internu navigaciju
- sitemap unos

Stari `/sr-me/` URL-ovi imaju trajne redirecte ka novoj strukturi i fallback HTML samo za hosting bez server-side redirect podrške.

## 9. Šta još nije konačno zaključano

- finalni pravni tekstovi
- finalni cjenovnik
- javna adresa i telefon, ako se dodaju
- stvarne fotografije tima i aktivacija
- odobrenja za nazive i brojke u case studies
- odluka da li je GA4 source of truth direktni gtag ili GTM

Detalji su u ostalim dokumentima unutar `docs/`.
