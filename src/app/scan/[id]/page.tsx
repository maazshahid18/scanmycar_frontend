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
        <div className="bg-gray-300 dark:bg-gray-700 h-6 w-40 mx-auto rounded mb-6" />
        <div className="bg-gray-300 dark:bg-gray-700 h-20 w-full rounded-lg mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-24 w-full rounded-lg mb-4" />
        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-full rounded-lg" />
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
          className="w-20 h-20 bg-green-500 dark:bg-green-600 text-white rounded-full flex items-center justify-center text-4xl shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ✅
        </motion.div>

        <p className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">Alert Sent!</p>
        <p className="text-gray-600 dark:text-gray-300 mt-3 text-base w-64 leading-relaxed">
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Notify Owner</h1>

      {/* Vehicle Card */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-6 text-center transition-colors"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Vehicle</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{vehicle.vehicleNumber}</p>
      </motion.div>

      {/* Preset Message Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {presets.map((text, idx) => (
          <button
            key={idx}
            onClick={() => applyPreset(text)}
            className="w-full px-3 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs text-left text-gray-900 dark:text-white active:scale-95 transition-all border border-gray-200 dark:border-gray-700"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 rounded-lg mb-6 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none"
        rows={4}
        placeholder="Enter message or tap a preset"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Button */}
      <Button onClick={sendAlert} className="w-full">
        {sending ? "Sending..." : "Send Notification"}
      </Button>
    </motion.div>
  );
}