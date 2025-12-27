import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for 'Cute + Modern'
import "./globals.css";
import clsx from "clsx";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VoteEase - Modern Voting Platform",
  description: "Secure, transparent, and beautiful voting platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(outfit.variable, "font-sans min-h-screen flex flex-col")}
      >
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black pointer-events-none opacity-80" />
        {children}
      </body>
    </html>
  );
}
