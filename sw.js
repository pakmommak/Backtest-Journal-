const CACHE_NAME = 'backtest-bull-pwa-v8-20261022';
const APP_SCOPE = new URL('./', self.location.href);
const APP_FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_FILES.map(async path => {
      try { const response = await fetch(new URL(path, APP_SCOPE), {cache: 'reload'}); if (response.ok) await cache.put(new URL(path, APP_SCOPE), response); } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('backtest-bull-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_SCOPE.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response && response.ok && request.url.split('?')[0].endsWith('/')) await cache.put(request, response.clone());
      else if (response && response.ok && /\.(html|json|js|png|css)$/.test(url.pathname)) await cache.put(request, response.clone());
      return response;
    } catch (_) {
      const cached = await cache.match(request) || await cache.match(new URL('./index.html', APP_SCOPE));
      return cached || new Response('Backtest Journal is offline. Please reconnect and reopen the app.', {status: 503, headers: {'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});
