import { Hono } from 'hono'

import { getLanguage, getCountry } from './functions/lang'
import { Layout } from './pages/layout/template.jsx'
import { handleMetaFile } from './handle-metafile.js'

/** @jsx jsx */
import { jsx } from 'hono/jsx'

const app = new Hono();

app.use('*', async (c, next) => {

    const metaResponse = await handleMetaFile(c);

    if (metaResponse) {
        return metaResponse;
    }

    const host = c.req.header('host') || 'chkip.org';
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
}); // 메인 페이지는 언어별로 리다이렉트

app.get('/:country', async (c) => {
    const { country } = c.req.param();
    let attrs = c.get('attrs');

    const cf = c.req.cf || c.req.raw?.cf;
    const ip = c.req.header('cf-pseudo-ipv4') || c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || "8.8.8.8";
    const lat = cf?.latitude || 37.5665;
    const lng = cf?.longitude || 126.9780;
    const city = cf?.city || 'Unknown';
    const countryCode = cf?.country || 'KR';
    const countryName = regionNames.of(countryCode);
    const isp = cf?.asOrganization || 'ISP';

    const countryTimeZone = cf?.timezone || 'Asia/Seoul';
    const translated = getLanguage('main', country);
    const articles = getLanguage('article', country);

    const pageDesc = 'Instantly verify your public IP address (IPv4/IPv6). Get precise geolocation data including city, coordinates, and ISP provider information with zero latency.';
    const pageTitle = 'What is my IP? - Fast & Accurate IP Geolocation';

    attrs = { ...attrs, pageDesc, pageTitle, countryCode };
    const data = { ...attrs, ip, lat, lng, city, isp, translated, countryCode, countryName, countryTimeZone, articles };

    return c.html(
        <Layout attrs={attrs}>
            <Main data={data} />
        </Layout>
    );
});

import articleRoute from './routes/article-route.js'
import footerRoute from './routes/footer-route.js'
app.route('/article', articleRoute);
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