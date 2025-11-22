"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Alert {
    id: number;
    message: string;
    vehicleId: number;
    reply?: string;
    createdAt: string;
    vehicle: {
        vehicleNumber: string;
    };
}

export default function AlertsList() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // TODO: Replace with actual logged-in user ID
    const OWNER_ID = 1;

    const fetchAlerts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/alerts/owner/${OWNER_ID}`
            );
            setAlerts(response.data);
        } catch (error) {
            console.error("Failed to fetch alerts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const handleReply = async (alertId: number) => {
        if (!replyText.trim()) return;

        setSubmitting(true);
        try {
            await axios.post("http://localhost:3000/alerts/reply", {
                alertId,
                reply: replyText,
            });
            toast.success("Reply sent!");
            setReplyText("");
            setReplyingTo(null);
            fetchAlerts(); // Refresh list
        } catch (error) {
            console.error("Failed to send reply", error);
            toast.error("Failed to send reply");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full max-w-md mx-auto mt-8 text-center text-gray-500">
                Loading alerts...
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Recent Alerts
            </h2>
            <div className="space-y-4">
                <AnimatePresence>
                    {alerts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"
                        >
                            <p className="text-gray-500">No alerts yet.</p>
                        </motion.div>
                    ) : (
                        alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {alert.vehicle.vehicleNumber}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(alert.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-800 dark:text-gray-200 font-medium">
                                    {alert.message}
                                </p>

                                {alert.reply ? (
                                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-green-500">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            You replied:
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {alert.reply}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        {replyingTo === alert.id ? (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                            >
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Type your reply..."
                                                    className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2"
                                                    rows={2}
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => setReplyingTo(null)}
                                                        className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleReply(alert.id)}
                                                        disabled={submitting}
                                                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        {submitting ? "Sending..." : "Send Reply"}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setReplyingTo(alert.id);
                                                    setReplyText("");
                                                }}
                                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                                    />
                                                </svg>
                                                Reply
                                            </button>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
