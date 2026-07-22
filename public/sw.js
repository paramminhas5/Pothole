// ============================================
// SAHAYATA — RESILIENT SERVICE WORKER
// ============================================
// Features:
// 1. Offline-first for critical content (directory, safety, static HTML)
// 2. Multi-mirror failover (if primary API is down, try mirrors)
// 3. Background sync for data freshness
// 4. Full offline directory + safety content cache

const CACHE_NAME = 'sahayata-v2';
const DATA_CACHE = 'sahayata-data-v1';

// Known mirrors — if primary is down, try these
const MIRRORS = [
  '', // Empty = same origin (primary)
  'https://sahayata.vercel.app',
  'https://sahayata.pages.dev',
  'https://sahayata.netlify.app',
];

// Critical pages to always cache
const STATIC_SHELL = [
  '/',
  '/directory',
  '/board',
  '/safety',
  '/create-post',
  '/manifest.json',
];

// Data endpoints to cache for offline
const DATA_ENDPOINTS = [
  '/api/chapters',
  '/api/posts',
  '/api/export?format=json&scope=all',
];

// ============================================
// INSTALL — pre-cache static shell
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_SHELL).catch(() => {
        // Don't fail install if some pages aren't available yet
        return cache.addAll(['/manifest.json']);
      });
    })
  );
  self.skipWaiting();
});

// ============================================
// ACTIVATE — clean old caches + cache data
// ============================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== DATA_CACHE)
            .map((key) => caches.delete(key))
        );
      }),
      // Pre-fetch data for offline
      cacheDataEndpoints(),
    ])
  );
  self.clients.claim();
});

// ============================================
// FETCH — intelligent routing with mirror failover
// ============================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // API requests: network-first with mirror failover, then cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(event.request));
    return;
  }

  // Static pages: stale-while-revalidate
  event.respondWith(handlePageRequest(event.request));
});

// ============================================
// API HANDLER — try primary, then mirrors, then cache
// ============================================
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname + url.search;

  // Try primary first
  try {
    const response = await fetchWithTimeout(request, 5000);
    if (response.ok) {
      // Cache successful response
      const cache = await caches.open(DATA_CACHE);
      cache.put(request, response.clone());
      return response;
    }
  } catch (e) {
    // Primary failed — try mirrors
  }

  // Try mirrors
  for (const mirror of MIRRORS) {
    if (!mirror) continue; // Skip empty (primary already tried)
    try {
      const mirrorUrl = mirror + pathname;
      const response = await fetchWithTimeout(mirrorUrl, 5000);
      if (response.ok) {
        const cache = await caches.open(DATA_CACHE);
        cache.put(request, response.clone());
        return response;
      }
    } catch (e) {
      // Mirror failed, try next
    }
  }

  // All mirrors failed — serve from cache
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  // Nothing available
  return new Response(JSON.stringify({ error: 'Offline — no cached data available', offline: true }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ============================================
// PAGE HANDLER — stale-while-revalidate
// ============================================
async function handlePageRequest(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => null);

  // Return cached immediately, update in background
  if (cached) {
    fetchPromise; // Fire-and-forget background update
    return cached;
  }

  // No cache — wait for network
  const response = await fetchPromise;
  if (response) return response;

  // Offline fallback
  return new Response(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sahayata — Offline</title><style>body{font-family:system-ui;max-width:600px;margin:0 auto;padding:40px 20px;text-align:center}h1{font-size:2rem;font-weight:900;margin-bottom:16px}.card{border:3px solid #000;padding:24px;margin:24px 0;box-shadow:5px 5px 0 #000}</style></head><body><h1>🤝 SAHAYATA</h1><div class="card"><h2>You are offline</h2><p>The safety information and directory are available offline if you visited them before.</p><p style="margin-top:16px"><a href="/safety">→ Know Your Rights (cached)</a></p><p><a href="/directory">→ Directory (cached)</a></p></div><p style="color:#666;font-size:14px">Connect to the internet to see latest needs & offers.</p></body></html>',
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  );
}

// ============================================
// UTILITIES
// ============================================
function fetchWithTimeout(urlOrRequest, timeout = 5000) {
  return Promise.race([
    fetch(urlOrRequest),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    ),
  ]);
}

async function cacheDataEndpoints() {
  const cache = await caches.open(DATA_CACHE);
  for (const endpoint of DATA_ENDPOINTS) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        cache.put(new Request(endpoint), response);
      }
    } catch (e) {
      // Silent — don't fail activation
    }
  }
}

// ============================================
// BACKGROUND SYNC — refresh data periodically
// ============================================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'refresh-data') {
    event.waitUntil(cacheDataEndpoints());
  }
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data === 'refresh-cache') {
    cacheDataEndpoints();
  }
});
