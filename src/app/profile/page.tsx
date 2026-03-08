'use client';
import { useState, useEffect, useRef } from 'react';
import { useUser, useAuth } from '@insforge/nextjs';
import { insforge } from '@/lib/insforge';
import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { PostItem } from '@/components/PostItem';
import { useRouter } from 'next/navigation';
import { User, Grid3X3, Settings } from 'lucide-react';

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState<'posts' | 'edit'>('posts');
    const [profile, setProfile] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
    }, [isLoaded, isSignedIn, router]);

    useEffect(() => {
        async function loadProfile() {
            if (!user?.id) return;
            const { data, error } = await insforge.database
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (!error && data) {
                setProfile(data);
                setUsername(data.username || '');
                setBio(data.bio || '');
                setAvatarUrl(data.avatar_url || '');
            } else if (error?.code === 'PGRST116') {
                const { data: newUser } = await insforge.database
                    .from('users')
                    .insert({ id: user.id, email: user.email, username: user.email?.split('@')[0] })
                    .select()
                    .single();
                if (newUser) {
                    setProfile(newUser);
                    setUsername(newUser.username || '');
                }
            }
            setLoading(false);
        }
        loadProfile();
    }, [user]);

    useEffect(() => {
        async function loadPosts() {
            if (!user?.id) return;
            const { data } = await insforge.database
                .from('posts')
                .select('*, users(username, avatar_url, is_online)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            if (data) setPosts(data);
            setPostsLoading(false);
        }
        loadPosts();
    }, [user]);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const { data, error } = await insforge.storage.from('avatars').uploadAuto(file);
            if (error) throw error;
            if (!data?.url) throw new Error('No URL returned from upload');
            setAvatarUrl(data.url);
        } catch (err: any) {
            alert('Failed to upload avatar: ' + (err?.message || 'Unknown error'));
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;
        setSaving(true);
        const { error } = await insforge.database
            .from('users')
            .update({ username, bio, avatar_url: avatarUrl })
            .eq('id', user.id);
        if (error) {
            alert('Error updating profile: ' + error.message);
        } else {
            alert('Profile updated!');
            setActiveTab('posts');
        }
        setSaving(false);
    };

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col sm:border-r sm:border-l border-slate-800 h-full overflow-hidden w-full max-w-2xl shrink-0">

                {/* Profile Header */}
                <div className="shrink-0">
                    {/* Cover */}
                    <div className="h-28 bg-gradient-to-r from-emerald-900/40 via-cyan-900/30 to-slate-900 relative">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px]" />
                    </div>

                    <div className="px-4 pb-4 border-b border-slate-800">
                        {/* Avatar + Edit button row */}
                        <div className="flex items-end justify-between -mt-10 mb-3">
                            <div className="relative">
                                {avatarUrl ? (
                                    <img src={avatarUrl} className="w-20 h-20 rounded-full border-4 border-black object-cover" alt="avatar" />
                                ) : (
                                    <div className="w-20 h-20 rounded-full border-4 border-black bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold text-2xl">
                                        {username?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setActiveTab(activeTab === 'edit' ? 'posts' : 'edit')}
                                className="px-4 py-1.5 rounded-full border border-slate-600 text-slate-200 text-sm font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2"
                            >
                                <Settings className="w-4 h-4" />
                                {activeTab === 'edit' ? 'View Posts' : 'Edit Profile'}
                            </button>
                        </div>

                        {!loading && (
                            <>
                                <h2 className="text-lg font-bold text-white">@{username || 'unknown'}</h2>
                                {bio && <p className="text-sm text-slate-400 mt-1">{bio}</p>}
                                <p className="text-xs text-slate-600 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
                            </>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-800">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'posts' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-500 hover:text-white'
                                }`}
                        >
                            <Grid3X3 className="w-4 h-4" /> Posts
                        </button>
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'edit' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-500 hover:text-white'
                                }`}
                        >
                            <Settings className="w-4 h-4" /> Edit Profile
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* POSTS TAB */}
                    {activeTab === 'posts' && (
                        <div className="divide-y divide-slate-800">
                            {postsLoading ? (
                                <div className="p-8 text-center text-slate-500">Loading your posts...</div>
                            ) : posts.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">
                                    <Grid3X3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                    <p>No posts yet.</p>
                                    <p className="text-xs mt-1">Share your first market insight on the Home feed!</p>
                                </div>
                            ) : (
                                posts.map(post => <PostItem key={post.id} post={post} />)
                            )}
                        </div>
                    )}

                    {/* EDIT TAB */}
                    {activeTab === 'edit' && (
                        <div className="p-6">
                            {loading ? (
                                <div className="text-slate-500">Loading...</div>
                            ) : (
                                <form onSubmit={handleSave} className="space-y-6 max-w-md">
                                    <div>
                                        <label className="block text-slate-400 mb-2 text-xs uppercase tracking-wider font-semibold">Username</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="Trader handle"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 mb-2 text-xs uppercase tracking-wider font-semibold">Bio</label>
                                        <textarea
                                            value={bio}
                                            onChange={e => setBio(e.target.value)}
                                            rows={4}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="Tell us about your trading style..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 mb-2 text-xs uppercase tracking-wider font-semibold">Profile Picture</label>
                                        <div className="flex items-center gap-4">
                                            {avatarUrl ? (
                                                <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-slate-700" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">N/A</div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={uploading}
                                                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-sm border border-slate-700"
                                            >
                                                {uploading ? 'Uploading...' : 'Upload Image'}
                                            </button>
                                            <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <RightPanel />
        </main>
    );
}
