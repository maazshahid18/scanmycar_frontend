"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EmergencyContactWidget() {
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(false);
    const OWNER_ID = 1; // Hardcoded for now

    const handleSave = async () => {
        if (!contact.trim()) return;

        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/users/${OWNER_ID}/emergency-contact`, {
                contact,
            });
            toast.success("Emergency contact updated!");
            setContact("");
        } catch (error) {
            console.error("Failed to update contact", error);
            toast.error("Failed to update contact");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M12 12h.01M12 6h.01M12 12a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Emergency Contact
                </h3>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Add a secondary number to be notified in case of emergency.
            </p>

            <div className="flex gap-2">
                <input
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 p-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none"
                />
                <button
                    onClick={handleSave}
                    disabled={loading || !contact}
                    className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </motion.div>
    );
}
