'use client';
import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';

interface NewsItem {
    title: string;
    url: string;
    time_published: string;
    authors: string[];
    summary: string;
    source: string;
    overall_sentiment_label: string;
    overall_sentiment_score: number;
    banner_image?: string;
}

function SentimentBadge({ label }: { label: string }) {
    if (label?.toLowerCase().includes('bullish')) return (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" /> Bullish
        </span>
    );
    if (label?.toLowerCase().includes('bearish')) return (
        <span className="flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
            <TrendingDown className="w-3 h-3" /> Bearish
        </span>
    );
    return (
        <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-500/10 px-2 py-0.5 rounded-full">
            <Minus className="w-3 h-3" /> Neutral
        </span>
    );
}

export default function MarketNewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchNews() {
            try {
                // Alpha Vantage free tier - 25 req/day
                const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY || 'demo';
                const res = await fetch(
                    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets,forex,crypto&sort=LATEST&limit=20&apikey=${API_KEY}`
                );
                const json = await res.json();
                if (json.feed) {
                    setNews(json.feed);
                } else {
                    setError('Could not load news. API limit may have been reached.');
                }
            } catch {
                setError('Failed to fetch market news.');
            }
            setLoading(false);
        }
        fetchNews();
    }, []);

    function formatTime(raw: string) {
        // Format: 20240308T150000
        try {
            const d = new Date(
                `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}T${raw.slice(9, 11)}:${raw.slice(11, 13)}:${raw.slice(13, 15)}`
            );
            return d.toLocaleString();
        } catch { return raw; }
    }

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col sm:border-r sm:border-l border-slate-800 h-full overflow-hidden w-full max-w-2xl shrink-0">
                <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
                    <Newspaper className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Market News</h1>
                </header>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">
                            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            Fetching latest market news...
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-400">{error}</div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {news.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-4 px-4 py-4 hover:bg-slate-900/40 transition-colors group"
                                >
                                    {item.banner_image && (
                                        <img
                                            src={item.banner_image}
                                            alt=""
                                            className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-800"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="text-slate-100 font-semibold leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                                        </div>
                                        <p className="text-slate-500 text-xs line-clamp-2 mb-2">{item.summary}</p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <SentimentBadge label={item.overall_sentiment_label} />
                                            <span className="text-xs text-slate-600">{item.source}</span>
                                            <span className="text-xs text-slate-700">{formatTime(item.time_published)}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <RightPanel />
        </main>
    );
}
