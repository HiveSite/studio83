import { site } from '../data/site.mjs';
import { header, footer } from './components.mjs';
import { jsonLd } from '../lib/html.mjs';

export function layout({
  title,
  description,
  path = '/',
  body,
  image = '/images/brand/og-cover.png',
  type = 'website',
  robots = 'index,follow,max-image-preview:large',
  schemas = [],
  bodyClass = ''
}) {
  const canonical = `${site.domain}${path}`;
  const fullTitle = title.includes(site.shortName) ? title : `${title} | ${site.name}`;
  const schemaMarkup = schemas.map(jsonLd).join('\n');

  return `<!doctype html>
<html lang="${site.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#08080b">
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/sales-ux.css">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:locale" content="sr_ME">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.domain}${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${site.domain}${image}">

  <script async src="https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4Id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('js', new Date());
    gtag('config', '${site.analytics.ga4Id}');
  </script>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${site.analytics.gtmId}');</script>
  ${schemaMarkup}
</head>
<body class="${bodyClass}">
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.analytics.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  ${header(path)}
  <main id="main">${body}</main>
  ${footer()}
  <script>window.SINDIKAT_CONFIG=${JSON.stringify(site.integrations)};</script>
  <script src="/assets/app.js" defer></script>
  <script src="/assets/sales-ux.js" defer></script>
</body>
</html>`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.domain}/#organization`,
    name: site.name,
    url: site.domain,
    logo: `${site.domain}/images/brand/logo.png`,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Podgorica',
      addressCountry: 'ME'
    },
    sameAs: [site.instagram]
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.domain}/#website`,
    url: site.domain,
    name: site.name,
    inLanguage: site.locale,
    publisher: { '@id': `${site.domain}/#organization` }
  };
}

export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: `${site.domain}/` },
      ...items.map((item, index) => ({ '@type': 'ListItem', position: index + 2, name: item.label, item: `${site.domain}${item.href}` }))
    ]
  };
}
