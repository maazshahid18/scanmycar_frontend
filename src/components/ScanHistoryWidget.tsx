"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface DailyStat {
    day: string;
    count: number;
}

export default function ScanHistoryWidget() {
    const [stats, setStats] = useState<DailyStat[]>([]);
    const [loading, setLoading] = useState(true);
    const OWNER_ID = 1; // Hardcoded for now

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/vehicles/stats/${OWNER_ID}`
                );
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const maxCount = Math.max(...stats.map((s) => s.count), 1);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Scan History
            </h3>

            {loading ? (
                <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
                    Loading...
                </div>
            ) : (
                <div className="flex items-end justify-between h-32 gap-2">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                            <div className="w-full relative group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(stat.count / maxCount) * 100}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`w-full rounded-t-md ${stat.count > 0 ? "bg-blue-500" : "bg-gray-100 dark:bg-gray-700"
                                        }`}
                                    style={{ minHeight: stat.count > 0 ? "4px" : "4px" }}
                                />
                                {stat.count > 0 && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {stat.count}
                                    </div>
                                )}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {stat.day}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
