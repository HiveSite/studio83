# Arhitektura sajta

## Zašto je struktura promijenjena

Originalni repo je imao desetine velikih HTML fajlova sa kopiranim CSS-om, JavaScript-om, navigacijom, GA4/GTM kodom i schema podacima. To je stvaralo četiri problema:

1. Jedna izmjena morala je da se ponavlja kroz veliki broj fajlova.
2. Stranice su vremenom dobijale različite verzije navigacije i skripti.
3. Duplirani `.html` i `/index.html` URL-ovi otežavali su SEO konsolidaciju.
4. Teško je bilo testirati da li je neka integracija slučajno izbrisana sa jedne stranice.

Nova verzija koristi zero-dependency statički generator napisan u Node.js-u. Nema framework lock-in-a i nema runtime servera. Build napravi čiste HTML fajlove koji se mogu postaviti na Vercel, Netlify, Apache ili gotovo bilo koji statički hosting.

## Struktura

```text
sindikat_production/
├── build.mjs
├── package.json
├── vercel.json
├── public/
│   ├── favicon.png
│   └── images/
├── src/
│   ├── assets/
│   │   ├── styles.css
│   │   └── app.js
│   ├── data/
│   │   ├── site.mjs
│   │   ├── services.mjs
│   │   ├── industries.mjs
│   │   ├── cases.mjs
│   │   └── blog-posts.json
│   ├── lib/
│   └── templates/
├── scripts/
├── tests/
├── docs/
└── dist/
```

## Izvor istine

### Globalne postavke

`src/data/site.mjs`

Tu se nalaze:

- naziv i domen
- lokacija i email
- Instagram i ImaPosla link
- GA4 i GTM ID
- tri Google Apps Script endpointa
- ključne dokazne brojke
- glavna navigacija

### Usluge

`src/data/services.mjs`

Svaka usluga ima:

- slug i naziv
- glavni opis
- ishode
- standardni obim
- proces
- cjenovne okvire
- FAQ

Promjena u ovom fajlu automatski se pojavljuje na stranici usluge i na relevantnim karticama.

### Industrije

`src/data/industries.mjs`

Sadrži problem, preporučena rješenja i CTA za svaku ciljnu industriju.

### Projekti

`src/data/cases.mjs`

Sadrži samo brojke i informacije koje su unesene kao potvrđeni podaci. Ne dodavati procjene kao da su završni rezultat.

### Blog

`src/data/blog-posts.json`

Sadrži svih 30 prenesenih tekstova iz originalnog repoa. Build uklanja eksterno hotlinkovane fotografije i koristi lokalne cover assete.

## Generisanje stranica

`build.mjs`:

1. briše prethodni `dist/`
2. kopira javne assete
3. generiše sve glavne stranice
4. generiše stranice usluga, industrija, case studies i blog tekstova
5. pravi sitemap i robots.txt
6. pravi Vercel, Netlify i Apache redirect pravila
7. pravi statičke fallback redirect stranice za stare URL-ove

## Zašto nije korišćen Next.js ili Astro

Za trenutni obim Sindikat sajta nije potreban runtime framework. Sajt nema korisničke naloge ni server-rendered aplikacione procese. Zero-dependency build daje:

- minimalan napadni prostor
- brzu objavu
- mali rizik od dependency problema
- čiste HTML stranice pogodne za SEO
- jednostavno prebacivanje između hosting provajdera

Ako sajt kasnije dobije CMS sa preview okruženjem, veliki broj autora ili kompleksnu aplikacionu logiku, struktura podataka i komponenti može se relativno lako prenijeti u Astro ili Next.js.
