const CACHE_NAME = 'rg-detailing-v1';

// Add assets you want to cache immediately
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
            return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              // Cache static assets (images, fonts, css, js)
              if (event.request.url.match(/\.(js|css|png|jpg|jpeg|svg|woff2)$/)) {
                  cache.put(event.request, responseToCache);
              }
            });

            return networkResponse;
        });
    })
  );
});
