"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VotePage() {
    const { user, loading } = useAuth();
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loadingCandidates, setLoadingCandidates] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [voting, setVoting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const res = await api.get('/candidate/vote/count');
            setCandidates(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCandidates(false);
        }
    }

    const handleVote = async () => {
        if (!selectedCandidate) return;
        setVoting(true);
        setError("");

        try {
            await api.post(`/candidate/vote/${selectedCandidate.id}`);
            setSuccess(true);
            setTimeout(() => {
                window.location.href = "/dashboard"; // Reload/Redirect to refresh state
            }, 3000);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || err.response?.data?.error || "Failed to vote");
            setSelectedCandidate(null);
        } finally {
            setVoting(false);
        }
    }

    if (loading || loadingCandidates) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4"
                >
                    <CheckCircle2 size={64} />
                </motion.div>
                <h2 className="text-4xl font-bold text-green-700">Vote Cast Successfully!</h2>
                <p className="text-xl text-gray-600">You have made your voice heard.</p>
                <p className="text-gray-400">Redirecting to dashboard...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Candidates</h1>
                    <p className="opacity-70">Select a candidate to cast your vote.</p>
                </div>
                {user?.isVoted && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <CheckCircle2 size={18} /> You have already voted
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate, idx) => (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => !user?.isVoted && setSelectedCandidate(candidate)}
                        className={`
                    p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group
                    ${user?.isVoted ? "opacity-50 grayscale cursor-not-allowed border-gray-200" : "hover:shadow-xl hover:border-[hsl(var(--primary))]"}
                    ${selectedCandidate?.id === candidate.id ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 ring-2 ring-[hsl(var(--primary))]" : "bg-white dark:bg-white/5 border-transparent"}
                `}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-2xl font-bold shadow-inner">
                                {candidate.name.charAt(0)}
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-500">{candidate.party}</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-1">{candidate.name}</h3>
                        <p className="text-sm opacity-60">Candidate for Election</p>

                        {!user?.isVoted && (
                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm font-medium text-[hsl(var(--primary))]">Click to Select</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {selectedCandidate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setSelectedCandidate(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Confirm Your Vote</h3>
                                <p className="text-gray-500">Are you sure you want to vote for:</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-xl text-center">
                                <h4 className="text-xl font-bold text-[hsl(var(--primary))]">{selectedCandidate.name}</h4>
                                <p className="font-medium text-gray-500">{selectedCandidate.party}</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button variant="ghost" className="flex-1" onClick={() => setSelectedCandidate(null)}>Cancel</Button>
                                <Button className="flex-1" onClick={handleVote} disabled={voting}>
                                    {voting ? <Loader2 className="animate-spin mr-2" /> : "Confirm & Vote"}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
