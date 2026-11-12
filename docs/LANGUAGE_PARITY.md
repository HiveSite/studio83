# SR/EN parity implementation - Sindikat Studio 83

## Deployment rule

**Do not merge while the audit fails.** The main branch is Serbian-only. The English site is not finished merely because an /en/ directory exists.

## Canonical route policy

- SR: `/`, `/usluge/.../`, `/radovi/.../`, etc.
- EN: `/en/`, `/en/usluge/.../`, `/en/radovi/.../` (stable slugs are allowed, translated navigation text is required).
- Language switch keeps the current page context and its query string where appropriate.
- A translated page has its own self-canonical, `lang="en"`, `og:locale="en_US"`, reciprocal `hreflang="sr-ME"` and `hreflang="en"` references.
- Every indexable SR route needs a corresponding indexable EN route.
- English text must not be generated as identical Serbian fallback.
- `/hvala/` and 404 are utility pages; keep noindex behavior and localized interface.

## Scope

1. Home: hero, proof statistics, problems, all service/process blocks, cases, industries, pricing, FAQs, all CTAs.
2. Services: index + every individual service. Translate all structured dataset fields: titles, descriptions, outcomes, includes, process, pricing (keep numeric price values unchanged), FAQs and related cards.
3. Industries: index + every detail page. Translate all problems, solutions, links and CTAs.
4. Work: index + individual case pages. Preserve project names, metric values, media and claims; translate explanations and metric labels.
5. About: all sections, copy and CTAs.
6. Blog: index + all 30 published articles. **Translate complete article bodies and metadata**, including alt text, tags and related post descriptions - not excerpts alone.
7. Contact: labels, placeholders, select options, help text, validation errors, success/failure messages.
8. Jobs: public description, fallbacks, loaded listing UI, application modal, job creation form and all runtime feedback. Keep API option values and payload keys identical where required.
9. Legal: privacy, cookies and terms. Preserve legal meaning; obtain legal review for translated claims.
10. Global: desktop/mobile navigation, footer, language switch, cookie consent, SEO, OpenGraph, structured data and analytics events.

## Data invariants

- Identical service count/order, industry count/order, project count/order and article count/order.
- Identical numeric case metrics, published prices, email addresses, media assets, contact endpoints and job IDs.
- Identical forms (field names, required/optional status, input types, targets), except translated labels, choices and messages.
- Identical tracking instrumentation and event names.
- No unapproved design rework, commercial claims or copy removals.

## CI commands

```sh
npm run build
npm run test
npm run audit
npm run i18n:inventory
npm run audit:i18n
```

The last step is expected to **fail on the current unfinished branch**. It exists to prevent incorrectly declaring parity before translation is complete. Translation inventory is exported to `reports/sr-content-inventory.json`.

## Final QA

- Run layout snapshots at 390, 430, 768, 1024 and 1440px for each route type in both locales.
- Test language switch from article and service detail pages, including back navigation.
- Test contact and job application flows in both languages in a non-production environment.
- Verify case-sensitive links, canonical, hreflang, sitemap and redirect behaviors.
- Confirm no stale SR body paragraphs or untranslated validation messages in EN.
- Confirm typography does not overflow headings/buttons, especially on mobile.
- Publish only after all tests pass, and visually compare actual Vercel preview with production SR content.
