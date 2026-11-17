/* Uffish Web Push receiver. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("push", (event) => {
  let data = { title: "Uffish", body: "(no payload)" };
  try { data = event.data.json(); } catch { /* keep fallback */ }
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, data }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  if (url && url.startsWith("obsidian://")) event.waitUntil(self.clients.openWindow(url));
});
