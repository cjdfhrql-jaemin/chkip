import { head } from './layout/head.js';
import { footer } from './layout/footer.js';

function body(data,lang) {
  return `
<div class="content">
    <h1>About ${data.url.host.toUpperCase()}</h1>
    <p>${lang.about}</p>
    <a href="/" class="back-btn">← Back to Home</a>
</div>
  `;
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