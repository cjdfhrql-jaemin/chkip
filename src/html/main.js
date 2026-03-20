import { head } from './layout/head.js';
import { footer } from './layout/footer.js';

export const render = (data,lang) => {
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
      <div class="card">
          <h1>Serverless IP Checker</h1>
          <h2>Your ip is</h2>
          <div class="ip">${data.ip}</div>
          <div class="info">
              <span>${data.city}, ${data.countryName}</span> 
              <img src="https://hh.pe.kr/assets/img/flags/${data.countryCode.toLowerCase()}.png" alt="${data.countryName}" onerror="this.style.display='none'"/>
          </div>
          <div class="desc">
              Network: ${data.isp}
              <blockquote>Privacy-focused analytics. We respect your data and comply with global privacy standards. <a href="/policy">Privacy Policy</a></blockquote>
          </div>
      </div>

      <div class="map-container">
        <div id="map" data-lat="${data.lat}" data-lng="${data.lng}"></div>
        <div class="desc">The measurement location may not be accurate.</div>
      </div>

      <div class="content-ad">
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1216027646063680" data-ad-slot="2275435502" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>

      <div class="content">
          <h2>Serverless Architecture</h2>
          <p>${lang.desc1_1}&nbsp;${lang.desc1_2}</p>
          <div class="tech-note">
              <strong>What is Cloudflare Workers?</strong><br>
              ${lang.desc2_1}&nbsp;${lang.desc2_2}
          </div>
          <h2 style="margin-top:30px;">Optimized Network Visibility</h2>
          <p>${lang.desc3_1}&nbsp;${lang.desc3_2}</p>
      </div>

      <script>
      //날짜와 시간을 각각 포맷팅하는 함수
      function getRemoteDateTime() {
        const now = new Date();
        
        // 날짜 포맷 (2026년 3월 12일 목요일)
        const dateStr = new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
          timeZone: "${data.countryTimeZone}"
        }).format(now);

        // 시간 포맷 (14:30:05)
        const timeStr = new Intl.DateTimeFormat('ko-KR', {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour12: false,
          timeZone: "${data.countryTimeZone}"
        }).format(now);

        return { dateStr, timeStr };
      }

      //팝업 업데이트 함수
      function updateClock() {
        const { dateStr, timeStr } = getRemoteDateTime();
        const dateEl = document.getElementById('remote-date');
        const timeEl = document.getElementById('remote-clock');
        if(dateEl) dateEl.innerText = dateStr;
        if(timeEl) timeEl.innerText = timeStr;
      }
      </script>


      <script>
      window.onload = function() { 
        if (location.pathname === "/") {
          initHome('${data.lat}', '${data.lng}');
        }
      };

      const MAP_CONFIG = { zoomLevel: 13, flyDuration: 1.0, initialZoom: 3, markerRadius: 10 };
      let map;

      function initHome(lat, lng) {
        const mapEl = document.getElementById('map');
        if (!mapEl) { return; }
        if (map) { map.remove(); }
        map = L.map('map', {worldCopyJump: true,zoomSnap: 0.5,wheelDebounceTime: 100,minZoom: 1}).setView([${data.lat}, ${data.lng}], MAP_CONFIG.initialZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        setTimeout(function() {
          map.invalidateSize(true); // true 옵션 : 애니메이션과 함께 부드럽게 재배치
        }, 100);

        // 4. 초기 팝업 내용 설정
        const initial = getRemoteDateTime();
        const popupContent = \`
          <div style="text-align:center; min-width:180px; font-family: sans-serif;">
            <div style="font-size:0.85em; color:#888; margin-bottom:4px;">🌐 Your time</div>
            <div id="remote-date" style="font-size:0.95em; color:#34495e; font-weight:500;">\${initial.dateStr}</div>
            <div id="remote-clock" style="font-size:1.8em; font-weight:bold; color:#2c3e50; margin:5px 0;">\${initial.timeStr}</div>
            <div style="font-size:0.8em; color:#3498db;">${data.countryTimeZone}</div>
          </div>
        \`;

        const markerSize = 14; // CSS에서 정한 width/height
        const pulseIcon = L.divIcon({
            className: 'custom-div-icon',
            html: '<div class="gps-marker"></div>',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize / 2], // 정중앙
            popupAnchor: [0, -markerSize / 2] // 팝업이 마커 바로 위에서 뜨게 함
        });

        clearInterval(updateClock);
        setInterval(updateClock, 1000);
        
        L.marker([lat, lng], { icon: pulseIcon }).addTo(map).bindPopup(popupContent).openPopup();
      }
      </script>
    
    </main>

    <footer role="contentinfo">
        <div class="copy">&copy; 2026 CHKIP.ORG  Built with <a href="https://cloudflare.com" target="_blank">cloudflare.com</a></div>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/policy">Privacy Policy</a></li>
        </ul>
    </footer>
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