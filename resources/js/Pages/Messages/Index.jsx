import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MessageSquare, Send, UserRound } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProviderLayout from '@/Layouts/ProviderLayout';
import AdminLayout from '@/Layouts/AdminLayout';

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

    const existingConversationIds = conversations.map((conversation) => conversation.user.id);
    const newContacts = contacts.filter((contact) => !existingConversationIds.includes(contact.id));

    const content = (
        <>
            <Head title="Messagerie" />

            <section className="messagerie-page">
                <div className="messagerie-header">
                    <div className="d-flex align-items-center gap-3">
                        <span className="messagerie-icon">
                            <MessageSquare size={22} />
                        </span>
                        <div>
                            <h1>Messagerie</h1>
                            <p>Conversations entre clients, prestataires et support.</p>
                        </div>
                    </div>
                </div>

                <div className="messagerie-card">
                    <aside className="messagerie-contacts">
                        <div className="messagerie-contacts-header">
                            <h2 className="h6 fw-bold mb-1">Conversations</h2>
                            <p className="small text-secondary mb-0">Selectionnez un contact</p>
                        </div>

                        <div className="messagerie-list">
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
                                <div className="mt-3">
                                    <p className="small fw-bold text-secondary text-uppercase px-2 mb-2">Nouveau message</p>
                                    {newContacts.map((contact) => (
                                        <ContactLink
                                            key={contact.id}
                                            user={contact}
                                            active={selectedUser?.id === contact.id}
                                            meta={contact.email}
                                        />
                                    ))}
                                </div>
                            )}

                            {conversations.length === 0 && newContacts.length === 0 && (
                                <div className="messagerie-empty">
                                    <MessageSquare size={34} />
                                    <p>Aucun contact disponible.</p>
                                </div>
                            )}
                        </div>
                    </aside>

                    <section className="messagerie-conversation">
                        {selectedUser ? (
                            <>
                                <div className="messagerie-conversation-header d-flex align-items-center gap-3">
                                    <Avatar user={selectedUser} />
                                    <div>
                                        <h2 className="h6 fw-bold mb-1">{selectedUser.name}</h2>
                                        <p className="small text-secondary text-capitalize mb-0">{selectedUser.role}</p>
                                    </div>
                                </div>

                                <div className="messagerie-messages">
                                    {messages.length > 0 ? (
                                        messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`messagerie-bulle ${message.mine ? 'is-mine' : ''}`}
                                            >
                                                <p>{message.contenu}</p>
                                                <small>{formatTime(message.envoyeLe)}</small>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="messagerie-empty">
                                            <MessageSquare size={34} />
                                            <p>Aucun message pour le moment.</p>
                                        </div>
                                    )}
                                </div>

                                <form onSubmit={submit} className="messagerie-form">
                                    {flash.success && (
                                        <div className="alert alert-success py-2 small mb-3">
                                            {flash.success}
                                        </div>
                                    )}
                                    <div className="d-flex gap-2">
                                        <textarea
                                            value={data.contenu}
                                            onChange={(event) => setData('contenu', event.target.value)}
                                            rows="2"
                                            className="form-control"
                                            placeholder="Ecrire un message..."
                                        />
                                        <button
                                            type="submit"
                                            disabled={processing || !data.contenu.trim()}
                                            className="btn btn-info text-dark fw-bold px-3"
                                            title="Envoyer"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                    {errors.contenu && <p className="text-danger small mt-2 mb-0">{errors.contenu}</p>}
                                    {errors.receiver_id && <p className="text-danger small mt-2 mb-0">{errors.receiver_id}</p>}
                                </form>
                            </>
                        ) : (
                            <div className="messagerie-empty">
                                <MessageSquare size={42} />
                                <p>Choisissez une conversation pour commencer.</p>
                            </div>
                        )}
                    </section>
                </div>
            </section>
        </>
    );

    if (auth.user.role === 'provider') {
        return <ProviderLayout>{content}</ProviderLayout>;
    }

    if (auth.user.role === 'admin') {
        return <AdminLayout auth={auth} title="Messagerie">{content}</AdminLayout>;
    }

    return <AuthenticatedLayout auth={auth}>{content}</AuthenticatedLayout>;
}

function ContactLink({ user, active, meta, badge = 0 }) {
    return (
        <Link
            href={route('messages.index', user.id)}
            className={`messagerie-contact ${active ? 'is-active' : ''}`}
        >
            <Avatar user={user} />
            <div className="messagerie-contact-text">
                <div className="d-flex align-items-center justify-content-between gap-2">
                    <strong>{user.name}</strong>
                    {badge > 0 && (
                        <span className="badge rounded-pill bg-danger text-white">
                            {badge}
                        </span>
                    )}
                </div>
                {meta && <span>{meta}</span>}
            </div>
        </Link>
    );
}

function Avatar({ user }) {
    const url = avatarUrl(user);

    return (
        <div className="messagerie-avatar">
            {url ? (
                <img src={url} alt={user.name} />
            ) : (
                <UserRound size={20} />
            )}
        </div>
    );
}
