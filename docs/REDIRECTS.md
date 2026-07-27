# Redirect strategija

Nova struktura koristi kratke URL-ove bez `/sr-me/` prefiksa i bez `.html` duplikata.

Primjeri:

```text
/sr-me/pocetna/                  -> /
/sr-me/kontakt/                  -> /kontakt/
/sr-me/onama/                    -> /o-nama/
/sr-me/poslovi/                  -> /postani-dio-tima/
/sr-me/usluge/oglasavanje.html   -> /usluge/performance-marketing/
/sr-me/usluge/landingpage/       -> /usluge/web-i-konverzije/
/sr-me/usluge/copywriting/       -> /usluge/sadrzaj-za-kampanje/
/sr-me/blog/p01/                 -> /blog/p01/
```

Redirect mapa se nalazi u `build.mjs` kao niz `redirects`.

Build iz iste mape generiše:

- `vercel.json`
- `dist/_redirects`
- `dist/.htaccess`
- fallback HTML redirect stranice

Ne uređivati četiri izlazna fajla ručno. Uredi samo niz u `build.mjs`, pa pokreni build.
