"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        mobile: "",
        email: "",
        address: "",
        adharCardNumber: "",
        password: "",
        role: "voter",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Validate Age
            if (Number(formData.age) < 18) {
                throw new Error("You must be at least 18 years old to vote.");
            }

            const response = await api.post("/user/signup", {
                ...formData,
                age: Number(formData.age),
                adharCardNumber: Number(formData.adharCardNumber),
                role: formData.role
            });


            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                router.push("/dashboard");
            } else {
                router.push("/login");
            }

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-teal-50 dark:bg-slate-900 relative overflow-hidden order-2">
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-[hsl(var(--secondary))] font-bold text-xl mb-8">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold leading-tight mb-6"
                    >
                        Join the <br />
                        <span className="text-[hsl(var(--secondary))]">Revolution</span>
                    </motion.h1>
                    <p className="text-lg opacity-70">Create your voter profile in seconds and exercise your democratic right.</p>
                </div>

                {/* Abstract Shapes */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[hsl(var(--secondary))]/20 to-[hsl(var(--primary))]/20 rounded-full blur-[100px]"
                />

            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white dark:bg-black order-1">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-lg space-y-6"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold">Create Account</h2>
                        <p className="text-gray-500 mt-2">Please fill in your details accurately.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                            <Input label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Role</label>
                            <div className="flex gap-4">
                                <label className={`flex-1 cursor-pointer border-2 rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.role === 'voter' ? 'border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/10 text-[hsl(var(--secondary))] font-bold' : 'border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="voter"
                                        checked={formData.role === 'voter'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Voter
                                </label>
                                <label className={`flex-1 cursor-pointer border-2 rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.role === 'admin' ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-bold' : 'border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={formData.role === 'admin'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Admin
                                </label>
                            </div>
                        </div>

                        <Input label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
                        <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                        <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />

                        <div className="h-px bg-gray-100 my-4" />

                        <Input label="Aadhaar Number" name="adharCardNumber" type="number" value={formData.adharCardNumber} onChange={handleChange} required />
                        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

                        {error && (
                            <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>
                        )}

                        <Button className="w-full bg-[hsl(var(--secondary))]" size="lg" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign Up"}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[hsl(var(--secondary))] font-semibold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
