'use client';
import { useState, useRef } from 'react';
import { insforge } from '@/lib/insforge';
import { useUser, useAuth } from '@insforge/nextjs';
import { Image as ImageIcon, X } from 'lucide-react';

export function Composer() {
    const { user } = useUser();
    const { isSignedIn } = useAuth();
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isSignedIn) {
        return (
            <div className="p-4 border-b border-slate-800 flex items-center justify-center min-h-[120px]">
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Sign in to share your market insights</h2>
            </div>
        );
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handlePost = async () => {
        if (!content.trim() && !file) return;
        setLoading(true);

        try {
            let imageUrl = null;
            let imageKey = null;

            if (file) {
                const { data, error: uploadError } = await insforge.storage.from('post-images').uploadAuto(file);
                if (!uploadError && data) {
                    imageUrl = data.url;
                    imageKey = data.key;
                }
            }

            const { data: post, error } = await insforge.database
                .from('posts')
                .insert({
                    author_id: user?.id,
                    content: content.trim(),
                    image_url: imageUrl,
                    image_key: imageKey,
                })
                .select('*, users(username, avatar_url, is_online)')
                .single();

            if (!error && post) {
                // Publish real-time event
                await insforge.realtime.publish('feed:global', 'new_post', { post });
                setContent('');
                setFile(null);
                setPreview(null);
            }
        } catch (err) {
            console.error('Post failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border-b border-slate-800 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0">
                {user?.profile?.avatar_url ? (
                    <img src={user.profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            <div className="flex-1 space-y-3">
                <textarea
                    placeholder="What's your market outlook?"
                    className="w-full bg-transparent resize-none outline-none text-lg text-slate-200 placeholder:text-slate-500"
                    rows={3}
                    maxLength={300}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                />

                {preview && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 mt-2">
                        <button
                            onClick={() => { setFile(null); setPreview(null); }}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1 text-white backdrop-blur-sm transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img src={preview} alt="Upload preview" className="w-full h-auto max-h-80 object-cover" />
                    </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-emerald-500 hover:bg-emerald-500/10 p-2 rounded-full transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFile}
                        />
                    </div>
                    <button
                        onClick={handlePost}
                        disabled={(!content.trim() && !file) || loading}
                        className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-black font-bold py-1.5 px-5 rounded-full transition-all tracking-wide"
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    );
}
