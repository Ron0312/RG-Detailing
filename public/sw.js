// KILLER SERVICE WORKER v3
// This script forces immediate activation and cache cleanup.

const CACHE_NAMES = ['rg-detailing-v1', 'rg-detailing-v2', 'astro-cache'];

self.addEventListener('install', (event) => {
    // Force this worker to become the active worker immediately
    console.log('Killer SW: Installing...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Killer SW: Activating & Cleaning...');
    // Take control of all clients immediately
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            // Delete ALL caches to ensure fresh content
            caches.keys().then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    console.log('Killer SW: Deleting cache', key);
                    return caches.delete(key);
                }));
            })
        ])
    );
});

self.addEventListener('fetch', (event) => {
    // Always go to network. Never cache.
    event.respondWith(fetch(event.request));
});
