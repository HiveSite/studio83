# Uređivanje sadržaja

## Globalni podaci

Fajl:

```text
src/data/site.mjs
```

Tu mijenjaš:

- email
- lokaciju
- društvene linkove
- domen
- GA4/GTM ID
- Apps Script endpointove
- dokazne brojke
- glavnu navigaciju

Nakon izmjene:

```bash
npm run check
```

## Usluge

Fajl:

```text
src/data/services.mjs
```

Ne mijenjaj `slug` nakon što je URL već indeksiran bez dodavanja redirecta.

Cjenovni okviri su namjerno označeni kao početni. Ako se cijena mijenja, provjeri:

- da li je agencijska naknada odvojena od medijskog budžeta
- da li su transport, osoblje i produkcija odvojeni
- da li je jasno šta ulazi u cijenu

## Industrije

Fajl:

```text
src/data/industries.mjs
```

Industrijska stranica treba da postoji samo kada Sindikat ima:

- stvarnu ponudu za taj sektor
- bar jedan relevantan proces ili dokaz
- dovoljno jedinstven sadržaj
- konkretan CTA

Ne praviti tanke stranice samo zbog ključne riječi.

## Projekti i case studies

Fajl:

```text
src/data/cases.mjs
```

Svaka brojka mora imati interni izvor. Ne koristiti:

- procjenu kao završni rezultat
- klijentske podatke bez dozvole
- anonimizovane podatke koji se ipak lako mogu povezati sa klijentom
- procente bez baznog broja i perioda

Preporučena struktura:

1. problem
2. konkretan obim
3. period
4. uloga Sindikata
5. način mjerenja
6. rezultat i kontekst

## Blog

Fajl:

```text
src/data/blog-posts.json
```

Za sinhronizaciju sa postojećim Google Sheet feedom:

```bash
npm run sync:blog
npm run check
```

Svaki post treba da ima:

- jedinstven slug
- title
- description
- excerpt
- category
- cover i coverAlt
- tags
- body
- datum objave i izmjene kada se uvede urednički proces

## Fotografije

Staviti ih u:

```text
public/images/
```

Pravila:

- koristi WebP ili AVIF kada je moguće
- ne hotlinkuj slike sa tuđih domena
- navedi stvarni alt tekst kada slika prenosi informaciju
- za dekorativne slike koristi prazan alt
- definiši width i height
- potvrdi autorska prava i dozvolu osoba na fotografiji

## Novi URL ili promjena starog URL-a

1. Dodaj novu stranicu u build logiku.
2. Ako mijenjaš postojeći URL, dodaj mapu u `redirects` niz u `build.mjs`.
3. Pokreni `npm run check`.
4. Provjeri `dist/_redirects`, `dist/.htaccess` i `vercel.json`.
