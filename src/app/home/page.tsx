import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { Feed } from '@/components/Feed';
import { auth } from '@insforge/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
    const session = await auth();

    if (!session?.userId) {
        redirect('/');
    }

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
