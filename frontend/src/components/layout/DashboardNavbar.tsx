"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Vote, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function DashboardNavbar() {
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/20 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="p-2 bg-[hsl(var(--primary))] rounded-lg text-white">
                        <Vote size={24} />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">VoteEase Dashboard</span>
                </Link>

                <div className="flex items-center gap-3">
                    {user?.role === 'admin' && (
                        <Link href="/admin">
                            <Button size="sm" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200 shadow-sm font-bold">
                                Admin Panel
                            </Button>
                        </Link>
                    )}
                    <Link href="/vote">
                        <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg transition-all">
                            Vote Now
                        </Button>
                    </Link>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium transition-colors"
                    >
                        <LogOut size={18} className="mr-2" /> Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}
