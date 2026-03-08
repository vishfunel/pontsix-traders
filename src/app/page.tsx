'use client';
import { LandingHero } from '@/components/LandingHero';
import { useAuth } from '@insforge/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/home');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show nothing while auth state is loading to prevent flash of landing page
  if (!isLoaded || isSignedIn) {
    return (
      <main className="h-screen w-full bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <LandingHero />
    </main>
  );
}
