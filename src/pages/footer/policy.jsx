import { html } from 'hono/html'

export const Policy = ({ data }) => {
  return html`
<main role="main" id="app">
<div class="content">
    <h1>Privacy Policy</h1>
    <div class="policies">
<strong>1. ${data.translate.policy1t}</strong>
${data.translate.policy1c1}
${data.translate.policy1c2}

<strong>2. ${data.translate.policy2t}</strong>
${data.translate.policy2c1}

${data.translate.policy2c2}

${data.translate.policy2c3}

<strong>3. ${data.translate.policy3t}</strong>
${data.translate.policy3c1}

${data.translate.policy3c2}

${data.translate.policy3c3}

${data.translate.policy3c4}

${data.translate.policy3c5} ${data.translate.policy3c6}
    </div>
    <ul>
      <li><a href="https://policies.google.com/technologies/ads" target="_blank">Google’s Privacy & Terms</a></li>
      <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank">How Google uses data (Partner Sites)</a></li>
      <li><a href="https://policies.google.com/technologies/cookies" target="_blank">Google's cookie usage policy</a></li>
      <li><a href="https://support.google.com/adspolicy/answer/7475709" target="_blank">Google Ads Customer Data Policy</a></li>
    </ul>
    <a href="/" class="back-btn">← Back to Home</a>
</div>
</main>
`;
}

export default Policy;