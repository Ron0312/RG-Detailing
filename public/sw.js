/**
 * KILLER SERVICE WORKER v6 (The Overwriter)
 * This script exists solely to overwrite any lingering 'sw.js' on the server.
 * It immediately unregisters itself, deletes all caches, and reloads the page.
 */

self.addEventListener('install', function(e) {
    console.log('Killer SW v6 (Overwriter): Installing...');
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    console.log('Killer SW v6 (Overwriter): Activating...');

    e.waitUntil(
        self.clients.claim().then(function() {
            // 1. Unregister self
            return self.registration.unregister();
        }).then(function() {
            // 2. Delete all caches
            return caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        console.log('Killer SW v6: Deleting cache', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            });
        }).then(function() {
            // 3. Force reload all clients
            return self.clients.matchAll({type: 'window'});
        }).then(function(clients) {
            clients.forEach(function(client) {
                if (client.url && 'navigate' in client) {
                    console.log('Killer SW v6: Reloading client', client.url);
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
