/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { html, raw } from 'hono/html'


export const Article = ({ content, canonicalUrl, title }) => {

	return html`
		
		<main role="main" id="app">
			<div class="card article">
				<h2>${title}</h2>
				${raw(content)}
				<hr />
				<div class="source">Source : <a href="${canonicalUrl}" target="_blank">${canonicalUrl}</a></div>
			</div>
		</main>
`;
}

export default Article;