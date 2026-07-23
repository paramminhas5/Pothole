/**
 * Sahayata Service Worker — Offline-first, mirror failover, strategic caching.
 * 
 * Strategy:
 * - Static pages (guides, tools, templates): Cache-first (available offline)
 * - API calls: Network-first with offline queue
 * - Critical resources: Pre-cached on install
 * - Mirror failover: If primary fails, try mirrors from mirrors.json
 */

const CACHE_NAME = 'sahayata-v2';
const OFFLINE_QUEUE_KEY = 'sahayata-offline-queue';

// Pages that should be available offline (all guide/reference content)
const PRECACHE_URLS = [
  '/',
  '/safety',
  '/resources',
  '/playbook',
  '/toolkit',
  '/communication',
  '/organize',
  '/alerts',
  '/manifesto',
  '/guide',
  '/rti',
  '/fir',
  '/groups',
  '/demands',
  '/vault',
  '/representatives',
];

// Install: pre-cache critical pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // If some pages fail to cache, continue anyway
        console.warn('[SW] Some pages failed to pre-cache');
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: strategy based on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests (POST/PUT etc go to network, queued if offline)
  if (event.request.method !== 'GET') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Queue for later sync
        return new Response(JSON.stringify({ queued: true, error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // API calls: network-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful API responses briefly
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || offlineResponse()))
    );
    return;
  }

  // Static assets and pages: cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Return cached, but update in background
        fetch(event.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response));
          }
        }).catch(() => {});
        return cached;
      }
      // Not cached: try network, then try mirrors, then offline
      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => tryMirrors(event.request));
    })
  );
});

// Mirror failover disabled until signed-data verification is implemented.
// See: docs/WORLD_CLASS_CIVIC_PLATFORM_IMPLEMENTATION_PLAN.md P0-15
async function tryMirrors(/* request */) {
  return offlineResponse();
}

function offlineResponse() {
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sahayata — Offline</title><style>body{font-family:system-ui;max-width:600px;margin:4rem auto;padding:1rem;text-align:center}h1{font-size:1.5rem}p{color:#666}.num{font-size:2rem;font-weight:bold;display:block;margin:0.5rem 0}</style></head><body><h1>Sahayata — Offline Mode</h1><p>You are offline. Cached guides and tools are still available.</p><p>Emergency numbers (always work from your phone dialer):</p><span class="num">112</span><p>Unified Emergency</p><span class="num">181</span><p>Women Helpline</p><span class="num">1098</span><p>Childline</p><p style="margin-top:2rem"><a href="/">← Try loading homepage</a></p></body></html>`,
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
