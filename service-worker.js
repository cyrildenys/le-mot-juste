/* =====================================================================
   Le Mot Juste — Service Worker
   Précache tous les assets → l'application fonctionne 100% hors-ligne.
   Incrémenter CACHE à chaque changement d'assets pour forcer la MAJ.
   ===================================================================== */
const CACHE = "le-mot-juste-v2";

const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/styles.css",
  "js/core.js",
  "js/conjugueur.js",
  "js/view-regles.js",
  "js/view-motdujour.js",
  "js/view-dictee.js",
  "js/app.js",
  "data/regles.js",
  "data/confusions.js",
  "data/mauvais-usages.js",
  "data/nuances.js",
  "data/grammaire.js",
  "data/mots.js",
  "data/verbes.js",
  "data/dictees.js",
  "data/quiz.js",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-180.png",
  "icons/icon-192-maskable.png",
  "icons/icon-512-maskable.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // addAll échoue si un fichier manque : on ajoute un par un tolérant.
      Promise.all(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn("[SW] skip", url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Navigation → renvoyer index.html depuis le cache (SPA, hors-ligne)
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("index.html").then((r) => r || fetch(req))
    );
    return;
  }

  // Cache d'abord, réseau en secours (et on met en cache au passage)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
