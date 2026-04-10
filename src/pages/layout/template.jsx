/** @jsx jsx */
import { jsx } from 'hono/jsx'

import { Head } from './head.jsx'
import { Footer } from './footer.jsx'

// 2. 인자로 title과 children을 받아야 함
export const Layout = ({ attrs, children }) => {
	return (
		<html lang="${attrs.countryCode.toLowerCase()}">
			<Head attrs={attrs} title={attrs.pageTitle} />
			<body>
				<div class="left-side side-ad">
					<ins class="adsbygoogle"
						style="display:block"
						data-ad-client="ca-pub-1216027646063680"
						data-ad-slot="6688222185"
						data-ad-format="auto"
						data-full-width-responsive="true"></ins>
					<script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
				</div>
				<div class="right-side side-ad">
					<ins class="adsbygoogle"
						style="display:block"
						data-ad-client="ca-pub-1216027646063680"
						data-ad-slot="6496650497"
						data-ad-format="auto"
						data-full-width-responsive="true"></ins>
					<script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
				</div>
				<div class="container">
					<div class="logo" style={{ cursor: 'pointer' }} onclick="location.href='/'">
						CHKIP<span>.ORG</span>
					</div>

					{children}

					<Footer />
				</div>
			</body>
		</html>
	);
};