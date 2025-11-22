"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DashboardWidgets() {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    const hours = time.getHours();
    const greeting =
        hours < 12
            ? "Good Morning"
            : hours < 18
                ? "Good Afternoon"
                : "Good Evening";

    return (
        <div className="w-full max-w-md mx-auto mt-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-row items-center justify-between"
            >
                {/* Time Section */}
                <div className="flex flex-col">
                    <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                        {greeting}
                    </p>
                    <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            {time.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                        <span className="ml-2 text-gray-400 dark:text-gray-500 text-sm font-medium">
                            {time.toLocaleTimeString([], { second: "2-digit" })}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-gray-200 dark:bg-gray-700 mx-4 hidden sm:block"></div>

                {/* Date Section */}
                <div className="flex flex-col items-end sm:items-start">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {time.getDate()}
                        </span>
                        <span className="ml-1.5 text-lg text-gray-500 dark:text-gray-400 font-medium">
                            {time.toLocaleDateString([], { month: "short" })}
                        </span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        {time.toLocaleDateString([], { weekday: "long" })}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
