"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ensurePushSubscription } from "@/lib/push";
import toast from "react-hot-toast";

interface Vehicle {
  _id: string;
  vehicleNumber: string;
  qrCodeId: string;
  qrImage: string;
  mobileNumber: string;
}

export default function Dashboard() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setVehicle(null);

    try {
      // Search for vehicle by vehicle number and mobile number
      const response = await api.get(`/vehicles/lookup`, {
        params: {
          vehicleNumber: vehicleNumber.trim(),
          mobileNumber: mobileNumber.trim(),
        },
      });

      if (response.data) {
        setVehicle(response.data);
        toast.success("Vehicle found!");
      } else {
        setNotFound(true);
      }
    } catch (error: any) {
      console.error("Lookup error:", error);
      if (error.response?.status === 404) {
        setNotFound(true);
        toast.error("Vehicle not found. Please check your details.");
      } else {
        toast.error("Failed to lookup vehicle");
      }
    } finally {
      setLoading(false);
    }
  };

  const testNotification = async () => {
    if (Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: "This is a test notification",
        tag: "test",
      });
      toast.success("Test notification sent!");
    } else {
      toast.error("Please enable notifications first");
    }
  };

  const enableNotifications = async () => {
    if (!vehicle) {
      toast.error("Please lookup your vehicle first");
      return;
    }

    try {
      console.log("[Dashboard] Starting notification subscription...");
      console.log("[Dashboard] Current permission:", Notification.permission);

      const sub = await ensurePushSubscription(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      );

      console.log("[Dashboard] Got subscription:", sub);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/notifications/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicleId: vehicle._id,
            mobileNumber: vehicle.mobileNumber,
            subscription: sub,
          }),
        }
      );

      console.log("[Dashboard] Subscribe response:", response.status);

      if (!response.ok) {
        throw new Error(`Subscription failed: ${response.status}`);
      }

      toast.success("Push notifications enabled!");
      console.log("[Dashboard] Notification permission granted and subscribed!");
    } catch (e: any) {
      console.error("[Dashboard] Notification error:", e);
      toast.error(e?.message || "Failed to enable notifications");
    }
  };

  const handleReset = () => {
    setVehicle(null);
    setNotFound(false);
    setVehicleNumber("");
    setMobileNumber("");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        My Vehicle QR Code
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
        Enter your vehicle details to view or manage your QR code
      </p>

      {/* Lookup Form */}
      {!vehicle && (
        <form onSubmit={handleLookup} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              placeholder="e.g., ABC1234"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="e.g., +1234567890"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Find My QR Code"}
          </button>
        </form>
      )}

      {/* Not Found Message */}
      {notFound && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
            No vehicle found with these details.
          </p>
          <a
            href="/register"
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Register New Vehicle
          </a>
        </div>
      )}

      {/* Vehicle Found */}
      {vehicle && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle Number</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vehicle.vehicleNumber}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
              >
                Change
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <img
                src={vehicle.qrImage}
                className="w-48 h-48 mx-auto rounded-lg"
                alt="Vehicle QR Code"
              />
            </div>

            <a
              href={vehicle.qrImage}
              download={`${vehicle.vehicleNumber}.png`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg py-3 font-medium shadow-sm hover:shadow-md transition-all active:scale-95 mb-3"
            >
              Download QR Code
            </a>
          </div>

          {/* Notifications Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
            <button
              onClick={enableNotifications}
              className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 rounded-lg font-medium shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              Enable Instant Alerts
            </button>
            <button
              onClick={testNotification}
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              Test Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
