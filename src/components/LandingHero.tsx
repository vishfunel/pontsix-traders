'use client';
import { SignInButton, SignUpButton } from '@insforge/nextjs';
import { motion } from 'framer-motion';
import { BarChart3, Globe, Shield, Zap, CheckCircle2, ArrowRight, Activity, Users, Lock, ChevronRight, MessageSquare, LineChart, TrendingUp } from 'lucide-react';

export function LandingHero() {
    return (
        <div className="relative min-h-screen bg-black text-slate-200 overflow-x-hidden font-sans selection:bg-emerald-500/30">

            {/* Global Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0">
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

            <div className="relative z-10">
                {/* SECTION 1: HERO */}
                <section className="px-6 pt-20 pb-20 md:pt-32 md:pb-32 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
                    {/* Left Column: Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
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

                        <div className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> WebSockets Tech</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Premium Analytics</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to join</div>
                        </div>
                    </motion.div>

                    {/* Right Column: Floating Mock UI */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="flex-1 w-full max-w-xl relative"
                    >
                        {/* Main Glass Panel */}
                        <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-sm">Live Feed</h3>
                                        <p className="text-xs text-emerald-400">1,204 active traders</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: "AliceCapital", time: "Just now", text: "Massive dark pool prints on $SPY. 4M shares at current VWAP. Rotating out of tech.", tag: "#optionsflow" },
                                    { name: "BobMacro", time: "2m ago", text: "CPI beat expectations by 0.1%. Expecting aggressive hawkish tone from the Fed tomorrow. Yields breaking out.", tag: "#macro" },
                                    { name: "CharlieFlow", time: "5m ago", text: "Watching the $NVDA 120 level. If it breaks resistance here we are seeing a gamma squeeze to 130 into Friday op-ex.", tag: "#gamma" }
                                ].map((post, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 + (i * 0.2) }}
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
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Accents */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 hidden sm:flex p-4 rounded-2xl bg-cyan-900/40 border border-cyan-500/30 backdrop-blur-md shadow-lg"
                        >
                            <BarChart3 className="w-8 h-8 text-cyan-400" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-8 -left-8 hidden sm:flex p-4 rounded-2xl bg-purple-900/40 border border-purple-500/30 backdrop-blur-md shadow-lg"
                        >
                            <Shield className="w-8 h-8 text-purple-400" />
                        </motion.div>
                    </motion.div>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* SECTION 2: FEATURES GRID */}
                <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for <span className="text-emerald-400">Execution.</span></h2>
                        <p className="text-slate-400 text-lg">We stripped away the cat videos and engagement bait. Pontsix gives you exactly what you need to find an edge in the markets.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Zero-Latency Feed</h3>
                            <p className="text-slate-400 leading-relaxed">Our proprietary WebSocket engine delivers posts and charts to your screen instantly. No pulling to refresh.</p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Trending Flow</h3>
                            <p className="text-slate-400 leading-relaxed">Automatically aggregate mentions of tickers to see exactly where the smart money is rotating in real time.</p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                                <Lock className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Verified Institutional</h3>
                            <p className="text-slate-400 leading-relaxed">Optional verification for active prop-firm and institutional traders to filter out retail noise.</p>
                        </motion.div>
                    </div>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* SECTION 3: SOCIAL PROOF */}
                <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16">Trusted by the <span className="text-cyan-400">1%.</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 text-left">
                            <div className="flex gap-1 mb-4 text-emerald-400">{'★'.repeat(5)}</div>
                            <p className="text-lg text-slate-300 mb-6 italic">"Pontsix completely replaced Twitter for my desk. The signal-to-noise ratio is insane. When something prints on the tape, it's on Pontsix a second later."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800" />
                                <div>
                                    <div className="font-bold text-white">David K.</div>
                                    <div className="text-sm text-slate-500">Senior Volatility Trader</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 text-left">
                            <div className="flex gap-1 mb-4 text-emerald-400">{'★'.repeat(5)}</div>
                            <p className="text-lg text-slate-300 mb-6 italic">"The UI is incredibly clean. I keep the live feed up on my 4th monitor all day. Found 3 massive block trades last week solely from community alerts."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800" />
                                <div>
                                    <div className="font-bold text-white">Sarah M.</div>
                                    <div className="text-sm text-slate-500">Macro Analyst</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: FINAL CTA */}
                <section className="py-32 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-500/20 bg-emerald-900/10 p-12 text-center relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Ready to join the elite?</h2>
                            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Stop scrolling through spam. Start trading with the fastest, cleanest market chat platform ever built.</p>

                            <SignUpButton>
                                <button className="px-10 py-5 bg-white text-black text-lg font-bold rounded-full transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                    Create Free Account
                                </button>
                            </SignUpButton>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-slate-800 py-12 px-6 lg:px-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-emerald-500 text-xs">P6</div>
                        <span className="font-bold text-slate-400">© 2026 Pontsix Traders. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Contact Support</a>
                    </div>
                </footer>

            </div>
        </div>
    );
}
