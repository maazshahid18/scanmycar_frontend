"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScanHistoryWidget from "./ScanHistoryWidget";
import EmergencyContactWidget from "./EmergencyContactWidget";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function DashboardWidgets() {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const { user, loading } = useCurrentUser();

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    // Show prompt if no user is logged in
    if (!loading && !user) {
        return (
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 mx-auto max-w-md text-center"
                >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Welcome to ScanMyCar!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Please find your vehicle first to access your dashboard.
                    </p>
                    <Link
                        href="/find"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Find My QR Code
                    </Link>
                </motion.div>
            </div>
        );
    }

    const hours = time.getHours();
    const greeting =
        hours < 12
            ? "Good Morning"
            : hours < 18
                ? "Good Afternoon"
                : "Good Evening";

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }).format(date);
    };

    return (
        <div className="space-y-6">
            {/* Time & Date Widget */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mx-auto max-w-md"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="space-y-1">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                            {greeting}
                        </span>
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {formatTime(time)}
                        </h2>
                    </div>

                    <div className="w-12 h-1 bg-gray-100 dark:bg-gray-700 rounded-full" />

                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(time)}
                    </p>
                </div>
            </motion.div>

            {/* New Widgets Grid */}
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
                <ScanHistoryWidget />
                <EmergencyContactWidget />
            </div>
        </div>
    );
}
