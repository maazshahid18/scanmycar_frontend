// Converts a Base64 VAPID public key into a UInt8Array
export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Main function to request permission + subscribe to push notifications
export async function ensurePushSubscription(publicKey: string) {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker not supported");
  }

  if (!("PushManager" in window)) {
    throw new Error("Push API not supported");
  }

  // Register service worker
  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  // Ask user for notification permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notifications permission denied");
  }

  // Subscribe to push
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  };

  const pushSubscription = await registration.pushManager.subscribe(
    subscribeOptions
  );

  return pushSubscription.toJSON();
}