/**
 * KILLER SERVICE WORKER v4 (ES5 Safe)
 * This script is designed to unregister itself and force a page reload.
 */

self.addEventListener('install', function(e) {
    console.log('Killer SW v4: Installing...');
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    console.log('Killer SW v4: Activating...');

    // 1. Claim clients
    e.waitUntil(
        self.clients.claim().then(function() {
            // 2. Unregister self
            return self.registration.unregister();
        }).then(function() {
            // 3. Delete all caches
            return caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        console.log('Killer SW v4: Deleting cache', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            });
        }).then(function() {
            // 4. Force reload all clients
            return self.clients.matchAll({type: 'window'});
        }).then(function(clients) {
            clients.forEach(function(client) {
                if (client.url && 'navigate' in client) {
                    console.log('Killer SW v4: Navigating client', client.url);
                    client.navigate(client.url);
                }
            });
        })
    );
});

self.addEventListener('fetch', function(e) {
    // Pass through all requests to network
    e.respondWith(fetch(e.request));
});
