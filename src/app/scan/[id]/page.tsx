"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function ScanPage() {
  const params = useParams();
  const id = params.id as string;

  const [vehicle, setVehicle] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [successScreen, setSuccessScreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch vehicle data
  useEffect(() => {
    api.get(`/vehicles/${id}`).then((res) => {
      setVehicle(res.data);
      setLoading(false);
    });
  }, [id]);

  // ✅ Preset Messages
  const presets = [
    "Your car is blocking my exit.",
    "Your headlights are left on.",
    "Your car is parked incorrectly.",
    "Please move your vehicle.",
    "Urgent: Need your car shifted.",
    "Your vehicle is obstructing the pathway.",
  ];

  // ✅ Apply preset message
  const applyPreset = (text: string) => {
    setMessage(text);
    if (navigator.vibrate) navigator.vibrate(30);
  };

  // ✅ Send alert
const sendAlert = async () => {
  if (!message.trim()) {
    toast.error("Please enter a message");
    return;
  }

  if (!vehicle?.id) {
    toast.error("Vehicle ID missing");
    return;
  }

  try {
    setSending(true);

    await fetch(`${process.env.NEXT_PUBLIC_API}/alerts/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId: Number(vehicle.id),
        message: message,
      }),
    });

    setSending(false);
    setSuccessScreen(true);
    toast.success("Alert Sent Successfully!");

    setTimeout(() => setSuccessScreen(false), 2500);
  } catch (error) {
    setSending(false);
    toast.error("Failed to send alert");
  }
};

  // ✅ Loading Skeleton
  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto px-4 py-8 animate-pulse">
        <div className="bg-gray-300 h-6 w-40 mx-auto rounded mb-6" />
        <div className="bg-gray-300 h-20 w-full rounded mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-10 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
        </div>
        <div className="bg-gray-300 h-24 w-full rounded mb-4" />
        <div className="bg-gray-300 h-10 w-full rounded" />
      </div>
    );
  }

  // ✅ Success Screen
  if (successScreen) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[70vh] text-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ✅
        </motion.div>

        <p className="mt-4 text-xl font-semibold">Alert Sent!</p>
        <p className="text-gray-600 mt-2 text-sm w-60">
          The vehicle owner has been notified successfully.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-sm mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Notify Owner</h1>

      {/* Vehicle Card */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow mb-4 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <p className="text-gray-600 text-sm">Vehicle</p>
        <p className="text-xl font-bold">{vehicle.vehicleNumber}</p>
      </motion.div>

      {/* Preset Message Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {presets.map((text, idx) => (
          <button
            key={idx}
            onClick={() => applyPreset(text)}
            className="w-full px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-xs text-left active:scale-95 transition"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        className="w-full border p-3 rounded-lg mb-4 text-sm"
        rows={4}
        placeholder="Enter message or tap a preset"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Button */}
      <Button onClick={sendAlert} className="w-full active:scale-95 transition">
        {sending ? "Sending..." : "Send Notification"}
      </Button>
    </motion.div>
  );
}