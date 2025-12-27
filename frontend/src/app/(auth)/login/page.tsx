"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        adharCardNumber: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on typing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/user/login", {
                adharCardNumber: Number(formData.adharCardNumber), // Backend expects Number
                password: formData.password,
            });

            // Save token
            localStorage.setItem("token", data.token);

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Invalid Credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-50 dark:bg-slate-900 relative overflow-hidden">
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-[hsl(var(--primary))] font-bold text-xl mb-8">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold leading-tight mb-6"
                    >
                        Welcome Back! <br />
                        Ready to <span className="text-[hsl(var(--primary))]">Vote?</span>
                    </motion.h1>
                    <p className="text-lg opacity-70">Log in to access your dashboard and make your voice heard in the latest elections.</p>
                </div>

                {/* Abstract Shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[60px] border-[hsl(var(--primary))]/10 border-dashed"
                />
                <motion.div
                    animate={{ translateY: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-20 w-48 h-48 bg-[hsl(var(--secondary))]/20 rounded-full blur-3xl"
                />
                <div className="relative z-10">
                    <p className="text-sm opacity-50">© 2024 VoteEase Platform</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white dark:bg-black">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold">Sign In</h2>
                        <p className="text-gray-500 mt-2">Enter your Aadhaar number and password.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        >
                            <Input
                                label="Aadhaar Number"
                                name="adharCardNumber"
                                type="number"
                                value={formData.adharCardNumber}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2"
                                >
                                    <span>⚠️</span> {error}
                                </motion.div>
                            )}
                        </motion.div>

                        <Button className="w-full" size="lg" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-[hsl(var(--primary))] font-semibold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
