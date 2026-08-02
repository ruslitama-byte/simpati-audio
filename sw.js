const CACHE_NAME = 'simpati-audio-v1';

// Daftar file yang akan disimpan di memori perangkat
const urlsToCache = [
    'index.html',
    'style.css',
    'script.js',
    'doa.mp3',
    'indonesia_raya.mp3',
    'pancasila.mp3',
    'korpri.mp3'
];

// Proses instalasi Service Worker & menyimpan file
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Membuka cache dan menyimpan file...');
                return cache.addAll(urlsToCache);
            })
    );
});

// Proses memanggil file dari memori saat offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika file ada di memori offline, gunakan itu. Jika tidak, ambil dari internet.
                return response || fetch(event.request);
            })
    );
});
