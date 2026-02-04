const CACHE_NAME = 'rg-detailing-v8';

// Assets to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.png',
  '/logo.png',
  '/fonts/inter-latin-400-normal.woff2',
  '/fonts/inter-latin-700-normal.woff2',
  '/fonts/syne-latin-400-normal.woff2',
  '/fonts/syne-latin-700-normal.woff2',
  '/fonts/syne-latin-800-normal.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
             return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests unless it's a font or specific asset
  if (!event.request.url.startsWith(self.location.origin)) {
     // Optional: Cache Google Fonts or similar if needed
     return;
  }

  // Network First, fallback to Cache for HTML (pages)
  if (event.request.headers.get('Accept').includes('text/html')) {
     event.respondWith(
        // Use { cache: 'reload' } to force browser to ignore HTTP cache and go to network
        fetch(event.request, { cache: 'reload' })
           .then((response) => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                 cache.put(event.request, responseClone);
              });
              return response;
           })
           .catch(() => {
              return caches.match(event.request).then((response) => {
                 return response || caches.match('/'); // Fallback to home if offline
              });
           })
     );
     return;
  }

  // Stale-While-Revalidate for static assets (images, css, js)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                 const responseToCache = networkResponse.clone();
                 caches.open(CACHE_NAME).then((cache) => {
                      cache.put(event.request, responseToCache);
                 });
            }
            return networkResponse;
        });
        return cachedResponse || fetchPromise;
    })
  );
});
