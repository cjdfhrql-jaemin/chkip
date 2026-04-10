import { html } from 'hono/html'

export const Terms = ({ data }) => {
  return html`
<main role="main" id="app">
<div class="content">
    <h1>Terms of Service</h1>
    <div class="policies">
<strong>1. ${data.translated.terms1t}</strong>
${data.translated.terms1c}

<strong>2. ${data.translated.terms2t}</strong>
${data.translated.terms2c}

<strong>3. ${data.translated.terms3t}</strong>
${data.translated.terms3c1}

<ul><li>${data.translated.terms3c2}</li><li>${data.translated.terms3c3}</li></ul>
<strong>4. ${data.translated.terms4t}</strong>
${data.translated.terms4c}

<strong>5. ${data.translated.terms5t}</strong>
${data.translated.terms5c}
    </div>
    <a href="/" class="back-btn">← Back to Home</a>
</div>
</main>
  `;
}

export default Terms;