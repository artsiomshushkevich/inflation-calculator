async function getBuildId() {
  try {
    const response = await fetch('/build-id.txt', { cache: 'no-store' });
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // ignore
  }
  return 'dev';
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const buildId = await getBuildId();
      const CACHE_NAME = `inflation-calculator-${buildId}`;
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/dollar.svg',
        '/icons/icon-72x72.png',
        '/icons/icon-96x96.png',
        '/icons/icon-128x128.png',
        '/icons/icon-144x144.png',
        '/icons/icon-152x152.png',
        '/icons/icon-192x192.png',
        '/icons/icon-384x384.png',
        '/icons/icon-512x512.png',
        '/build-id.txt',
      ]);
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
}); 