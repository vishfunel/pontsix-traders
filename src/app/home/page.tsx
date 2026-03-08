'use client';
import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { Feed } from '@/components/Feed';
import { useAuth } from '@insforge/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/');
        }
    }, [isLoaded, isSignedIn, router]);

    // Show spinner while auth resolves — prevents flash of content on mobile
    if (!isLoaded) {
        return (
            <main className="h-screen w-full bg-black flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            </main>
        );
    }

    // If not signed in, show nothing (redirect is in-progress)
    if (!isSignedIn) return null;

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col sm:border-r sm:border-l border-slate-800 h-full overflow-hidden w-full max-w-2xl shrink-0">
                <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Live Feed</h1>
                </header>
                <Feed />
            </div>
            <RightPanel />
        </main>
    );
}
