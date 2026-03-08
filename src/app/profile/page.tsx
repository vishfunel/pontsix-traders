'use client';
import { useState, useEffect, useRef } from 'react';
import { useUser, useAuth } from '@insforge/nextjs';
import { insforge } from '@/lib/insforge';
import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, setProfile] = useState<any>(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [loading, setLoading] = useState(true);
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
                // User not found in public.users, create them
                const { data: newUser } = await insforge.database
                    .from('users')
                    .insert({
                        id: user.id,
                        email: user.email,
                        username: user.email?.split('@')[0]
                    })
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

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { data, error } = await insforge.storage.from('avatars').uploadAuto(file);
            if (error) throw error;
            if (!data?.url) throw new Error('No URL returned from upload');

            // uploadAuto returns data.url directly — no need for getPublicUrl
            setAvatarUrl(data.url);
        } catch (err: any) {
            console.error('Error uploading avatar:', err);
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
            .update({
                username,
                bio,
                avatar_url: avatarUrl
            })
            .eq('id', user.id);

        if (error) {
            console.error('Update error:', error);
            alert('Error updating profile: ' + error.message);
        } else {
            alert('Profile updated successfully!');
        }
        setSaving(false);
    };

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col border-r border-l border-slate-800 h-full overflow-y-auto w-full max-w-2xl shrink-0 p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

                {loading ? (
                    <div>Loading profile...</div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-6 max-w-md">
                        <div>
                            <label className="block text-slate-400 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 outline-none focus:border-emerald-500 transition-colors"
                                placeholder="Trader handle"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-400 mb-2">Bio</label>
                            <textarea
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={4}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 outline-none focus:border-emerald-500 transition-colors"
                                placeholder="Tell us about your trading style..."
                            />
                        </div>

                        <div>
                            <label className="block text-slate-400 mb-2">Profile Picture</label>
                            <div className="flex items-center gap-4">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover border border-slate-700" />
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
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
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
            <RightPanel />
        </main>
    );
}
