// Destinned offline cache: serves the site from cache, refreshing it in the background.
const CACHE='orrery-v151';
const FILES=['./','index.html','manifest.webmanifest','fonts/fonts.css','fonts/poppins-500.woff','fonts/poppins-600.woff','fonts/poppins-700.woff','fonts/poppins-800.woff','fonts/manrope.woff','fonts/noto-sans-symbols.woff','fonts/noto-sans-symbols-2.woff','icons/favicon-192.png','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','data/asteroids.js','data/tarot-cards.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
// On activate: drop old caches, take control of open pages, and if this replaced an older version, reload those pages so they run the new site.
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys(),old=ks.filter(k=>k!==CACHE&&/^orrery-/.test(k));await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();
 if(old.length){const cs=await self.clients.matchAll({type:'window'});cs.forEach(c=>{try{c.navigate(c.url).catch(()=>{})}catch(_){}})}})())});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting()});
// Pages and data files: network first so updates show immediately, cache when offline. Fonts and icons: cache first.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;const u=new URL(e.request.url),fresh=e.request.mode==='navigate'||/\.(html|js|webmanifest)$/.test(u.pathname)||u.pathname.endsWith('/');
 e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
  if(fresh)return fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>hit||Response.error());
  const net=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>hit);return hit||net}))});
