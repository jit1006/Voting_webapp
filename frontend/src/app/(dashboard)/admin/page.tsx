"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [candidates, setCandidates] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCandidate, setNewCandidate] = useState({ name: "", party: "", age: "" });
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        if (!loading && user?.role !== 'admin') {
            router.push('/dashboard');
            return;
        }
        fetchCandidates();
    }, [user, loading, router]);

    const fetchCandidates = async () => {
        try {
            const res = await api.get('/candidate/vote/count');
            setCandidates(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this candidate?")) return;
        try {
            await api.delete(`/candidate/${id}`);
            fetchCandidates();
        } catch (err) {
            console.error(err);
            alert("Failed to delete candidate");
        }
    }

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingAction(true);
        try {
            await api.post('/candidate', {
                ...newCandidate,
                age: Number(newCandidate.age)
            });
            setIsModalOpen(false);
            setNewCandidate({ name: "", party: "", age: "" });
            fetchCandidates();
        } catch (err) {
            console.error(err);
            alert("Failed to add candidate");
        } finally {
            setLoadingAction(false);
        }
    }

    if (loading || user?.role !== 'admin') return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <p className="opacity-70">Manage elections and candidates.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2" /> Add Candidate
                </Button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10 text-sm opacity-70">
                            <th className="p-6 font-semibold">Name</th>
                            <th className="p-6 font-semibold">Party</th>
                            <th className="p-6 font-semibold text-center">Votes</th>
                            <th className="p-6 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id} className="border-b border-gray-100 dark:border-white/5 last:border-none hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-6 font-medium">{candidate.name}</td>
                                <td className="p-6 opacity-80">{candidate.party}</td>
                                <td className="p-6 text-center font-bold bg-gray-50/50 dark:bg-white/5">{candidate.count}</td>
                                <td className="p-6 text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                        onClick={() => handleDelete(candidate.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {candidates.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center opacity-50">No candidates available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Candidate Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold mb-6">Add New Candidate</h2>

                            <form onSubmit={handleAdd} className="space-y-4">
                                <Input
                                    label="Candidate Name"
                                    value={newCandidate.name}
                                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Party Name"
                                    value={newCandidate.party}
                                    onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Age"
                                    type="number"
                                    value={newCandidate.age}
                                    onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
                                    required
                                />

                                <Button className="w-full mt-4" disabled={loadingAction}>
                                    {loadingAction ? <Loader2 className="animate-spin mr-2" /> : "Add Candidate"}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
