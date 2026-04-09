/** @jsx jsx */
import { jsx } from 'hono/jsx'

export const About = ({ data }) => {

	return (
		<main role="main" id="app">
			<div class="content">
				<h1>About {data.host.toUpperCase()}</h1>
				<p>{data.lang.about}</p>
				<a href="/" class="back-btn">← Back to Home</a>
			</div>
		</main>
	);

}

export default About;