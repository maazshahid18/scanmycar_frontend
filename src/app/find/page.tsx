"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ensurePushSubscription } from "@/lib/push";
import toast from "react-hot-toast";

export default function FindMyQR() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setVehicle(null);

    try {
      const response = await api.get(`/vehicles/lookup`, {
        params: {
          vehicleNumber: vehicleNumber.trim(),
          mobileNumber: mobileNumber.trim(),
        },
      });

      if (response.data) {
        setVehicle(response.data);

        // ✅ Store user info in localStorage
        localStorage.setItem('scanmycar_user', JSON.stringify({
          ownerId: response.data.ownerId,
          vehicleId: response.data._id,
          vehicleNumber: response.data.vehicleNumber,
          mobileNumber: response.data.mobileNumber,
        }));

        toast.success("Vehicle found!");
      } else {
        setNotFound(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setNotFound(true);
        toast.error("Vehicle not found");
      } else {
        toast.error("Lookup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const enableNotifications = async () => {
    if (!vehicle) return toast.error("Lookup first!");

    try {
      const sub = await ensurePushSubscription(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      );

      await fetch(`${process.env.NEXT_PUBLIC_API}/notifications/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          mobileNumber: vehicle.mobileNumber,
          subscription: sub,
        }),
      });

      toast.success("Notifications enabled!");
    } catch (err) {
      toast.error("Failed to enable notifications");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Find My QR Code
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
        Enter your vehicle details to view or download your QR.
      </p>

      {!vehicle && (
        <form onSubmit={handleLookup} className="space-y-4 mb-6">
          <div>
            <label className="block mb-1 text-sm">Vehicle Number</label>
            <input
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              required
              className="w-full px-4 py-3 rounded-lg border"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Mobile Number</label>
            <input
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Searching..." : "Find My QR Code"}
          </button>
        </form>
      )}

      {notFound && (
        <div className="p-4 bg-yellow-100 rounded-lg">
          <p>No vehicle found.</p>
          <a href="/register" className="block mt-3 text-blue-600 underline">
            Register Vehicle
          </a>
        </div>
      )}

      {vehicle && (
        <div className="space-y-4">
          <img
            src={vehicle.qrImage}
            alt="QR Code"
            className="w-48 h-48 mx-auto"
          />

          <a
            href={vehicle.qrImage}
            download={`${vehicle.vehicleNumber}.png`}
            className="block bg-blue-600 text-white py-3 rounded-lg text-center"
          >
            Download QR
          </a>

          <button
            onClick={enableNotifications}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Enable Instant Alerts
          </button>
        </div>
      )}
    </div>
  );
}