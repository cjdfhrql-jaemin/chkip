/** @jsx jsx */
import { jsx, Fragment } from 'hono/jsx'

export const Footer = () => (
	<footer role="contentinfo">
		<div class="copy">&copy; 2026 CHKIP.ORG  Built with <a href="https://cloudflare.com" target="_blank">cloudflare.com</a></div>
		<ul>
			<li><a href="/footer/about">About</a></li>
			<li><a href="/footer/terms">Terms of Service</a></li>
			<li><a href="/footer/policy">Privacy Policy</a></li>
		</ul>
	</footer>
);