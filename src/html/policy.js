import { head } from './layout/head.js';
import { footer } from './layout/footer.js';

function body(data,lang) {
  return `
<div class="content">
    <h1>Privacy Policy</h1>
    <div class="policies">
<strong>1. ${lang.policy1t}</strong>
${lang.policy1c1}
${lang.policy1c2}

<strong>2. ${lang.policy2t}</strong>
${lang.policy2c1}

${lang.policy2c2}

${lang.policy2c3}

<strong>3. ${lang.policy3t}</strong>
${lang.policy3c1}

${lang.policy3c2}

${lang.policy3c3}

${lang.policy3c4}

${lang.policy3c5} ${lang.policy3c6}
    </div>
    <ul>
      <li><a href="https://policies.google.com/technologies/ads" target="_blank">Google’s Privacy & Terms</a></li>
      <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank">How Google uses data (Partner Sites)</a></li>
      <li><a href="https://policies.google.com/technologies/cookies" target="_blank">Google's cookie usage policy</a></li>
      <li><a href="https://support.google.com/adspolicy/answer/7475709" target="_blank">Google Ads Customer Data Policy</a></li>
    </ul>
    <a href="/" class="back-btn">← Back to Home</a>
</div>`;
}

export const render = (data, lang) => {
return `
<!DOCTYPE html>
<html lang="${data.countryCode.toLowerCase()}">
<head>
${head(data)}
</head>
<body>
  <div class="container">
    <div class="left-side side-ad">
      <ins class="adsbygoogle"style="display:block" data-ad-client="ca-pub-1216027646063680" data-ad-slot="6688222185" data-ad-format="auto"data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
    <div class="right-side side-ad">
      <ins class="adsbygoogle"style="display:block" data-ad-client="ca-pub-1216027646063680" data-ad-slot="6496650497" data-ad-format="auto"data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
    
    <main role="main" id="app">
      ${body(data, lang)}
    </main>

    ${footer()}
  </div>

  <script>
  async function navigateTo(path) {
      if (path === location.pathname) return;
      history.pushState(null, null, path);
      
      try {
          const response = await fetch(path, { headers: { "X-SPA-Request": "true" } });
          const html = await response.text();
          const appDiv = document.getElementById('app');
          
          if (appDiv) {
              appDiv.innerHTML = html;
              const scripts = appDiv.querySelectorAll("script");
              scripts.forEach(oldScript => {
                  const newScript = document.createElement("script");
                  newScript.text = oldScript.text;
                  oldScript.parentNode.replaceChild(newScript, oldScript);
              });
              window.scrollTo(0, 0);
          }

      } catch (err) {
          location.href = path;
      }
  }

  window.onpopstate = () => {
      const path = location.pathname;
      fetch(path, { headers: { "X-SPA-Request": "true" } })
          .then(res => res.text())
          .then(html => {
              document.getElementById('app').innerHTML = html;
          });
  };
  </script>
</body>
</html>
`;
}