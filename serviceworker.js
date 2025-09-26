const CACHE_NAME = "mi-app-cache-v2";
const urlsToCache = [
  "./serviceworker.js",          
  "./index.html",
  "./style.css",
  "./script.js",
  "./img/"
];

// Instalar SW y cachear archivos
self.addEventListener("install", event => {
  console.log("SW: Instalando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("SW: Archivos cacheados");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar SW y limpiar caches viejos
self.addEventListener("activate", event => {
  console.log("SW: Activado");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
