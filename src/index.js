import { Hono } from 'hono'

import { getLanguage } from './functions/lang'
import { Layout } from './pages/layout/template.jsx'
import { handleMetaFile } from './handle-metafile.js'
import { prettyHtml } from './functions/pretty-html.js'

/** @jsx jsx */
import { jsx } from 'hono/jsx'

const app = new Hono();

const getDomain = (c) => {
    const encoded = c.req.header('x-encoded-host');
    let domain = 'chktime.com'; // 기본값

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
    const cf = c.req.raw.cf || {};

    const host = domain || c.req.header('host');
    const ip = c.req.header('cf-pseudo-ipv4') || c.req.header('cf-connecting-ip') || "8.8.8.8";
    const lat = c.req.cf?.latitude || 37.5665;
    const lng = c.req.cf?.longitude || 126.9780;
    const city = c.req.cf?.city || 'Unknown';
    const isp = c.req.cf?.asOrganization || 'ISP';
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const countryCode = (c.req.cf?.country || 'KR');
    const countryName = regionNames.of(countryCode || 'KR');
    const countryTimeZone = c.req.cf?.timezone || 'Asia/Seoul';
    const lang = getLanguage(cf);
    const data = {
        ip, lat, lng, city, isp, lang, countryCode, countryName, countryTimeZone, host
    };

    c.set('data', data);

    if (typeof next === 'function') {
        await next();
    }

    if (host.startsWith('local.hh.pe.kr')) {
        const contentType = c.res.headers.get('Content-Type');
        if (contentType && contentType.includes('text/html')) {
            await prettyHtml(c);
        }
    }
});

import footerRoute from './routes/footer-route.js'
app.route('/footer', footerRoute);

import Main from './pages/main.jsx';

app.get('/', async (c) => {
    const data = c.get('data');
    const domain = data.domain;

    return c.html(
        <Layout title={domain}>
            <Main data={data} />
        </Layout>
    );
});

app.notFound((c) => {
    return c.html(
        <Layout title="404">
            <div class="card not-found">Not Found Page</div>
        </Layout>, 404);
});

export default app;