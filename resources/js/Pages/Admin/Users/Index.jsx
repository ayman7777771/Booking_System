import React from 'react';
import { router } from '@inertiajs/react';
import { Power, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, users }) {
    const handleDeleteUser = (id) => {
        if (confirm('Wach tya9en bghiti t-supprimer had l-utilisateur?')) {
            router.delete(route('admin.users.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const handleToggleStatus = (id) => {
        router.patch(route('admin.users.status', id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout auth={auth} title="Gestion Utilisateurs">
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Gestion des Utilisateurs</h2>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                    Controle les comptes client et prestataire, bloque les comptes problematiques, ou supprime-les.
                </p>
            </div>

            <div style={tableContainerStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={thStyle}>Utilisateur</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Role</th>
                            <th style={thStyle}>Statut</th>
                            <th style={thStyle}>Date d'inscription</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} style={tableRowStyle}>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={avatarContainerStyle}>
                                                {user.photoProfile ? (
                                                    <img
                                                        src={user.photoProfile.startsWith('http') ? user.photoProfile : `/storage/${user.photoProfile}`}
                                                        alt={user.name}
                                                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    user.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <span style={{ fontWeight: '600' }}>{user.name}</span>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>{user.email}</td>
                                    <td style={tdStyle}>
                                        <span style={roleBadgeStyle(user.role)}>
                                            {roleLabel(user.role)}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={statusBadgeStyle(user.statut)}>
                                            {user.statut ? 'Actif' : 'Bloque'}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>{new Date(user.created_at).toLocaleDateString('fr-FR')}</td>
                                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                                        {user.role !== 'admin' ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    style={statusBtnStyle(user.statut)}
                                                    title={user.statut ? 'Bloquer utilisateur' : 'Activer utilisateur'}
                                                >
                                                    <Power size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    style={deleteBtnStyle}
                                                    title="Supprimer utilisateur"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>Protege</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ ...tdStyle, textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                    Aucun utilisateur trouve.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

const roleLabel = (role) => {
    if (role === 'admin') {
        return 'Administrateur';
    }

    return role === 'provider' ? 'Prestataire' : 'Client';
};

const tableContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '8px',
    border: '1px solid rgba(128, 128, 128, 0.1)',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
};

const tableHeaderRowStyle = {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderBottom: '1px solid rgba(128, 128, 128, 0.1)',
};

const thStyle = { padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: '#38bdf8' };
const tdStyle = { padding: '16px 20px', fontSize: '14px', borderBottom: '1px solid rgba(128, 128, 128, 0.05)' };
const tableRowStyle = { transition: 'background 0.2s' };

const avatarContainerStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#38bdf8',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
};

const roleBadgeStyle = (role) => {
    const isAdmin = role === 'admin';
    const isProvider = role === 'provider';

    return {
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: isAdmin ? 'rgba(239, 68, 68, 0.1)' : isProvider ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        color: isAdmin ? '#ef4444' : isProvider ? '#10b981' : '#3b82f6',
    };
};

const statusBadgeStyle = (isActive) => ({
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
    color: isActive ? '#10b981' : '#ef4444',
});

const statusBtnStyle = (isActive) => ({
    padding: '8px',
    backgroundColor: isActive ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
    color: isActive ? '#f59e0b' : '#10b981',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
});

const deleteBtnStyle = {
    padding: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
};
