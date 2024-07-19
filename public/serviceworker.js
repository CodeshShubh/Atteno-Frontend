const CURRENT_CACHE_NAME = 'atteno-v1.1'; // Update this version when you make changes
const urlsToCache = [
    '/ico-192x192.png',
    '/ico-512x512.png',
];

self.addEventListener('install', function(event) {
    console.log("[SW] install event: ", event);

    // Skip waiting to activate the new service worker immediately
    self.skipWaiting();

    event.waitUntil(
        caches.open(CURRENT_CACHE_NAME).then(function(cache) {
            console.log('[SW] Opened cache: ', cache);
            return cache.addAll(urlsToCache);
        }).then(function() {
            // Cleanup old caches
            return caches.keys().then(function(keys) {
                return Promise.all(keys.filter(function(key) {
                    return key !== CURRENT_CACHE_NAME;
                }).map(function(key) {
                    return caches.delete(key);
                }));
            });
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("[SW] activate event: ", event);

    // Claim clients immediately
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener('fetch', function(event) {
    console.log("[SW] fetch event: ", event);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function(response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CURRENT_CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }).catch(function() {
                    console.error('Failed to fetch:', event.request.url);
                    return new Response('Network error occurred');
                });
            }
        }).catch(function() {
            console.error('Failed to match cache:', event.request.url);
            return new Response('Cache match error');
        })
    );
});
