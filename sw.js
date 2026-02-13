const CACHE_NAME = 'dirasa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/lessons.html',
  '/exercises.html',
  '/summaries.html',
  '/manifest.json'
];

// تثبيت التطبيق وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب البيانات (يقرأ من التخزين المؤقت لتسريع الموقع)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، يعرضه فوراً
        if (response) {
          return response;
        }
        // إذا لم يجده، يجلبه من الإنترنت
        return fetch(event.request);
      })
  );
});