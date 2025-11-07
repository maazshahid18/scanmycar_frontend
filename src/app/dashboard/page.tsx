"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Button from "@/components/Button";
import { ensurePushSubscription } from "@/lib/push";
import toast from "react-hot-toast";

interface Vehicle {
  _id: string;
  vehicleNumber: string;
  qrCodeId: string;
  qrImage: string;
}

export default function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace ownerId with actual auth user ID
    api.get("/vehicles/owner/1").then((res) => {
      setVehicles(res.data);
      setLoading(false);
    });
  }, []);

  const testNotification = async () => {
    if (Notification.permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification',
        tag: 'test',
      });
      toast.success('Test notification sent!');
    } else {
      toast.error('Please enable notifications first');
    }
  };

  const enableNotifications = async () => {
    try {
      console.log('[Dashboard] Starting notification subscription...');
      console.log('[Dashboard] Current permission:', Notification.permission);
      
      const sub = await ensurePushSubscription(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      );

      console.log('[Dashboard] Got subscription:', sub);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notifications/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // TODO: Replace with actual logged-in user ID
          subscription: sub,
        }),
      });

      console.log('[Dashboard] Subscribe response:', response.status);

      if (!response.ok) {
        throw new Error(`Subscription failed: ${response.status}`);
      }

      toast.success("Push notifications enabled!");
      console.log('[Dashboard] Notification permission granted and subscribed!');
    } catch (e: any) {
      console.error('[Dashboard] Notification error:', e);
      toast.error(e?.message || "Failed to enable notifications");
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-600 dark:text-gray-400">Loading...</p>;

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Vehicles</h1>
      
      <div className="space-y-3 mb-6">
        <button
          onClick={enableNotifications}
          className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 rounded-lg font-medium shadow-sm hover:shadow-md active:scale-95 transition-all"
        >
          Enable Instant Alerts
        </button>
        <button
          onClick={testNotification}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md active:scale-95 transition-all"
        >
          Test Notification
        </button>
      </div>

      {vehicles.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No vehicles registered yet.</p>
      )}

      <div className="space-y-4">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors"
          >
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{v.vehicleNumber}</p>

            <img
              src={v.qrImage}
              className="w-32 h-32 mt-4 mx-auto rounded-lg"
              alt="QR"
            />

            <a
              href={v.qrImage}
              download={`${v.vehicleNumber}.png`}
              className="block mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg py-2.5 font-medium shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Download QR
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}