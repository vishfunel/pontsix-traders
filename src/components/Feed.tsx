'use client';
import { useEffect, useState } from 'react';
import { insforge } from '@/lib/insforge';
import { Composer } from './Composer';
import { PostItem } from './PostItem';

export function Feed() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        async function loadPosts() {
            const { data, error } = await insforge.database
                .from('posts')
                .select('*, users(username, avatar_url, is_online)')
                .order('created_at', { ascending: false })
                .limit(50);

            if (!error && data) {
                setPosts(data);
            }
            setLoading(false);
        }
        loadPosts();
    }, []);

    // Real-time Subscription
    useEffect(() => {
        async function setupRealtime() {
            await insforge.realtime.connect();
            const channel = 'feed:global';

            insforge.realtime.on('new_post', (payload: any) => {
                setPosts((prev) => [payload.post, ...prev]);
            });

            await insforge.realtime.subscribe(channel);
        }
        setupRealtime();

        return () => {
            insforge.realtime.unsubscribe('feed:global');
        };
    }, []);

    return (
        <div className="flex-1 overflow-y-auto">
            <Composer />

            <div className="divide-y divide-slate-800">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading feed...</div>
                ) : posts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No posts yet. Be the first to share a market insight!</div>
                ) : (
                    posts.map(post => <PostItem key={post.id} post={post} />)
                )}
            </div>
        </div>
    );
}
