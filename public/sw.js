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

  const title = data.title || '🚗 ScanMyCar Alert';
  const body = data.body || 'You have a new vehicle alert';
  const url = data.url || '/dashboard';
  const alertId = data.alertId; // ✅ Include alertId for replies

  console.log('[Service Worker] Showing notification:', { title, body, url });

  const options = {
    body,
    data: { url, alertId },
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200],
    requireInteraction: true, // ✅ Keeps it on-screen until interacted with
    priority: 'high',         // ✅ Promotes banner visibility
    renotify: true,
    tag: 'scanmycar-alert',
    timestamp: Date.now(),    // ✅ Helps Chrome treat it as active
    actions: [
      { action: "view", title: "👀 View" },
      { action: "reply", title: "💬 Reply" },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => console.log('[Service Worker] Notification shown successfully'))
      .catch((err) => console.error('[Service Worker] Failed to show notification:', err))
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const { url, alertId } = event.notification.data || {};

  // Construct URL with replyTo parameter if action is reply
  let targetUrl = url || '/dashboard';
  if (event.action === 'reply' && alertId) {
    targetUrl = `/dashboard?replyTo=${alertId}`;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a tab open
      for (const client of clientList) {
        if (client.url && client.url.includes('/dashboard') && 'focus' in client) {
          // If tab exists, navigate it to the new URL (to trigger query param change) and focus
          return client.navigate(targetUrl).then(c => c.focus());
        }
      }
      // If no tab open, open a new one
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
