const cacheName = 'v1';
const cacheAssets = ['index.html', 'client.js', 'thorfinn.jpg', 'pty.js']

// install event
self.addEventListener('install', event => {
    console.log('Service Worker:installed')
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: caching Files')
            cache.addAll(cacheAssets);
        })
        //the new sw can take place now
        .then(() => self.skipWaiting())
    )

})

//activate event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated')
    event.waitUntil(deleteOldCaches())
})

self.addEventListener("fetch", (event) => {

});
self.addEventListener('push', event => {
    const boss = 'Elon Musk';
    var options = {
        body: "Waiting for you feedback",
    }
    self.registration.showNotification(boss, options)
})


const deleteOldCaches = async () => {
    const cacheKeepList = ["v1"];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};
const deleteCache = async (key) => {
    await caches.delete(key);
};

//fetch event
const putInCache = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
};

const cacheFirst = async ({
    request,
    preloadResponsePromise,
    fallbackUrl
}) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    // Next try to get the resource from the network
    try {
        const responseFromNetwork = await fetch(request);
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
        // when even the fallback response is not available,
        // there is nothing we can do, but we must always
        // return a Response object
        return new Response("Network error happened", {
            status: 408,
            headers: {
                "Content-Type": "text/plain"
            },
        });
    }
};

self.addEventListener("fetch", (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request,
            fallbackUrl: "thorfinn.jpg",
        })
    );
});