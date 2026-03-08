'use client';
import { SignInButton, SignUpButton } from '@insforge/nextjs';

export function LandingHero() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="z-10 max-w-3xl space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md mb-4 text-sm tracking-wide text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Pontsix Traders MVP
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                    Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Traders</span> Talk Markets.
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Join the fastest growing real-time social platform built exclusively for prop-firm traders, macro analysts, and market enthusiasts.
                    Signal through the noise.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <SignUpButton>
                        <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
                            Start Trading Socially
                        </button>
                    </SignUpButton>

                    <SignInButton>
                        <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-medium rounded-full transition-all duration-300 hover:border-slate-600">
                            Log In to Platform
                        </button>
                    </SignInButton>
                </div>

                <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left opacity-80">
                    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                        <h3 className="text-emerald-400 font-bold mb-2">Real-Time Data</h3>
                        <p className="text-sm text-slate-400">Instant websocket delivery for market chatter without pulling to refresh.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                        <h3 className="text-cyan-400 font-bold mb-2">Curated Feed</h3>
                        <p className="text-sm text-slate-400">Cut out the memes. See pure market analysis, charts, and actionable flow.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                        <h3 className="text-purple-400 font-bold mb-2">Presence Tracking</h3>
                        <p className="text-sm text-slate-400">Know exactly when the whales are online and watching the ticker tape.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
