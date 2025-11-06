self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push event received:', event);
  let data = {};
  try { 
    data = event.data.json(); 
    console.log('[Service Worker] Push data:', data);
  } catch (e) {
    console.error('[Service Worker] Failed to parse push data:', e);
  }
  const title = data.title || 'ScanMyCar';
  const body = data.body || 'You have a new alert';
  const url = data.url || '/dashboard';

  console.log('[Service Worker] Showing notification:', { title, body, url });

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      data: { url },
      vibrate: [80, 40, 80],
      tag: 'scanmycar-alert',
      renotify: true,
    }).then(() => {
      console.log('[Service Worker] Notification shown successfully');
    }).catch((err) => {
      console.error('[Service Worker] Failed to show notification:', err);
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url || '/dashboard';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
