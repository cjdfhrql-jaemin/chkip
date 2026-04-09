import { html } from 'hono/html'

export const Terms = ({ data }) => {
  return html`
<main role="main" id="app">
<div class="content">
    <h1>Terms of Service</h1>
    <div class="policies">
<strong>1. ${data.lang.terms1t}</strong>
${data.lang.terms1c}

<strong>2. ${data.lang.terms2t}</strong>
${data.lang.terms2c}

<strong>3. ${data.lang.terms3t}</strong>
${data.lang.terms3c1}

<ul><li>${data.lang.terms3c2}</li><li>${data.lang.terms3c3}</li></ul>
<strong>4. ${data.lang.terms4t}</strong>
${data.lang.terms4c}

<strong>5. ${data.lang.terms5t}</strong>
${data.lang.terms5c}
    </div>
    <a href="/" class="back-btn">← Back to Home</a>
</div>
</main>
  `;
}

export default Terms;