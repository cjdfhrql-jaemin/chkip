/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { html, raw } from 'hono/html'


export const Article = ({ content }) => {

	return html`
		
		<main role="main" id="app">
			<div class="card article">
				${raw(content)}
			</div>
		</main>
`;
}

export default Article;