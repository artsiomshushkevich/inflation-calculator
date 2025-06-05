async function getBuildId() {
  try {
    const response = await fetch('/inflation-calculator/build-id.txt', { cache: 'no-store' });
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // ignore
  }
  return 'dev';
}

const BASE_PATH = '/inflation-calculator';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const buildId = await getBuildId();
      const CACHE_NAME = `inflation-calculator-${buildId}`;
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        `${BASE_PATH}/`,
        `${BASE_PATH}/index.html`,
        `${BASE_PATH}/manifest.json`,
        `${BASE_PATH}/dollar.svg`,
        `${BASE_PATH}/icons/icon-72x72.png`,
        `${BASE_PATH}/icons/icon-96x96.png`,
        `${BASE_PATH}/icons/icon-128x128.png`,
        `${BASE_PATH}/icons/icon-144x144.png`,
        `${BASE_PATH}/icons/icon-152x152.png`,
        `${BASE_PATH}/icons/icon-192x192.png`,
        `${BASE_PATH}/icons/icon-384x384.png`,
        `${BASE_PATH}/icons/icon-512x512.png`,
        `${BASE_PATH}/build-id.txt`,
        `${BASE_PATH}/404.html`
      ]);
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle root path requests when launched from home screen
  if (url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      caches.match(`${BASE_PATH}/index.html`)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
    return;
  }

  // Handle all other requests
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