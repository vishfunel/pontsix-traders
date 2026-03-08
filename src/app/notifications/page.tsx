'use client';
import { useState, useEffect } from 'react';
import { Bell, Heart, MessageCircle } from 'lucide-react';
import { useUser } from '@insforge/nextjs';
import { insforge } from '@/lib/insforge';
import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
    id: string;
    type: 'like' | 'comment';
    created_at: string;
    post_id: string;
    actor_username: string;
    actor_avatar?: string;
    post_content: string;
    comment_content?: string;
}

export default function NotificationsPage() {
    const { user } = useUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        async function load() {
            // Get the current user's post IDs first
            const { data: myPosts } = await insforge.database
                .from('posts')
                .select('id, content')
                .eq('user_id', user!.id);

            if (!myPosts || myPosts.length === 0) {
                setLoading(false);
                return;
            }

            const postIds = myPosts.map((p: any) => p.id);
            const postMap: Record<string, string> = {};
            myPosts.forEach((p: any) => { postMap[p.id] = p.content; });

            const notifs: Notification[] = [];

            // Fetch likes on my posts
            const { data: likes } = await insforge.database
                .from('likes')
                .select('id, post_id, user_id, created_at, users(username, avatar_url)')
                .in('post_id', postIds)
                .neq('user_id', user!.id)
                .order('created_at', { ascending: false })
                .limit(30);

            if (likes) {
                likes.forEach((like: any) => {
                    notifs.push({
                        id: `like-${like.id}`,
                        type: 'like',
                        created_at: like.created_at,
                        post_id: like.post_id,
                        actor_username: like.users?.username || 'someone',
                        actor_avatar: like.users?.avatar_url,
                        post_content: postMap[like.post_id] || '',
                    });
                });
            }

            // Fetch comments on my posts
            const { data: comments } = await insforge.database
                .from('comments')
                .select('id, post_id, user_id, content, created_at, users(username, avatar_url)')
                .in('post_id', postIds)
                .neq('user_id', user!.id)
                .order('created_at', { ascending: false })
                .limit(30);

            if (comments) {
                comments.forEach((comment: any) => {
                    notifs.push({
                        id: `comment-${comment.id}`,
                        type: 'comment',
                        created_at: comment.created_at,
                        post_id: comment.post_id,
                        actor_username: comment.users?.username || 'someone',
                        actor_avatar: comment.users?.avatar_url,
                        post_content: postMap[comment.post_id] || '',
                        comment_content: comment.content,
                    });
                });
            }

            // Sort by date descending
            notifs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setNotifications(notifs);
            setLoading(false);
        }

        load();
    }, [user?.id]);

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col sm:border-r sm:border-l border-slate-800 h-full overflow-hidden w-full max-w-2xl shrink-0">
                <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
                    <Bell className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Notifications</h1>
                </header>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">
                            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            Loading notifications...
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No notifications yet.</p>
                            <p className="text-xs mt-2">When someone likes or comments on your posts, it'll show up here.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="flex items-start gap-4 px-4 py-4 hover:bg-slate-900/30 transition-colors">
                                    {/* Icon */}
                                    <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center ${notif.type === 'like' ? 'bg-pink-500/20 text-pink-400' : 'bg-cyan-500/20 text-cyan-400'
                                        }`}>
                                        {notif.type === 'like' ? <Heart className="w-4 h-4 fill-current" /> : <MessageCircle className="w-4 h-4" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {/* Avatar + username */}
                                        <div className="flex items-center gap-2 mb-1">
                                            {notif.actor_avatar ? (
                                                <img src={notif.actor_avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold text-xs">
                                                    {notif.actor_username[0].toUpperCase()}
                                                </div>
                                            )}
                                            <span className="font-semibold text-white text-sm">@{notif.actor_username}</span>
                                            <span className="text-slate-400 text-xs">
                                                {notif.type === 'like' ? 'liked your post' : 'commented on your post'}
                                            </span>
                                            <span className="text-slate-600 text-xs ml-auto shrink-0">
                                                {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                            </span>
                                        </div>

                                        {/* Original post preview */}
                                        <p className="text-slate-500 text-xs italic border-l-2 border-slate-700 pl-2 mb-1 line-clamp-1">
                                            "{notif.post_content.slice(0, 80)}{notif.post_content.length > 80 ? '...' : ''}"
                                        </p>

                                        {/* Comment content */}
                                        {notif.comment_content && (
                                            <p className="text-slate-300 text-sm mt-1">"{notif.comment_content}"</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <RightPanel />
        </main>
    );
}
