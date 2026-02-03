/**
 * Service Worker для PWA
 * Кэширует ресурсы для офлайн-доступа
 */

const CACHE_NAME = 'ege-trainer-v9';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/storage.js',
    './js/sm2.js',
    './js/cards.js',
    './js/algebra-data.js',
    './js/geometry-data.js',
    './js/russian-data.js',
    './js/cs-data.js',
    './js/decorations.js',
    './js/stats.js',
    './js/dashboard.js',
    './js/trainer.js',
    './js/exam.js',
    './js/ege-svg-graph.js',
    './js/ege-math-data.js',
    './js/ege-cs-data.js',
    './js/ege-rus-data-part1.js',
    './js/ege-rus-data-part2.js',
    './js/ege-rus-data-part3.js',
    './js/ege-rus-data-part4.js',
    './js/ege-exam.js',
    './js/search.js',
    './js/firebase-config.js',
    './js/auth.js',
    './js/cloud-storage.js',
    './manifest.json'
];

// Установка — кэшируем основные ресурсы
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Активация — удаляем старые кэши
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Запрос — стратегия cache-first, network-fallback
self.addEventListener('fetch', (event) => {
    // Пропускаем запросы Firebase/Firestore — они должны идти напрямую
    if (event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('identitytoolkit.googleapis.com') ||
        event.request.url.includes('securetoken.googleapis.com') ||
        event.request.url.includes('accounts.google.com')) {
        return;
    }

    // Пропускаем запросы к CDN (KaTeX, Firebase) — для них network-first
    if (event.request.url.includes('cdn.jsdelivr.net') ||
        event.request.url.includes('gstatic.com/firebasejs')) {
        event.respondWith(
            fetch(event.request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            }).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then(response => {
                // Кэшируем новые ресурсы
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        }).catch(() => {
            // Офлайн-фолбэк
            if (event.request.destination === 'document') {
                return caches.match('./index.html');
            }
        })
    );
});
