// SELF-DESTRUCTING SERVICE WORKER - v2
// This script replaces the old cache-holding worker to force a reset.

self.addEventListener('install', (event) => {
    // Take over immediately
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Delete all caches associated with this origin
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // Tell all clients (tabs) to reload properly or at least stop using the SW
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Passthrough to network - do NOT cache anything
    // This effectively disables the offline capability but ensures fresh content
    event.respondWith(fetch(event.request));
});
