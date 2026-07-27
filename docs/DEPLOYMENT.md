# Deployment

## Preporučena opcija - Vercel

### Podešavanje projekta

- Root Directory: root ovog repoa
- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 20 ili noviji

`vercel.json` automatski podešava:

- trajne redirecte sa starih URL-ova
- trailing slash strukturu
- sigurnosne headere
- cache za assete

### Domena

Poveži:

```text
www.sindikatstudio83.me
sindikatstudio83.me
```

Izaberi jednu kanonsku verziju. Trenutni kod koristi:

```text
https://www.sindikatstudio83.me
```

Root domen treba trajno preusmjeriti na `www` ili promijeniti `site.domain` prije builda.

## Netlify

- Build Command: `npm run build`
- Publish Directory: `dist`

Netlify automatski koristi:

- `dist/_redirects`
- `dist/_headers`

## Apache / cPanel

1. Pokreni lokalno `npm run check`.
2. Uploaduj sadržaj foldera `dist/` u public web root.
3. Obavezno uploaduj i skriveni fajl `.htaccess`.
4. Provjeri da je Apache `mod_rewrite` uključen.
5. Otvori nekoliko starih URL-ova i potvrdi 301 redirect.

## Obični statički hosting bez redirect podrške

Build pravi i HTML fallback stranice na starim URL-ovima. One koriste `noindex`, canonical i instant meta refresh. To je rezervna opcija, ali pravi server-side 301 je uvijek bolji.

## GitHub Pages

Može prikazati sajt, ali nije preporučena opcija jer:

- nema standardnu server-side redirect podršku
- trailing slash i custom 404 ponašanje su ograničeni
- sigurnosni headeri nijesu pod punom kontrolom

## Poslije deploymenta

Provjeri:

```text
/
/usluge/
/usluge/aktivacije-i-eventi/
/radovi/
/blog/
/kontakt/
/postani-dio-tima/
/sitemap.xml
/robots.txt
```

Provjeri stare URL-ove:

```text
/sr-me/pocetna/
/sr-me/usluge/oglasavanje.html
/sr-me/blog/p01/
/sr-me/poslovi/
```

## Search Console

Nakon objave:

1. Pošalji novi sitemap.
2. Provjeri URL Inspection za početnu, jednu uslugu, jedan case i jedan blog tekst.
3. Prati Page indexing i canonical izvještaje.
4. Ne uklanjaj stare URL-ove iz Search Console ručno ako pravilno vraćaju 301.

## Rollback

Prije objave sačuvaj trenutni produkcijski deploy ili ZIP.

Najbrži rollback je:

- Vercel - Promote prethodni deployment
- Netlify - Publish prethodni deploy
- cPanel - vrati backup public foldera
