/** @jsx jsx */
import { jsx } from 'hono/jsx'

import { Head } from './head.jsx'
import { Footer } from './footer.jsx'
import { html } from 'hono/html'

// 2. 인자로 title과 children을 받아야 함
export const Layout = ({ attrs, children }) => {

	const googleAd = (slotId) => html`
			<ins class="adsbygoogle"
				style="display:block"
				data-ad-client="ca-pub-1216027646063680"
				data-ad-slot="${slotId}"
				data-ad-format="auto"
				data-full-width-responsive="true"></ins>
		<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
	`;

	return (
		<html lang="${attrs.countryCode.toLowerCase()}">
			<Head attrs={attrs} title={attrs.pageTitle} />
			<body>
				<div class="left-side side-ad">
					{googleAd('6688222185')}
				</div>
				<div class="right-side side-ad">
					{googleAd('6496650497')}
				</div>
				<div class="container">
					<div class="logo" style="cursor: pointer" onclick="location.href='/'">
						CHKIP<span>.COM</span>
					</div>

					{children}

					<Footer />
				</div>
			</body>
		</html>
	);
};