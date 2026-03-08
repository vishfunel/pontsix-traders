'use client';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { insforge } from '@/lib/insforge';
import { useAuth } from '@insforge/nextjs';

export function PostItem({ post }: { post: any }) {
    const { isSignedIn } = useAuth();

    const handleLike = async () => {
        if (!isSignedIn) return;
        try {
            // In a real approach, we'd check if liked already, insert/delete to likes table, 
            // Call RPC or realtime event to update like count. 
            // For simplicity here, we demonstrate the real-time interaction intent.
            console.log('Liked Post', post.id);
        } catch (err) {
            console.error(err);
        }
    };

    const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

    return (
        <article className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0 relative mt-1">
                {post.users?.avatar_url ? (
                    <img src={post.users.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-sm">
                        {post.users?.username?.charAt(0).toUpperCase() || '?'}
                    </div>
                )}
                {post.users?.is_online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-bold text-slate-100 truncate hover:underline">{post.users?.username || 'Unknown Trader'}</span>
                        <span className="text-slate-500 shrink-0">·</span>
                        <span className="text-slate-500 hover:underline shrink-0 text-xs">{timeAgo}</span>
                    </div>
                </div>

                <p className="mt-1 text-slate-200 text-[15px] whitespace-pre-wrap break-words">
                    {post.content}
                </p>

                {post.image_url && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50">
                        <img src={post.image_url} alt="Post image" className="w-full h-auto max-h-96 object-cover" loading="lazy" />
                    </div>
                )}

                <div className="mt-3 flex items-center justify-between text-slate-500 max-w-md">
                    <button className="flex items-center gap-2 hover:text-emerald-400 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-emerald-400/10"><MessageCircle className="w-4 h-4" /></div>
                        <span className="text-xs">0</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-green-400/10"><Repeat2 className="w-4 h-4" /></div>
                        <span className="text-xs">0</span>
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); handleLike(); }} className="flex items-center gap-2 hover:text-pink-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-pink-500/10"><Heart className="w-4 h-4" /></div>
                        <span className="text-xs">{post.likes_count || 0}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-cyan-400/10"><Share className="w-4 h-4" /></div>
                    </button>
                </div>
            </div>
        </article>
    );
}
