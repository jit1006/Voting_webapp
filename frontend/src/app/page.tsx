"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Globe2, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Home() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-block">
            <span className="px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-semibold text-sm border border-[hsl(var(--primary))]/20">
              🚀 The Future of Democracy
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold leading-tight text-[hsl(var(--foreground))]"
          >
            Your Voice, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]">
              Your Power.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-[hsl(var(--foreground))]/70 max-w-lg leading-relaxed"
          >
            A secure, transparent, and effortlessly simple voting platform tailored for modern communities. Join the revolution today.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_10px_40px_-10px_hsl(var(--primary))/50]">
                Cast Your Vote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-4 text-sm font-medium text-[hsl(var(--foreground))]/60">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`} />
              ))}
            </div>
            <p>Trusted by 10,000+ voters</p>
          </motion.div>
        </motion.div>

        {/* Hero Illustration Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 animate-float">
            {/* We will replace this with a Lottie or Image */}
            <div className="bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-[3rem] p-8 shadow-2xl skew-y-3 rotate-2 opacity-90">
              <div className="bg-white/90 dark:bg-black/80 backdrop-blur rounded-2xl p-6 shadow-inner">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Live Results</h3>
                  <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded">UPDATED</span>
                </div>
                {[
                  { name: "Candidate A", percent: 65, color: "bg-[hsl(var(--primary))]" },
                  { name: "Candidate B", percent: 24, color: "bg-[hsl(var(--secondary))]" },
                  { name: "Candidate C", percent: 11, color: "bg-[hsl(var(--accent))]" }
                ].map(c => (
                  <div key={c.name} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{c.name}</span>
                      <span className="font-bold">{c.percent}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.percent}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full ${c.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Floating Elements */}
          <div className="absolute top-10 -right-10 w-24 h-24 bg-[hsl(var(--accent))] rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[hsl(var(--secondary))] rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose VoteEase?</h2>
          <p className="text-[hsl(var(--foreground))]/60 max-w-xl mx-auto">
            Experience the next generation of voting with features designed for security and ease of use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10 text-[hsl(var(--primary))]" />}
            title="Secure & Private"
            description="Your vote is encrypted and anonymous. We prioritize your privacy above all else."
            delay={0}
          />
          <FeatureCard
            icon={<BarChart3 className="w-10 h-10 text-[hsl(var(--secondary))]" />}
            title="Real-time Analytics"
            description="Watch the results unfold in real-time with our beautiful, interactive dashboards."
            delay={0.2}
          />
          <FeatureCard
            icon={<Globe2 className="w-10 h-10 text-[hsl(var(--accent))]" />}
            title="Accessible Anywhere"
            description="Vote from the comfort of your home, on any device. Democracy has never been this easy."
            delay={0.4}
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass-card p-8 text-center"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[hsl(var(--foreground))]/60 leading-relaxed">{description}</p>
    </motion.div>
  )
}
