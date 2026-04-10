import { html } from 'hono/html'

// 1. props로 title을 넘겨받아야 함. 화살표 함수 뒤에 바로 ( ) 를 쓰면 return이 생략됨.
export const Head = function ({ attrs, title }) {
	return html`
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<title>${title} | ${attrs?.host}</title>
		<meta name="title" content="${title} | ${attrs?.host}" />
		<meta name="description" content="${attrs?.pageDesc}" />
		<meta name="keywords" content="ip address, my ip, check ip, cloudflare workers, serverless ip, privacy, ipv4, ipv6, what is my ip, whats my ip" />

		<meta name="google-adsense-account" content="ca-pub-1216027646063680" />
		<meta name="naver-site-verification" content="7dba249917e20d44513573bf05e5b67708398871" />
		<meta name="description" content="${attrs?.pageDesc}" />

		<meta property="og:type" content="website" />
		<meta property="og:url" content="${attrs?.pageUrl}" />
		<meta property="og:title" content="${attrs?.pageTitle}" />
		<meta property="og:description" content="${attrs?.pageDesc}" />
		<meta property="og:image" content="${attrs?.url?.origin}/assets/images/og-image.png" />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="${attrs?.pageUrl}" />
		<meta property="twitter:title" content="${attrs?.pageTitle}" />
		<meta property="twitter:image" content="${attrs?.url?.origin}/assets/images/og-image.png" />
		<meta property="twitter:description" content="${attrs?.pageDesc || ''}" />

		<link rel="canonical" href="${attrs?.pageUrl}" />
		<link rel="stylesheet" href="/assets/style.css" />
		<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1216027646063680" crossorigin="anonymous"></script>

		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding/d2coding.css" />

		<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/icon-16.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/icon-32.png" />
		<link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/icon-48.png" />
		<link rel="shortcut icon" href="/assets/icons/icon-32.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/icon-180.png" />

		<link rel="alternate" hreflang="x-default" href="${attrs?.siteUrl}/" />
		<link rel="alternate" hreflang="ko" href="${attrs?.siteUrl}/?lang=ko" />
		<link rel="alternate" hreflang="en" href="${attrs?.siteUrl}/" />

		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
		<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
	</head>
`};