'use client';
import { SignInButton, SignUpButton } from '@insforge/nextjs';
import { motion } from 'framer-motion';
import { BarChart3, Globe, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export function LandingHero() {
    return (
        <div className="relative min-h-screen bg-black text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">P6</div>
                    <span className="text-2xl font-bold tracking-tight text-white">Pontsix</span>
                </div>
                <div className="flex items-center gap-4">
                    <SignInButton>
                        <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="text-sm px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">Try Free</button>
                    </SignUpButton>
                </div>
            </nav>

            <main className="relative z-10 px-6 pt-20 pb-32 md:pt-32 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

                {/* Left Column: Copy & CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-medium tracking-wide"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        Platform is Live — Join the Beta
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-white">
                        Trade with <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Clarity.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
                        The professional social network engineered for prop-firm traders and institutional analysts. Filter the noise, track massive flows, and share your alpha in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                        <SignUpButton>
                            <button className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1">
                                Start Trading Socially
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 rounded-full bg-emerald-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
                            </button>
                        </SignUpButton>

                        <SignInButton>
                            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all duration-300 backdrop-blur-md">
                                View Live Feed
                            </button>
                        </SignInButton>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> WebSockets Tech
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Premium Analytics
                        </div>
                    </div>
                </motion.div>


                {/* Right Column: Floating Mock UI */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="flex-1 w-full max-w-xl relative"
                >
                    {/* Main Glass Panel */}
                    <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
                        {/* Mock Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">Live Feed</h3>
                                    <p className="text-xs text-emerald-400">1,204 active traders</p>
                                </div>
                            </div>
                        </div>

                        {/* Mock Content */}
                        <div className="space-y-4">
                            {[
                                { name: "AliceCapital", time: "Just now", text: "Massive dark pool prints on $SPY. 4M shares at current VWAP. Rotating out of tech.", tag: "#optionsflow" },
                                { name: "BobMacro", time: "2m ago", text: "CPI beat expectations by 0.1%. Expecting aggressive hawkish tone from the Fed tomorrow. Yields breaking out.", tag: "#macro" },
                                { name: "CharlieFlow", time: "5m ago", text: "Watching the $NVDA 120 level. If it breaks resistance here we are seeing a gamma squeeze to 130 into Friday op-ex.", tag: "#gamma" }
                            ].map((post, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + (i * 0.2) }}
                                    key={i}
                                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500" />
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-200">{post.name}</h4>
                                            <p className="text-xs text-slate-500">{post.time}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-2">{post.text}</p>
                                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">{post.tag}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Fade Out Edge */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
                    </div>

                    {/* Floating Accents */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 p-4 rounded-2xl bg-cyan-900/40 border border-cyan-500/30 backdrop-blur-md shadow-lg"
                    >
                        <BarChart3 className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-8 -left-8 p-4 rounded-2xl bg-purple-900/40 border border-purple-500/30 backdrop-blur-md shadow-lg"
                    >
                        <Shield className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                        className="absolute top-1/2 -right-16 p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-md shadow-lg"
                    >
                        <Globe className="w-6 h-6 text-emerald-400" />
                    </motion.div>

                </motion.div>

            </main>

        </div>
    );
}
