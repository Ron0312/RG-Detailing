// KILLER SERVICE WORKER v5
// Renamed to bypass server-side caching of 'sw.js'

self.addEventListener('install', (event) => {
    console.log('Killer SW v5: Installing...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Killer SW v5: Activating & Cleaning...');
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    console.log('Killer SW v5: Deleting cache', key);
                    return caches.delete(key);
                }));
            })
        ]).then(() => {
            // Force reload all clients
            self.clients.matchAll({type: 'window'}).then(clients => {
                clients.forEach(client => {
                    if (client.url && 'navigate' in client) {
                        client.navigate(client.url);
                    }
                });
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Pass through to network
    event.respondWith(fetch(event.request));
});
