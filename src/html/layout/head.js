export const head = (data) => `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${data.pageTitle}</title>
<meta name="title" content="${data.pageTitle}">
<meta name="description" content="${data.pageDesc}">
<meta name="keywords" content="ip address, my ip, check ip, cloudflare workers, serverless ip, privacy, ipv4, ipv6, what is my ip, whats my ip">

<meta name="google-adsense-account" content="ca-pub-1216027646063680">
<meta name="naver-site-verification" content="7dba249917e20d44513573bf05e5b67708398871" />
<meta name="description" content="${data.pageDesc}" />

<meta property="og:type" content="website">
<meta property="og:url" content="${data.pageUrl}">
<meta property="og:title" content="${data.pageTitle}">
<meta property="og:description" content="${data.pageDesc}">
<meta property="og:image" content="${data.ogimage}">

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${data.pageUrl}">
<meta property="twitter:title" content="${data.pageTitle}">
<meta property="twitter:image" content="${data.ogimage}">
<meta property="twitter:description" content="${data.pageDesc}">

<link rel="canonical" href="${data.pageUrl}">
<link rel="stylesheet" href="/assets/style.css" />
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1216027646063680" crossorigin="anonymous"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding/d2coding.css" />
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjMDA3N2VlIi8+CiAgPHBhdGggZD0iTTUwIDIwIEMzNSAyMCAyNSAzMCAyNSA0NSBDMjUgNjUgNTAgODAgNTAgODAgQzUwIDgwIDc1IDY1IDc1IDQ1IEM3NSAzMCA2NSAyMCA1MCAyMFoiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI0NSIgcj0iMTAiIGZpbGw9IiMwMDc3ZWUiLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjcwIiByPSIxNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzAwNzdlZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9Ijc4IiB5MT0iNzgiIHgyPSI5MCIgeTI9IjkwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2hpdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=">

<link rel="alternate" hreflang="x-default" href="${data.siteUrl}/" />
<link rel="alternate" hreflang="ko" href="${data.siteUrl}/?lang=ko" />
<link rel="alternate" hreflang="en" href="${data.siteUrl}/" />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
`;