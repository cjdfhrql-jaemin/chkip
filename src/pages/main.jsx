/** @jsx jsx */
import { jsx } from 'hono/jsx'

export const Main = ({ data }) => {

	return (
		<main role="main" id="app">
			<div class="card">
				<h1>IP Checker</h1>
				<h2>Your ip is</h2>
				<div class="ip">{data.ip}</div>
				<div class="info">
					<span>{data.city}, {data.countryTimeZone}</span>
					<img src={`https://hh.pe.kr/assets/img/flags/${data.countryCode}.png`} alt={data.countryName} onerror="this.style.display='none'" />
				</div>
				<div class="desc">
					Network: {data.isp}
					<blockquote>Privacy-focused analytics. We respect your data and comply with global privacy standards. <a href="/policy">Privacy Policy</a></blockquote>
				</div>
			</div>

			<div class="map-container">
				<div id="map" data-lat={data.lat} data-lng={data.lng}></div>
				<div class="desc">The measurement location may not be accurate.</div>
			</div>

			<div class="content">
				<h2>Serverless Architecture</h2>
				<p>{data.translate.desc1_1}&nbsp;{data.translate.desc1_2}</p>
				<div class="tech-note">
					<strong>What is Cloudflare Workers?</strong><br />
					{data.translate.desc2_1}&nbsp;{data.translate.desc2_2}
				</div>
				<h2 style="margin-top:30px;">Optimized Network Visibility</h2>
				<p>{data.translate.desc3_1}&nbsp;{data.translate.desc3_2}</p>
			</div>

			<script dangerouslySetInnerHTML={{
				__html: `
function getRemoteDateTime() {
	const now = new Date();

	// 날짜 포맷 (2026년 3월 12일 목요일)
	const dateStr = new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
		timeZone: "Asia/Seoul"
	}).format(now);

	// 시간 포맷 (14:30:05)
	const timeStr = new Intl.DateTimeFormat('ko-KR', {
		hour: '2-digit', minute: '2-digit', second: '2-digit',
		hour12: false,
		timeZone: "Asia/Seoul"
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
				
window.onload = function() { 
	initHome('${data.lat}', '${data.lng}');
};


const MAP_CONFIG = { zoomLevel: 13, flyDuration: 1.0, initialZoom: 3, markerRadius: 10 };
let map;

function initHome(lat, lng) {
const mapEl = document.getElementById('map');
if (!mapEl) { return; }
if (map) { map.remove(); }
map = L.map('map', {worldCopyJump: true,zoomSnap: 0.5,wheelDebounceTime: 100,minZoom: 1}).setView([37.566, 126.9784], MAP_CONFIG.initialZoom);

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
	<div style="font-size:0.8em; color:#3498db;">Asia/Seoul</div>
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
`
			}} />
		</main>
	);
}

export default Main;