import { LandingHero } from '@/components/LandingHero';
import { auth } from '@insforge/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  // If user IS authenticated, redirect to the actual software at /home
  if (session?.userId) {
    redirect('/home');
  }

  // Otherwise, render the Landing Page
  return (
    <main className="h-screen w-full bg-black text-white">
      <LandingHero />
    </main>
  );
}
