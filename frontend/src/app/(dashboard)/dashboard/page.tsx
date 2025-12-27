"use client";

import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2, User, MapPin, Hash, ShieldCheck, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const [candidates, setCandidates] = useState<any[]>([]);

    useEffect(() => {
        // Fetch live stats
        api.get('/candidate/vote/count').then(res => {
            setCandidates(res.data);
        }).catch(err => console.error(err));
    }, []);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader2 className="w-10 h-10 animate-spin text-[hsl(var(--primary))]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white border-none"
            >
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Hello, {user.name}! 👋</h1>
                    <p className="opacity-90 text-lg max-w-2xl">
                        Welcome to your dashboard. {user.isVoted ? "You have successfully cast your vote! Thank you for being a responsible citizen." : "You haven't voted yet. Make your voice heard today!"}
                    </p>
                    {!user.isVoted && (
                        <Link href="/vote">
                            <Button className="mt-8 bg-white text-[hsl(var(--primary))] hover:bg-white/90 border-none shadow-xl">
                                Vote Now <Ticket className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* User Profile */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <User className="text-[hsl(var(--primary))]" /> Profile Details
                        </h2>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                            {user.role}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <ProfileItem icon={<Hash />} label="Aadhaar ID" value={user.adharCardNumber} />
                        <ProfileItem icon={<MapPin />} label="Address" value={user.address} />
                        <ProfileItem icon={<ShieldCheck />} label="Status" value={user.isVoted ? "Voted ✅" : "Not Voted ❌"} />
                        {user.age && <ProfileItem icon={<User />} label="Age" value={user.age} />}
                        {user.email && <ProfileItem icon={<User />} label="Email" value={user.email} />}
                    </div>
                </motion.div>

                {/* Live Stats Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Loader2 className="animate-spin-slow text-[hsl(var(--secondary))]" /> Live Trends
                        </h2>
                        <Link href="/vote" className="text-sm text-[hsl(var(--primary))] hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {candidates.slice(0, 3).map((candidate, idx) => (
                            <div key={candidate.id} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-400 w-6">#{idx + 1}</span>
                                    <div>
                                        <h3 className="font-bold">{candidate.name}</h3>
                                        <p className="text-xs text-gray-500">{candidate.party}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-lg">{candidate.count}</span>
                                    <span className="text-xs text-gray-400 block">votes</span>
                                </div>
                            </div>
                        ))}
                        {candidates.length === 0 && (
                            <p className="text-center text-gray-400 py-8">No candidates found.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ProfileItem({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
            <div className="text-gray-400">
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
                <p className="font-medium text-lg">{value}</p>
            </div>
        </div>
    )
}
