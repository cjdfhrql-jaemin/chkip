/** @jsx jsx */
import { jsx } from 'hono/jsx';

import { Hono } from 'hono';
import { Layout } from '../pages/layout/template.jsx';
import { getLanguage } from '../functions/lang.js';

const footerRoute = new Hono();

footerRoute.get('/:page', async (c) => {
	const { page } = c.req.param();
	let attrs = c.get('attrs');

	const host = c.req.header('host') || 'chktime.com';
	let data = c.get('data');
	
	const translated = getLanguage(page, attrs.targetLang);
	data = { ...data, host, translated };

	let module = null;
	try {
		module = await import(`../pages/footer/${page}.jsx`);
	} catch (error) {
		console.error(error);
		return c.notFound();
	}

	const Component = module.default;
	const pageTitle = 'About';
	attrs = { ...attrs, pageTitle, translated };

	return c.html(
		<Layout attrs={attrs}>
			<Component data={data} />
		</Layout>
	);
});

export default footerRoute;

