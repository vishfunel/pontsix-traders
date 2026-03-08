import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { Feed } from '@/components/Feed';
import { LandingHero } from '@/components/LandingHero';
import { auth } from '@insforge/nextjs/server';

export default async function Home() {
  const session = await auth();

  // If user is NOT authenticated, show the Landing Page
  if (!session?.userId) {
    return (
      <main className="h-screen w-full bg-black text-white">
        <LandingHero />
      </main>
    );
  }

  // If authenticated, show the Trading App
  return (
    <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm">
      <Sidebar />
      <div className="flex-1 flex flex-col border-r border-l border-slate-800 h-full overflow-hidden w-full max-w-2xl shrink-0">
        <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Live Feed</h1>
        </header>
        <Feed />
      </div>
      <RightPanel />
    </main>
  );
}
