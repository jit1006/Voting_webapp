"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Vote } from "lucide-react";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b-[1px] border-white/20 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-lg text-white group-hover:scale-110 transition-transform">
                        <Vote size={24} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-[hsl(var(--foreground))]">
                        VoteEase
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[hsl(var(--foreground))] opacity-80">
                    <Link href="#features" className="hover:text-[hsl(var(--primary))] transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-[hsl(var(--primary))] transition-colors">How it works</Link>
                    <Link href="#about" className="hover:text-[hsl(var(--primary))] transition-colors">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
