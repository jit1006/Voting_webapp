"use client";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white dark:from-slate-900 pointer-events-none" />
            <DashboardNavbar />
            <main className="max-w-7xl mx-auto p-6 md:p-8">
                {children}
            </main>
        </div>
    );
}
