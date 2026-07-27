# Izvještaj o produkcijskoj izmjeni

## Šta je završeno

- nova prodajna i informaciona arhitektura
- potpuno novi homepage flow
- pet detaljnih usluga
- pet industrijskih landing stranica
- tri case study stranice
- O nama, kontakt, legal i thank-you stranice
- nova stranica za roster, angažmane i prijave
- migracija svih 30 blog tekstova
- lokalni blog cover asseti bez hotlinkovanja fotografija
- zajednički header, footer, forme, CTA i SEO sistem
- dinamički sitemap i robots.txt
- Organization, WebSite, Service, Breadcrumb i Article schema
- potpuna redirect mapa sa stare strukture
- Vercel, Netlify i Apache deployment podrška
- GA4, GTM, kontakt, jobs i blog integracije
- UTM, gclid i fbclid prenos u lead payload
- dataLayer event mapa
- cookie i Consent Mode osnova
- mobilni sticky CTA
- blog filter i pretraga
- fallback ponašanje ako jobs ili blog endpoint nijesu dostupni
- automatske SEO, link, DOM i accessibility provjere

## Ključna strateška odluka

Ponuda više nije organizovana kao katalog alata. Glavna pozicija je:

> Kampanje, sadržaj, ljudi i teren povezani kroz jedan cilj.

Glavne usluge su:

1. Performance marketing
2. Aktivacije i eventi
3. Web i konverzije
4. Sadržaj za kampanje
5. Recruitment kampanje

## Šta je namjerno ostavljeno za potvrdu

- konačni pravni tekstovi
- provjera duplog GA4 page view-a
- stvarne fotografije tima i aktivacija
- dodatna odobrenja za javne case studies
- konačni cjenovnik
- eventualni telefon i fizička adresa ako treba da budu javni

## Tehnički rezultat

Build trenutno generiše:

- 54 indeksabilne stranice
- utility stranice
- stare redirect fallback URL-ove
- 109 HTML fajlova ukupno u `dist/`

Automatske provjere prolaze bez prijavljene greške. Desktop vizuelni render je dodatno pregledan. Interaktivni browser test na staging ili produkcijskom URL-u ostaje obavezan jer je lokalno Chromium/Playwright pokretanje bilo blokirano pravilima izvršnog okruženja.
