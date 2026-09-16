/* ════════════════════════════════════════════════════════════════════
   Service Worker for Reportify HRM Portal
   ════════════════════════════════════════════════════════════════════
   This file must be hosted at the SAME directory as index.html.

   It handles:
   1. Push notification events (when Firebase Cloud Messaging sends a
      push to this device, this SW shows the notification even if the
      app/tab is closed — like WhatsApp).
   2. Notification click events (opens the app when the user taps the
      notification).
   3. Background sync (optional — can be extended later).

   HOW IT WORKS:
   - Firebase Cloud Messaging (FCM) sends a push to this service worker.
   - The `push` event fires, even if the browser/app is closed.
   - We call `self.registration.showNotification()` to display the
     notification on the device's lock screen / notification center.
   - When the user taps the notification, the `notificationclick` event
     fires and we open (or focus) the app.

   SETUP:
   1. Upload this file to the same directory as index.html (e.g.
      https://your-domain.com/sw.js).
   2. Generate VAPID keys in Firebase Console → Project Settings →
      Cloud Messaging → Web Configuration → Generate VAPID key pair.
   3. Replace the VAPID_PUBLIC_KEY placeholder in the V63 patch inside
      index.html.
   4. Deploy the Cloud Function (see functions/index.js) to send push
      messages when notifications are written to Firebase.
   ════════════════════════════════════════════════════════════════════ */

// ── Push event — fires when FCM sends a push to this device ──────────
self.addEventListener('push', function (event) {
  console.log('[SW] Push event received:', event);

  var payload = {};
  try {
    if (event.data) {
      // FCM sends the payload as JSON in event.data
      payload = event.data.json();
    }
  } catch (e) {
    // Fallback: try as text
    try { payload = { notification: { title: 'Notification', body: event.data.text() } }; } catch (e2) {}
  }

  // Extract title + body from the FCM payload
  // FCM push payload structure:
  //   { notification: { title: "...", body: "..." } }
  // OR:
  //   { data: { title: "...", body: "...", ... } }
  var title = 'Notification';
  var body = '';
  var icon = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2">' +
    '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
    '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>' +
    '</svg>'
  );
  var tag = 'reportify-' + Date.now();
  var data = {};

  if (payload.notification) {
    title = payload.notification.title || title;
    body = payload.notification.body || body;
    if (payload.notification.icon) icon = payload.notification.icon;
    if (payload.notification.tag) tag = payload.notification.tag;
  }
  if (payload.data) {
    if (payload.data.title) title = payload.data.title;
    if (payload.data.body) body = payload.data.body;
    data = payload.data;
    if (payload.data.type) tag = 'reportify-' + payload.data.type + '-' + Date.now();
  }

  var options = {
    body: body,
    icon: icon,
    badge: icon,
    tag: tag,
    data: data,
    requireInteraction: false,
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ── Notification click — opens/focuses the app ──────────────────────
self.addEventListener('notificationclick', function (event) {
  console.log('[SW] Notification click:', event.notification);
  event.notification.close();

  var targetUrl = './index.html';
  if (event.notification.data && event.notification.data.url) {
    targetUrl = event.notification.data.url;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Focus an existing tab if one is open
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.indexOf(targetUrl) > -1 || client.url.indexOf(self.location.origin) > -1) {
          if ('focus' in client) {
            return client.focus();
          }
        }
      }
      // Otherwise open a new tab
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// ── Install + Activate — cache nothing for now (keep it simple) ──────
self.addEventListener('install', function (event) {
  console.log('[SW] Install');
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  console.log('[SW] Activate');
  event.waitUntil(clients.claim());
});

// ── Message from the page (e.g. "show a test notification") ──────────
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SHOW_TEST_NOTIFICATION') {
    var title = event.data.title || 'Test';
    var body = event.data.body || '';
    self.registration.showNotification(title, {
      body: body,
      icon: 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c8102e" stroke-width="2">' +
        '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
        '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>' +
        '</svg>'
      )
    });
  }
});
