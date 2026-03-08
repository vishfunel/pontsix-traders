'use client';
import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import { useAuth } from '@insforge/nextjs';
import { TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';

interface Post {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    users?: { username: string; avatar_url: string };
}

interface TickerTrend {
    ticker: string;
    count: number;
}

export default function ExplorePage() {
    const { isSignedIn } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [trending, setTrending] = useState<TickerTrend[]>([]);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data } = await insforge.database
                .from('posts')
                .select('*, users(username, avatar_url)')
                .order('created_at', { ascending: false })
                .limit(200);
            if (data) {
                setPosts(data as Post[]);
                // Extract $TICKER mentions
                const tickerMap: Record<string, number> = {};
                data.forEach((post: Post) => {
                    const matches = post.content.match(/\$[A-Z]{1,5}/g) || [];
                    matches.forEach((t: string) => { tickerMap[t] = (tickerMap[t] || 0) + 1; });
                });
                const sorted = Object.entries(tickerMap)
                    .map(([ticker, count]) => ({ ticker, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 10);
                setTrending(sorted);
            }
            setLoading(false);
        }
        load();
    }, []);

    const filteredPosts = selectedTicker
        ? posts.filter(p => p.content.includes(selectedTicker))
        : posts;

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col sm:border-r sm:border-l border-slate-800 h-full overflow-hidden w-full max-w-2xl shrink-0">
                <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Explore</h1>
                </header>

                {/* Trending Tickers */}
                <div className="px-4 py-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-semibold text-slate-300">Trending Tickers</span>
                    </div>
                    {loading ? (
                        <div className="text-slate-500 text-xs">Scanning posts...</div>
                    ) : trending.length === 0 ? (
                        <div className="text-slate-500 text-xs">No $TICKER mentions found yet. Post about stocks!</div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {selectedTicker && (
                                <button
                                    onClick={() => setSelectedTicker(null)}
                                    className="px-3 py-1.5 text-xs rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600 transition-colors"
                                >
                                    ✕ Clear filter
                                </button>
                            )}
                            {trending.map(({ ticker, count }) => (
                                <button
                                    key={ticker}
                                    onClick={() => setSelectedTicker(selectedTicker === ticker ? null : ticker)}
                                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors font-mono font-bold ${selectedTicker === ticker
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                            : 'bg-slate-900 border-slate-700 text-cyan-400 hover:border-cyan-500/50'
                                        }`}
                                >
                                    {ticker} <span className="text-slate-500 font-normal ml-1">{count}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Posts Feed */}
                <div className="flex-1 overflow-y-auto">
                    {filteredPosts.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            {selectedTicker ? `No posts mentioning ${selectedTicker}` : 'No posts yet'}
                        </div>
                    ) : (
                        filteredPosts.map(post => (
                            <div key={post.id} className="px-4 py-4 border-b border-slate-800 hover:bg-slate-900/30 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    {post.users?.avatar_url ? (
                                        <img src={post.users.avatar_url} className="w-9 h-9 rounded-full object-cover" alt="" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">
                                            {(post.users?.username || '?')[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <span className="font-semibold text-white">@{post.users?.username || 'unknown'}</span>
                                    </div>
                                </div>
                                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                                    {post.content.replace(/\$([A-Z]{1,5})/g, '').trim() || post.content}
                                    {post.content.match(/\$[A-Z]{1,5}/g)?.map((t, i) => (
                                        <span key={i} className="text-cyan-400 font-mono font-semibold ml-1">{t}</span>
                                    ))}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <RightPanel />
        </main>
    );
}
