'use client';
import { useEffect } from 'react';
import { useUser, useAuth } from '@insforge/nextjs';
import { insforge } from '@/lib/insforge';

export function PresenceTracker() {
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if (!isSignedIn || !user?.id) return;

        // Set online
        const setOnline = async () => {
            await insforge.database
                .from('users')
                .update({ is_online: true })
                .eq('id', user.id);
        };

        // Note: A true presence system would use WebSockets presence features, 
        // but for this MVP we'll simply update the DB status on mount/unmount.

        setOnline();

        // Set offline on unmount/unload
        const setOffline = () => {
            insforge.database
                .from('users')
                .update({ is_online: false })
                .eq('id', user.id);
        };

        window.addEventListener('beforeunload', setOffline);

        return () => {
            window.removeEventListener('beforeunload', setOffline);
            setOffline();
        };
    }, [isSignedIn, user?.id]);

    return null;
}
