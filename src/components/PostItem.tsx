'use client';
import { Heart, MessageCircle, Repeat2, Share, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { insforge } from '@/lib/insforge';
import { useAuth, useUser } from '@insforge/nextjs';
import { useState, useEffect } from 'react';

export function PostItem({ post, onLikeUpdate }: { post: any, onLikeUpdate?: () => void }) {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        setLikesCount(post.likes_count || 0);
    }, [post.likes_count]);

    // Check if the current user has liked this post
    useEffect(() => {
        async function checkLiked() {
            if (!isSignedIn || !user?.id) return;
            const { data } = await insforge.database
                .from('likes')
                .select('*')
                .eq('post_id', post.id)
                .eq('user_id', user.id)
                .single();
            if (data) setLiked(true);
        }
        checkLiked();
    }, [isSignedIn, user?.id, post.id]);

    const handleLike = async () => {
        if (!isSignedIn || !user?.id) return alert('Please log in to like posts.');

        try {
            if (liked) {
                // Unlike
                setLiked(false);
                setLikesCount((prev: number) => Math.max(0, prev - 1));
                await insforge.database
                    .from('likes')
                    .delete()
                    .eq('post_id', post.id)
                    .eq('user_id', user.id);
            } else {
                // Like
                setLiked(true);
                setLikesCount((prev: number) => prev + 1);
                await insforge.database
                    .from('likes')
                    .insert({ post_id: post.id, user_id: user.id });
            }
        } catch (err) {
            console.error('Like error', err);
        }
    };

    const toggleComments = async () => {
        setShowComments(!showComments);
        if (!showComments && comments.length === 0) {
            loadComments();
        }
    };

    const loadComments = async () => {
        setLoadingComments(true);
        const { data, error } = await insforge.database
            .from('comments')
            .select('*, users(username, avatar_url)')
            .eq('post_id', post.id)
            .order('created_at', { ascending: true });

        if (!error && data) {
            setComments(data);
        }
        setLoadingComments(false);
    };

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !user?.id) return alert('Please log in to comment.');

        const tempComment = {
            id: 'temp-' + Date.now(),
            content: newComment,
            created_at: new Date().toISOString(),
            users: { username: user.username || 'You', avatar_url: user.imageUrl }
        };

        setComments([...comments, tempComment]);
        setNewComment('');

        const { error, data } = await insforge.database
            .from('comments')
            .insert({ post_id: post.id, user_id: user.id, content: tempComment.content })
            .select('*, users(username, avatar_url)')
            .single();

        if (!error && data) {
            setComments(prev => prev.map(c => c.id === tempComment.id ? data : c));
        } else {
            console.error('Failed to post comment', error);
            alert('Failed to post comment');
        }
    };

    const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

    return (
        <article className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-slate-800/50">
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0 relative mt-1">
                    {post.users?.avatar_url ? (
                        <img src={post.users.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-sm">
                            {post.users?.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                    )}
                    {post.users?.is_online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
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
                        <button onClick={(e) => { e.stopPropagation(); toggleComments(); }} className={`flex items-center gap-2 hover:text-emerald-400 transition-colors group ${showComments ? 'text-emerald-400' : ''}`}>
                            <div className="p-2 rounded-full group-hover:bg-emerald-400/10"><MessageCircle className="w-4 h-4" /></div>
                            <span className="text-xs">{comments.length > 0 ? comments.length : 'Reply'}</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-green-400/10"><Repeat2 className="w-4 h-4" /></div>
                            <span className="text-xs">0</span>
                        </button>

                        <button onClick={(e) => { e.stopPropagation(); handleLike(); }} className={`flex items-center gap-2 transition-colors group ${liked ? 'text-pink-500' : 'hover:text-pink-500'}`}>
                            <div className="p-2 rounded-full group-hover:bg-pink-500/10 fill-current">
                                <Heart className={`w-4 h-4 ${liked ? 'fill-pink-500' : ''}`} />
                            </div>
                            <span className="text-xs">{likesCount}</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-cyan-400/10"><Share className="w-4 h-4" /></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 pt-4 border-t border-slate-800/50 pl-12">
                    {loadingComments ? (
                        <div className="text-xs text-slate-500 text-center py-2">Loading comments...</div>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((comment, i) => (
                                <div key={comment.id || i} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 shrink-0 overflow-hidden">
                                        {comment.users?.avatar_url ? (
                                            <img src={comment.users.avatar_url} alt="C" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-xs">
                                                {comment.users?.username?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 bg-slate-900/50 p-3 rounded-2xl rounded-tl-sm border border-slate-800">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-slate-200 text-xs">{comment.users?.username}</span>
                                            <span className="text-[10px] text-slate-500">
                                                {comment.created_at ? formatDistanceToNow(new Date(comment.created_at), { addSuffix: true }) : 'Just now'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-300">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isSignedIn && (
                        <form onSubmit={submitComment} className="mt-4 flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden shrink-0">
                                {user?.imageUrl ? (
                                    <img src={user.imageUrl} alt="U" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500">
                                        U
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Post your reply..."
                                className="flex-1 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-200 outline-none focus:border-emerald-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="bg-emerald-500 text-black p-2 rounded-full hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                </div>
            )}
        </article>
    );
}
