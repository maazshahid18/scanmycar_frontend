"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

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

    const searchParams = useSearchParams();

    // TODO: Replace with actual logged-in user ID
    const OWNER_ID = 1;

    const fetchAlerts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/alerts/owner/${OWNER_ID}`
            );
            setAlerts(response.data);

            // Check for replyTo param after fetching
            const replyToId = searchParams.get("replyTo");
            if (replyToId) {
                const id = Number(replyToId);
                if (!isNaN(id)) {
                    setReplyingTo(id);
                    // Optional: Scroll to the alert
                    setTimeout(() => {
                        const element = document.getElementById(`alert-${id}`);
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                    }, 500);
                }
            }
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
                Loading messages...
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto mt-8 pb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 px-4">
                Messages
            </h2>
            <div className="space-y-8 px-4">
                <AnimatePresence>
                    {alerts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"
                        >
                            <p className="text-gray-500">No messages yet.</p>
                        </motion.div>
                    ) : (
                        alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                id={`alert-${alert.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col space-y-3"
                            >
                                {/* Date Separator */}
                                <div className="flex justify-center">
                                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                        {new Date(alert.createdAt).toLocaleDateString()} • {alert.vehicle.vehicleNumber}
                                    </span>
                                </div>

                                {/* Incoming Message (Left) */}
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 max-w-[85%]">
                                        <p className="text-gray-800 dark:text-gray-200 text-sm">
                                            {alert.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Outgoing Reply (Right) */}
                                {alert.reply ? (
                                    <div className="flex justify-end">
                                        <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                                            <p className="text-sm">{alert.reply}</p>
                                        </div>
                                    </div>
                                ) : (
                                    /* Reply Input Area */
                                    <div className="flex justify-end w-full">
                                        {replyingTo === alert.id ? (
                                            <div className="w-full max-w-[90%] bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Type your reply..."
                                                    className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                                    rows={2}
                                                    autoFocus
                                                />
                                                <div className="flex gap-2 justify-end mt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setReplyingTo(null)}
                                                        className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReply(alert.id)}
                                                        disabled={submitting}
                                                        className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                    >
                                                        {submitting ? "Sending..." : "Send"}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setReplyingTo(alert.id);
                                                    setReplyText("");
                                                }}
                                                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <svg
                                                    className="w-3 h-3 mr-1.5"
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
