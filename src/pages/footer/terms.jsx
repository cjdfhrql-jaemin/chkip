import { html } from 'hono/html'

export const Terms = ({ data }) => {
  return html`
<main role="main" id="app">
<div class="content">
    <h1>Terms of Service</h1>
    <div class="policies">
<strong>1. ${data.translate.terms1t}</strong>
${data.translate.terms1c}

<strong>2. ${data.translate.terms2t}</strong>
${data.translate.terms2c}

<strong>3. ${data.translate.terms3t}</strong>
${data.translate.terms3c1}

<ul><li>${data.translate.terms3c2}</li><li>${data.translate.terms3c3}</li></ul>
<strong>4. ${data.translate.terms4t}</strong>
${data.translate.terms4c}

<strong>5. ${data.translate.terms5t}</strong>
${data.translate.terms5c}
    </div>
    <a href="/" class="back-btn">← Back to Home</a>
</div>
</main>
  `;
}

export default Terms;