'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, ArrowLeft, Search } from 'lucide-react';
import { useUser, useAuth } from '@insforge/nextjs';
import { insforge } from '@/lib/insforge';
import { Sidebar } from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface ChatUser {
    id: string;
    username: string;
    avatar_url?: string;
    is_online?: boolean;
}

interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
}

export default function ChatPage() {
    const { user, isLoaded } = useUser();
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [users, setUsers] = useState<ChatUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) router.replace('/');
    }, [isLoaded, isSignedIn]);

    // Load all users to chat with
    useEffect(() => {
        if (!user?.id) return;
        async function loadUsers() {
            const { data } = await insforge.database
                .from('users')
                .select('id, username, avatar_url, is_online')
                .neq('id', user!.id)
                .order('username');
            if (data) setUsers(data);
        }
        loadUsers();
    }, [user?.id]);

    // Load messages for selected conversation
    useEffect(() => {
        if (!user?.id || !selectedUser) return;
        async function loadMessages() {
            const { data } = await insforge.database
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${user!.id},receiver_id.eq.${selectedUser!.id}),and(sender_id.eq.${selectedUser!.id},receiver_id.eq.${user!.id})`)
                .order('created_at', { ascending: true });
            if (data) setMessages(data);
        }
        loadMessages();

        // Real-time subscription
        const channel = `chat:${[user.id, selectedUser.id].sort().join('-')}`;
        insforge.realtime.connect().then(() => {
            insforge.realtime.on('new_message', (payload: any) => {
                if (
                    (payload.message.sender_id === selectedUser.id && payload.message.receiver_id === user!.id) ||
                    (payload.message.sender_id === user!.id && payload.message.receiver_id === selectedUser.id)
                ) {
                    setMessages(prev => [...prev, payload.message]);
                }
            });
            insforge.realtime.subscribe(channel);
        });

        return () => { insforge.realtime.unsubscribe(channel); };
    }, [selectedUser?.id, user?.id]);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !user?.id || !selectedUser || sending) return;
        setSending(true);
        const msgContent = newMessage.trim();
        setNewMessage('');

        const { data } = await insforge.database
            .from('messages')
            .insert({
                sender_id: user.id,
                receiver_id: selectedUser.id,
                content: msgContent,
            })
            .select()
            .single();

        if (data) {
            setMessages(prev => [...prev, data]);
        }
        setSending(false);
    };

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isLoaded) return (
        <main className="h-screen w-full bg-black flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </main>
    );

    return (
        <main className="max-w-7xl mx-auto flex h-screen overflow-hidden text-sm pb-16 sm:pb-0">
            <Sidebar />

            {/* User List Panel */}
            <div className={`${selectedUser ? 'hidden sm:flex' : 'flex'} w-full sm:w-80 shrink-0 flex-col border-r border-slate-800 h-full`}>
                <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Messages</h1>
                </header>

                {/* Search */}
                <div className="px-3 py-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-full px-3 py-2">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search traders..."
                            className="bg-transparent text-slate-200 outline-none text-sm flex-1 placeholder-slate-600"
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                        <div className="p-6 text-center text-slate-500 text-xs">No traders found</div>
                    ) : (
                        filteredUsers.map(u => (
                            <button
                                key={u.id}
                                onClick={() => setSelectedUser(u)}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-900/50 transition-colors border-b border-slate-800/50 ${selectedUser?.id === u.id ? 'bg-slate-900 border-l-2 border-l-emerald-500' : ''
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    {u.avatar_url ? (
                                        <img src={u.avatar_url} className="w-10 h-10 rounded-full object-cover" alt="" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold">
                                            {(u.username || '?')[0].toUpperCase()}
                                        </div>
                                    )}
                                    {u.is_online && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />
                                    )}
                                </div>
                                <div className="text-left min-w-0">
                                    <p className="font-semibold text-white truncate">@{u.username}</p>
                                    {u.is_online && <p className="text-xs text-emerald-400">Online</p>}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Panel */}
            <div className={`${selectedUser ? 'flex' : 'hidden sm:flex'} flex-1 flex-col h-full border-r border-slate-800`}>
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <header className="px-4 py-3 border-b border-slate-800 bg-black/80 backdrop-blur-md flex items-center gap-3">
                            <button onClick={() => setSelectedUser(null)} className="sm:hidden text-slate-400 hover:text-white">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            {selectedUser.avatar_url ? (
                                <img src={selectedUser.avatar_url} className="w-8 h-8 rounded-full object-cover" alt="" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">
                                    {selectedUser.username[0].toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="font-bold text-white">@{selectedUser.username}</p>
                                {selectedUser.is_online && <p className="text-xs text-emerald-400">Online</p>}
                            </div>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {messages.length === 0 ? (
                                <div className="text-center text-slate-500 mt-8">
                                    <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
                                    <p>No messages yet. Say hi to @{selectedUser.username}!</p>
                                </div>
                            ) : (
                                messages.map(msg => {
                                    const isMe = msg.sender_id === user?.id;
                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${isMe
                                                    ? 'bg-emerald-500 text-black font-medium rounded-br-sm'
                                                    : 'bg-slate-800 text-slate-100 rounded-bl-sm'
                                                }`}>
                                                <p>{msg.content}</p>
                                                <p className={`text-xs mt-1 ${isMe ? 'text-emerald-900' : 'text-slate-500'}`}>
                                                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-slate-800 bg-black/50">
                            <div className="flex items-center gap-3">
                                <input
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                    placeholder={`Message @${selectedUser.username}...`}
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2.5 text-slate-100 outline-none focus:border-emerald-500 transition-colors placeholder-slate-600"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim() || sending}
                                    className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black rounded-full flex items-center justify-center transition-colors shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        <div className="text-center">
                            <MessageCircle className="w-14 h-14 mx-auto mb-3 opacity-20" />
                            <p className="text-lg font-semibold">Select a conversation</p>
                            <p className="text-sm text-slate-600 mt-1">Pick a trader from the list to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
