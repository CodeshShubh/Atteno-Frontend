var cacheAll = false;
var CACHE_NAME = 'atteno-v1';
var urlsToCache = [
    '/ico-192x192.png',
    '/ico-512x512.png',
];
var urlsNotToCache = [];

// Install Event
self.addEventListener('install', function(event) {
    console.log("[SW] install event: ", event);
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('[SW] Opened cache: ', cache);
            return cache.addAll(urlsToCache);
        }).then(function() {
            // Cleanup old caches
            return caches.keys().then(function(keys) {
                return Promise.all(keys.filter(function(key) {
                    return key !== CACHE_NAME;
                }).map(function(key) {
                    return caches.delete(key);
                }));
            });
        })
    );
});

// Fetch Event
self.addEventListener('fetch', function(event) {
    console.log("[SW] fetch event: ", event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else if (!cacheAll || urlsNotToCache.indexOf(event.request.url) !== -1) {
                return fetch(event.request);
            } else {
                fetch(event.request).then(function(response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            }
        })
    );
});
