"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import api from "@/lib/api";
import toast from "react-hot-toast";
import QRCard from "@/components/QRCard";
import { ensurePushSubscription } from "@/lib/push";

interface VehicleData {
  _id: string;
  vehicleNumber: string;
  qrImage: string;
  ownerId: number;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;
  const mobileRegex = /^[6-9][0-9]{9}$/;

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("Enter your name");
      return;
    }

    if (!mobileRegex.test(mobile)) {
      toast.error("Invalid mobile number");
      return;
    }

    if (!vehicleRegex.test(vehicleNumber)) {
      toast.error("Invalid vehicle number");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/vehicles/register", {
        ownerName: name,
        ownerMobile: mobile,
        vehicleNumber,
      });

      setVehicleData(res.data);
      toast.success("QR Generated!");
      
      // Auto-prompt for notifications after registration
      setTimeout(() => {
        if (Notification.permission === "default") {
          toast("Enable notifications to get instant alerts!", {
            icon: "🔔",
            duration: 5000,
          });
        }
      }, 1000);
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const enableNotifications = async () => {
    if (!vehicleData) return;

    try {
      const sub = await ensurePushSubscription(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/notifications/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicleId: vehicleData._id,
            mobileNumber: mobile,
            subscription: sub,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Subscription failed: ${response.status}`);
      }

      setNotificationsEnabled(true);
      toast.success("Notifications enabled! You'll get instant alerts.");
    } catch (e: any) {
      console.error("Notification error:", e);
      toast.error(e?.message || "Failed to enable notifications");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        Register Vehicle
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm">
        Create your QR code and enable instant notifications
      </p>

      {!vehicleData ? (
        <>
          <div className="space-y-4">
            <Input
              value={name}
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              value={mobile}
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />

            <Input
              value={vehicleNumber}
              placeholder="Vehicle Number (DL8CAS6880)"
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            />
          </div>

          <Button onClick={handleRegister} className="w-full mt-6" disabled={loading}>
            {loading ? "Generating..." : "Generate QR Code"}
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-200 font-medium text-center">
              ✓ Vehicle registered successfully!
            </p>
          </div>

          {/* QR Code Card */}
          <div className="mt-6">
            <QRCard vehicleNumber={vehicleNumber} qrImage={vehicleData.qrImage} />
          </div>

          {/* Notification Section */}
          {!notificationsEnabled ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Enable Instant Alerts
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Get notified immediately when someone scans your QR code
                  </p>
                </div>
              </div>
              <button
                onClick={enableNotifications}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Enable Notifications Now
              </button>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200 text-center font-medium">
                ✓ Notifications enabled! You're all set.
              </p>
            </div>
          )}

          {/* Register Another */}
          <button
            onClick={() => {
              setVehicleData(null);
              setName("");
              setMobile("");
              setVehicleNumber("");
              setNotificationsEnabled(false);
            }}
            className="w-full text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 py-2 text-sm underline"
          >
            Register Another Vehicle
          </button>
        </div>
      )}
    </div>
  );
}
