# GA4 i dataLayer event mapa

Frontend ne pretpostavlja da su svi događaji već podešeni u GA4. On ih šalje u `window.dataLayer`, a kroz GTM treba potvrditi koji se prosljeđuju u GA4 i koji se označavaju kao key events.

| Event | Kada se šalje | Ključni parametri |
|---|---|---|
| `header_lead` | Klik na header CTA | `link_url`, `link_text` |
| `hero_lead` | Klik na glavni hero CTA | link parametri |
| `hero_cases` | Klik na radove iz hero sekcije | link parametri |
| `final_lead` | Klik na završni CTA | link parametri |
| `mobile_sticky_lead` | Klik na mobilni sticky CTA | link parametri |
| `service_lead` | Upit sa stranice usluge | link parametri |
| `form_start` | Prvi unos u lead formu | `form_name`, `form_source` |
| `form_error` | Validacija ili mrežna greška | `form_name`, `reason` |
| `generate_lead` | Kontakt endpoint potvrdi uspjeh | `goal`, `budget`, `form_source` |
| `email_click` | Klik na mailto link | `link_url` |
| `phone_click` | Klik na tel link | `link_url` |
| `instagram_click` | Klik na Instagram | link parametri |
| `imaposla_click` | Klik na ImaPosla.me | link parametri |
| `blog_filter` | Izbor kategorije bloga | `category` |
| `blog_feed_sync` | Uspješan odgovor blog feeda | `matched_posts` |
| `job_apply_start` | Otvorena prijavna forma | `job_id` |
| `job_application` | Prijava poslata endpointu | `job_id`, `job_title` |
| `job_post_submit` | Firma pošalje angažman | `company` |
| `consent_update` | Prihvaćeni ili odbijeni kolačići | `consent_choice` |

## Preporučeni GA4 key events

- `generate_lead`
- `job_application`
- `job_post_submit`

Ostali događaji služe za funnel i UX analizu.

## Preporučeni funnel za kontakt

```text
page_view
-> service_view ili relevantna landing stranica
-> form_start
-> generate_lead
-> /hvala/ page_view
```

## Testiranje

1. Otvori GTM Preview.
2. Otvori sajt sa testnim UTM parametrima.
3. Klikni CTA.
4. Počni formu i namjerno napravi validation error.
5. Pošalji test upit.
6. Provjeri dataLayer i GA4 DebugView.
7. Provjeri da `generate_lead` dolazi samo jednom.
