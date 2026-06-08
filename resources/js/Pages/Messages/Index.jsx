import React, { useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { MessageSquare, Send, UserRound } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProviderLayout from '@/Layouts/ProviderLayout';

const avatarUrl = (user) => {
    if (!user?.photoProfile) {
        return null;
    }

    return user.photoProfile.startsWith('http')
        ? user.photoProfile
        : `/storage/${user.photoProfile}`;
};

const formatTime = (value) => {
    if (!value) {
        return '';
    }

    return new Date(value).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function Index({ auth, contacts = [], conversations = [], selectedUser, messages = [] }) {
    const { flash = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        receiver_id: selectedUser?.id || '',
        contenu: '',
    });

    useEffect(() => {
        setData('receiver_id', selectedUser?.id || '');
    }, [selectedUser?.id]);

    const submit = (event) => {
        event.preventDefault();

        post(route('messages.store'), {
            preserveScroll: true,
            onSuccess: () => reset('contenu'),
        });
    };

    const Layout = auth.user.role === 'provider' ? ProviderLayout : AuthenticatedLayout;
    const existingConversationIds = conversations.map((conversation) => conversation.user.id);
    const newContacts = contacts.filter((contact) => !existingConversationIds.includes(contact.id));

    return (
        <Layout auth={auth}>
            <div className="mx-auto grid min-h-[72vh] max-w-6xl grid-cols-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-[320px_1fr]">
                <aside className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950 lg:border-b-0 lg:border-r">
                    <div className="flex items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
                        <MessageSquare className="h-5 w-5 text-cyan-600" />
                        <div>
                            <h1 className="text-base font-semibold text-slate-950 dark:text-white">Messagerie</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Client et prestataire</p>
                        </div>
                    </div>

                    <div className="max-h-[64vh] overflow-y-auto p-3">
                        {conversations.map((conversation) => (
                            <ContactLink
                                key={conversation.user.id}
                                user={conversation.user}
                                active={selectedUser?.id === conversation.user.id}
                                meta={conversation.last_message.contenu}
                                badge={conversation.unread_count}
                            />
                        ))}

                        {newContacts.length > 0 && (
                            <div className="mt-4">
                                <p className="px-2 text-xs font-semibold uppercase text-slate-400">Nouveau message</p>
                                <div className="mt-2 space-y-1">
                                    {newContacts.map((contact) => (
                                        <ContactLink
                                            key={contact.id}
                                            user={contact}
                                            active={selectedUser?.id === contact.id}
                                            meta={contact.email}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                <section className="flex min-h-[72vh] flex-col bg-white dark:bg-slate-900">
                    {selectedUser ? (
                        <>
                            <div className="flex items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
                                <Avatar user={selectedUser} />
                                <div>
                                    <h2 className="font-semibold text-slate-950 dark:text-white">{selectedUser.name}</h2>
                                    <p className="text-sm capitalize text-slate-500 dark:text-slate-400">{selectedUser.role}</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                                {messages.length > 0 ? (
                                    messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[78%] rounded-lg px-4 py-3 text-sm shadow-sm ${message.mine ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'}`}>
                                                <p className="whitespace-pre-wrap break-words">{message.contenu}</p>
                                                <p className={`mt-2 text-xs ${message.mine ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                                    {formatTime(message.envoyeLe)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex h-full items-center justify-center text-center text-sm text-slate-500 dark:text-slate-400">
                                        Aucun message pour le moment.
                                    </div>
                                )}
                            </div>

                            <form onSubmit={submit} className="border-t border-slate-200 p-4 dark:border-slate-700">
                                {flash.success && (
                                    <p className="mb-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                        {flash.success}
                                    </p>
                                )}
                                <div className="flex gap-3">
                                    <textarea
                                        value={data.contenu}
                                        onChange={(event) => setData('contenu', event.target.value)}
                                        rows="2"
                                        className="min-h-[48px] flex-1 resize-none rounded-lg border-slate-300 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                        placeholder="Ecrire un message..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing || !data.contenu.trim()}
                                        className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Envoyer"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                                {errors.contenu && <p className="mt-2 text-sm text-red-600">{errors.contenu}</p>}
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-slate-500 dark:text-slate-400">
                            <MessageSquare className="h-10 w-10 text-cyan-600" />
                            <p>Choisissez une conversation pour commencer.</p>
                        </div>
                    )}
                </section>
            </div>
        </Layout>
    );
}

function ContactLink({ user, active, meta, badge = 0 }) {
    return (
        <Link
            href={route('messages.index', user.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 transition ${active ? 'bg-cyan-600 text-white' : 'text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900'}`}
        >
            <Avatar user={user} />
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    {badge > 0 && (
                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                            {badge}
                        </span>
                    )}
                </div>
                {meta && <p className={`truncate text-xs ${active ? 'text-cyan-50' : 'text-slate-500 dark:text-slate-400'}`}>{meta}</p>}
            </div>
        </Link>
    );
}

function Avatar({ user }) {
    const url = avatarUrl(user);

    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
            {url ? (
                <img src={url} alt={user.name} className="h-full w-full object-cover" />
            ) : (
                <UserRound className="h-5 w-5" />
            )}
        </div>
    );
}
