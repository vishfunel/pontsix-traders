'use client';
import { Home, Compass, Newspaper, Bell, User, LogOut, MessageCircle } from 'lucide-react';
import { useAuth, useUser, SignInButton, SignUpButton } from '@insforge/nextjs';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const pathname = usePathname();

    const handleLogout = async () => {
        await insforge.auth.signOut();
        window.location.href = '/';
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden sm:flex w-[80px] md:w-[250px] shrink-0 h-full flex-col justify-between py-4 px-2 md:px-4 border-r border-slate-800">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center md:justify-start gap-3 p-3 mb-4">
                        <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center font-bold text-black border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]">P6</div>
                        <span className="hidden md:inline text-xl font-bold tracking-tight">Pontsix</span>
                    </div>

                    <nav className="flex flex-col space-y-2">
                        <SidebarLink icon={<Home />} label="Home" href="/home" active={pathname === '/home'} />
                        <SidebarLink icon={<Compass />} label="Explore" href="/explore" active={pathname === '/explore'} />
                        <SidebarLink icon={<Newspaper />} label="Market News" href="/market-news" active={pathname === '/market-news'} />
                        <SidebarLink icon={<Bell />} label="Notifications" href="/notifications" active={pathname === '/notifications'} />
                        {isSignedIn && <SidebarLink icon={<MessageCircle />} label="Messages" href="/chat" active={pathname === '/chat'} />}
                        {isSignedIn && <SidebarLink icon={<User />} label="Profile" href="/profile" active={pathname === '/profile'} />}
                    </nav>
                </div>

                <div className="mt-auto flex flex-col items-center md:items-stretch gap-4">
                    {isLoaded && !isSignedIn && (
                        <div className="flex flex-col gap-2 w-full">
                            <SignInButton>
                                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-full transition-colors text-sm">Log In</button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-full transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] text-sm">Sign Up</button>
                            </SignUpButton>
                        </div>
                    )}

                    {isLoaded && isSignedIn && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center md:justify-start gap-3 p-3 rounded-full hover:bg-red-500/10 text-red-400 transition-colors w-full group"
                        >
                            <LogOut className="w-6 h-6" />
                            <span className="hidden md:inline font-medium">Log out</span>
                        </button>
                    )}
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around items-center p-3 z-50">
                <MobileLink icon={<Home />} href="/home" active={pathname === '/home'} />
                <MobileLink icon={<Compass />} href="/explore" active={pathname === '/explore'} />
                <MobileLink icon={<Bell />} href="/notifications" active={pathname === '/notifications'} />
                {isSignedIn && <MobileLink icon={<MessageCircle />} href="/chat" active={pathname === '/chat'} />}
                {isSignedIn && <MobileLink icon={<User />} href="/profile" active={pathname === '/profile'} />}
            </nav>
        </>
    );
}

function SidebarLink({ icon, label, href, active }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
    return (
        <Link href={href} className={`flex items-center justify-center md:justify-start gap-4 p-3 rounded-full w-full transition-all duration-200 ${active ? 'font-bold bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <div className="w-6 h-6">{icon}</div>
            <span className="hidden md:inline text-lg">{label}</span>
        </Link>
    );
}

function MobileLink({ icon, href, active }: { icon: React.ReactNode, href: string, active?: boolean }) {
    return (
        <Link href={href} className={`p-2 rounded-full transition-colors ${active ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
            <div className="w-6 h-6">{icon}</div>
        </Link>
    );
}
