# Integracije i povezivanja

Sva bitna povezivanja iz originalnog sajta sačuvana su u `src/data/site.mjs`.

## 1. Google Analytics 4

ID:

```text
G-NH2FL5SP1Y
```

Direktni `gtag.js` kod se automatski ubacuje u svaku produkcijsku stranicu kroz `src/templates/layout.mjs`.

Consent Mode se inicijalno postavlja na `denied`, a izbor korisnika se ažurira kroz cookie banner.

## 2. Google Tag Manager

ID:

```text
GTM-PBXVW3GK
```

GTM script i noscript iframe automatski se ubacuju na sve stranice.

### Važno - mogući dupli page view

Originalni sajt je imao direktni GA4 i GTM istovremeno. Oba su zadržana jer je zahtjev bio da se veze ne uklanjaju.

Prije objave:

1. Otvori GTM Preview.
2. Provjeri da li GTM kontejner sadrži GA4 Configuration ili Google Tag koji šalje u `G-NH2FL5SP1Y`.
3. Provjeri GA4 DebugView.
4. Ako se jedan page view registruje dva puta, odluči da li će source of truth biti GTM ili direktni gtag.
5. Tek nakon provjere ukloni jednu implementaciju iz `src/templates/layout.mjs`.

Ne uklanjati naslijepo jer GTM može sadržati druge važne tagove i conversion konfiguracije.

## 3. Kontakt forma

Endpoint:

```text
https://script.google.com/macros/s/AKfycbyKu4_7m2qLOxnlfiDLYcwYbP4u1hswsp_mqH9rUj0ByyoUv1IVY0abc3gCK67QE4AQxQ/exec
```

Lokacije u kodu:

- endpoint: `src/data/site.mjs`
- HTML forma: `src/templates/components.mjs`
- submit logika: `src/assets/app.js`

Payload:

```json
{
  "name": "Ime i firma",
  "contact": "Email ili telefon",
  "goal": "Izabrani cilj",
  "budget": "Budžetski okvir",
  "deadline": "Rok",
  "message": "Opis",
  "url": "Trenutna stranica",
  "referrer": "Prethodna stranica",
  "source": "Izvor forme",
  "utm_source": "...",
  "utm_medium": "...",
  "utm_campaign": "...",
  "utm_content": "...",
  "utm_term": "...",
  "gclid": "...",
  "fbclid": "..."
}
```

Forma očekuje JSON odgovor. Uspjeh je:

```json
{ "ok": true }
```

Nakon uspjeha:

- šalje se `generate_lead` u dataLayer
- forma se resetuje
- korisnik ide na `/hvala/`

Ako Apps Script ignoriše nova polja, stara obavezna polja `name`, `contact`, `goal`, `message`, `url` i `source` ostaju prisutna.

## 4. Angažmani i prijave

Endpoint:

```text
https://script.google.com/macros/s/AKfycbwSwvILrfKoSaDYrOIegGY3E_4_eokard8yY9lurGfcEL7fQNsPxb5wT0ZRKwJfnC2_/exec
```

Stranica:

```text
/postani-dio-tima/
```

### Učitavanje poslova

```text
GET ?action=jobs
```

Ako endpoint ne odgovori, stranica prikazuje lokalne fallback otvorene prijave.

### Prijava kandidata

POST `application/x-www-form-urlencoded`, `mode: no-cors`:

```text
action=apply
jobId=...
jobTitle=...
name=...
email=...
phone=...
msg=...
source=Sindikat website - production
userAgent=...
```

### Objava angažmana

POST:

```text
action=post_job
id=...
title=...
company=...
location=...
category=...
type=...
pay=...
payType=...
posted=...
desc=...
apply=...
```

Postojeći `no-cors` način je sačuvan, što znači da frontend ne može pouzdano pročitati odgovor. Korisniku se potvrda prikazuje nakon slanja requesta. Za sigurniju produkciju preporučuje se da Apps Script podrži CORS i vrati eksplicitan JSON odgovor.

## 5. Blog feed

Endpoint:

```text
https://script.google.com/macros/s/AKfycbzGf2MSW8mS-sm9ZUnszl7rfYoP2WRJ-3reuYdeMz-4PD0adX2L5ZzOz47Xaa-w-45N/exec?sheet=Posts&onlyPublished=1
```

Postoje dva nivoa integracije:

### Live refresh na blog listi

Browser u pozadini povlači feed i ažurira naslov i excerpt za slugove koji već postoje u buildu.

Novi slug se namjerno ne prikazuje automatski jer za njega još ne postoji statička SEO stranica.

### Build sync

```bash
npm run sync:blog
npm run build
```

`sync:blog` ažurira `src/data/blog-posts.json`. Nakon toga build pravi statičke stranice za nove slugove.

## 6. Instagram

```text
https://www.instagram.com/sindikat_studio83/
```

Link se nalazi u footeru i kontakt sekciji. Klik šalje `instagram_click` u dataLayer.

## 7. ImaPosla.me

```text
https://imaposla.me/
```

Koristi se na stranici `/postani-dio-tima/` kao izlaz ka široj platformi za poslove. Klik šalje `imaposla_click`.

## 8. UTM i click ID parametri

Sajt pamti tokom sesije:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `fbclid`

Parametri se dodaju kontakt payloadu.

## 9. DataLayer eventovi

Kompletna mapa se nalazi u `docs/GA4_EVENTS.md`.
