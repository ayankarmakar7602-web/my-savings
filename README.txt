MY SAVINGS — NOTIFICATION READY

1. Replace the root files in GitHub with:
   index.html
   manifest.json
   sw.js
   icon.svg

2. Open the HTTPS site.
3. Settings → Notifications → Enable Notifications.
4. Tap Test Notification.

The service worker also supports real Web Push messages.

IMPORTANT:
For an automatic notification every day at 8 PM while the app is closed,
a push backend/service must send the Web Push message. Static GitHub Pages
cannot itself run a reliable daily server job. The notification-ready frontend
is included here; the backend still needs VAPID keys + a scheduled sender.
