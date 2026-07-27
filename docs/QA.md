# QA i testiranje

## Automatske provjere

```bash
npm run check
```

Komanda radi:

1. novi build
2. provjeru title i description podataka
3. provjeru canonical URL-ova
4. provjeru H1 elemenata
5. provjeru internih linkova
6. provjeru da nema hotlinkovanih fotografija
7. provjeru da su GA4 i GTM sačuvani
8. provjeru validnog JSON-LD-a
9. provjeru jedinstvenih ID-eva
10. provjeru labela na formama
11. provjeru button type atributa
12. provjeru alt, width i height atributa na slikama

## Ručni browser QA

Automatska provjera ne može zamijeniti ručni test na stvarnom browseru.

Desktop širine:

- 1440 px
- 1280 px
- 1024 px

Mobilne širine:

- 390 px
- 375 px
- 360 px

Provjeriti:

- sticky header
- mobilni meni i Escape zatvaranje
- sve CTA dugmadi
- form validation
- success i error poruke
- cookie banner
- FAQ details elemente
- blog filter i search
- job modal
- dugačke naslove i sadržaj
- landscape mobilni prikaz

## Network QA

U DevTools Network panelu provjeriti:

- nema 404 asseta
- CSS i JS se keširaju
- kontakt request payload
- jobs GET odgovor
- jobs POST request
- blog feed odgovor
- nema neočekivanih eksternih slika

## Performance QA

Nakon produkcijske objave pokrenuti Lighthouse ili PageSpeed Insights za:

- početnu
- stranicu usluge
- blog tekst
- kontakt

Posebno pratiti:

- LCP
- CLS
- INP
- unused JavaScript
- veličinu OG i logo asseta

## Vizuelna provjera urađena u ovom okruženju

- produkcijski homepage je renderovan kroz lokalni statički build
- desktop render je pregledan kroz svih 10 stranica renderovanog dokumenta
- hero, usluge, aktivacije, case studies, FAQ, završni CTA i footer nijesu pokazali prelivanje ili nedostajuće assete

Automatizovano interaktivno Chromium/Playwright pokretanje bilo je blokirano pravilima ovog izvršnog okruženja. Zbog toga pravi klik test u Chrome, Safari i mobilnom browseru ostaje obavezna stavka na staging URL-u prije zamjene postojeće produkcije. To je navedeno i u produkcijskoj checklisti.
