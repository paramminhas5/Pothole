// Cache only public, non-sensitive static assets. Pages, APIs, alerts, directory
// data, posts, and user content must always use the network.
const CACHE_NAME = 'sahayata-public-static-v3';
const PUBLIC_STATIC_RESOURCES = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];
const PUBLIC_STATIC_PATHS = new Set(PUBLIC_STATIC_RESOURCES);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PUBLIC_STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('sahayata-') && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.search !== '' ||
    !PUBLIC_STATIC_PATHS.has(url.pathname)
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(async (response) => {
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request, { cacheName: CACHE_NAME });
        return cached ?? Response.error();
      })
  );
});
