/** @jsx jsx */
import { jsx } from 'hono/jsx';

import { Hono } from 'hono';

import dbConfig from '../../db_config.json';
import mysql from 'mysql2/promise';
import { Feeds } from '../functions/db/feeds';
import { Layout } from '../pages/layout/template.jsx'
import Article from '../pages/article.jsx'
import { geminiTranslation } from '../functions/translation.js';
import { getLanguage } from '../functions/lang.js';

const articleRoute = new Hono();
articleRoute.get('/:id', async (c) => {
	const { id } = c.req.param();
	let attrs = c.get('attrs');

	const idMap = {1:4,2:5}

	const url = new URL(c.env.HH_DB.connectionString);
	url.searchParams.delete('ssl-mode');

	const pool = mysql.createPool({
		uri: url.toString(),
		...dbConfig.hh_db
	});

	const feeds = new Feeds(pool);
	
	try {

		const feedData = await feeds.getFeeds({ table: 'g5_write_tip', id: idMap[id] });
		const translatedTitle = getLanguage('article', attrs.targetLang);
		const pageTitle = translatedTitle[`a${id}_title`];
		const content = feedData[0].content;

		let translatedText;
		if (attrs.targetLang === 'ko') {
			translatedText = content;
		} else { 
			translatedText = await geminiTranslation(c, `tip_${idMap[id]}`, content, attrs.targetLang);
		}

		const canonicalUrl = `https://hh.pe.kr/tip/${idMap[id]}`;
		attrs = { ...attrs, canonicalUrl, pageTitle };

		return c.html(
			<Layout attrs={attrs}>
				<main role="main" id="app">
					<Article content={translatedText} canonicalUrl={canonicalUrl}/>
				</main>
			</Layout>
		);

	} catch (err) {
		console.error("라우트 에러:", err);
		return c.json({ error: err.message }, 500);
	} finally {
		await pool.end();
	}


});

export default articleRoute;

