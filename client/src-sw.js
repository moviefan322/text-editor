const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// TODO: Implement asset caching
const assetCache = new CacheFirst({ cacheName: "asset-cache" });
registerRoute(({ request }) => request.destination === "style", assetCache);
registerRoute(({ request }) => request.destination === "script", assetCache);
registerRoute(({ request }) => request.destination === "image", assetCache);
registerRoute(({ request }) => request.mode === "navigate", pageCache);

offlineFallback({
  pageFallback: "/index.html",
});
registerRoute();
