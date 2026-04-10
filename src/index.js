import { Hono } from 'hono'

import { getLanguage, getCountry } from './functions/lang'
import { Layout } from './pages/layout/template.jsx'
import { handleMetaFile } from './handle-metafile.js'

/** @jsx jsx */
import { jsx } from 'hono/jsx'

const app = new Hono();

const getDomain = (c) => {
    const encoded = c.req.header('x-encoded-host');
    let domain = 'chkip.org'; // 기본값

    if (encoded) {
        try {
            // Base64를 다시 텍스트로 변환
            domain = atob(encoded);
        } catch (e) {
            console.error('인코딩 오류:', e);
        }
    }
    return domain || c.req.header('host');
}

app.use('*', async (c, next) => {

    const metaResponse = await handleMetaFile(c);

    if (metaResponse) {
        return metaResponse;
    }

    const domain = getDomain(c);
    const host = domain || c.req.header('host');
    const pageUrl = c.req.url;
    const acceptLang = c.req.header('accept-language') || '';
    const targetLang = getCountry(acceptLang);
    const attrs = { host, pageUrl, targetLang };

    c.set('attrs', attrs);
    await next();
});

import Main from './pages/main.jsx';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
app.get('/', (c) => {
    const attrs = c.get('attrs');
    return c.redirect(`/${attrs.targetLang}`, 302);
});

app.get('/:country', async (c) => {
	const { country } = c.req.param();
    let attrs = c.get('attrs');


    const cf = c.req.cf || c.req.raw?.cf;
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || c.req.header('cf-pseudo-ipv4') || "8.8.8.8";
    const lat = cf?.latitude || 37.5665;
    const lng = cf?.longitude || 126.9780;
    const city = cf?.city || 'Unknown';
    const countryCode = cf?.country || 'KR';
    const countryName = regionNames.of(countryCode);
    const isp = cf?.asOrganization || 'ISP';

    const countryTimeZone = cf?.timezone || 'Asia/Seoul';
    const translate = getLanguage(country);

    const pageDesc = 'Instantly verify your public IP address (IPv4/IPv6). Get precise geolocation data including city, coordinates, and ISP provider information with zero latency.';
    const pageTitle = 'What is my IP? - Fast & Accurate IP Geolocation';

    attrs = { ...attrs, pageDesc, pageTitle };
    const data = { ...attrs, ip, lat, lng, city, isp, translate, countryCode, countryName, countryTimeZone };

    return c.html(
        <Layout attrs={attrs}>
            <Main data={data} />
        </Layout>
    );
});

import footerRoute from './routes/footer-route.js'
app.route('/footer', footerRoute);

app.notFound((c) => {
    let attrs = c.get('attrs');
    attrs = { ...attrs, pageDesc: 'Page not found', pageTitle: 'Page Not Found' };
    return c.html(
        <Layout attrs={attrs}>
            <div class="card not-found">Not Found Page</div>
        </Layout>, 404);
});

export default app;