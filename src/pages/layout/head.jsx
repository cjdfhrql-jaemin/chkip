/** @jsx jsx */
import { jsx, Fragment } from 'hono/jsx'

// 1. props로 title을 넘겨받아야 함. 화살표 함수 뒤에 바로 ( ) 를 쓰면 return이 생략됨.
export const Head = ({ title }) => (
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<title>{title}</title>
		<meta name="title" content={title} />
		<meta name="description" content="${data.pageDesc}" />
		<meta name="keywords" content="ip address, my ip, check ip, cloudflare workers, serverless ip, privacy, ipv4, ipv6, what is my ip, whats my ip" />

		<meta name="google-adsense-account" content="ca-pub-1216027646063680" />
		<meta name="naver-site-verification" content="7dba249917e20d44513573bf05e5b67708398871" />
		<meta name="description" content="${data.pageDesc}" />

		<meta property="og:type" content="website" />
		<meta property="og:url" content="${data.pageUrl}" />
		<meta property="og:title" content="${data.pageTitle}" />
		<meta property="og:description" content="${data.pageDesc}" />
		<meta property="og:image" content="${data.ogimage}" />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="${data.pageUrl}" />
		<meta property="twitter:title" content="${data.pageTitle}" />
		<meta property="twitter:image" content="${data.ogimage}" />
		<meta property="twitter:description" content="${data.pageDesc}" />

		<link rel="canonical" href="${data.pageUrl}" />
		<link rel="stylesheet" href="/assets/style.css" />
		<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1216027646063680" crossorigin="anonymous"></script>

		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding/d2coding.css" />

		<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/icon-16.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/icon-32.png" />
		<link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/icon-48.png" />
		<link rel="shortcut icon" href="/assets/icons/icon-32.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/icon-180.png" />

		<link rel="alternate" hreflang="x-default" href="${data.siteUrl}/" />
		<link rel="alternate" hreflang="ko" href="${data.siteUrl}/?lang=ko" />
		<link rel="alternate" hreflang="en" href="${data.siteUrl}/" />

		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
		<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
	</head>
);