import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { Trash2, UserCheck, ShieldAlert } from 'lucide-react';

export default function Index({ auth, users }) {
    
    // Fonction bach n-suppriméw un utilisateur dynamicment b Inertia
    const handleDeleteUser = (id) => {
        if (confirm('Wach tya9en bghiti t-supprimer had l-utilisateur?')) {
            router.delete(route('admin.users.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout auth={auth} title="Gestion Utilisateurs">
            
            {/* Titre dyal l-Page */}
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Gestion des Utilisateurs</h2>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                    Hna t-qder t-chouf ga3 les comptes dyal l-site, t-muraqib l-roles dyalhoum, u t-suppriméhom ila dāru chi khala7.
                </p>
            </div>

            {/* Tableau Iḥtirafy responsive */}
            <div style={tableContainerStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={thStyle}>Utilisateur</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Rôle</th>
                            <th style={thStyle}>Date d'inscription</th>
                            <th style={thStyle} style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} style={tableRowStyle}>
                                    {/* 1. Photo + Smiya */}
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={avatarContainerStyle(user.name)}>
                                                {user.photoProfile ? (
                                                    <img 
                                                        src={user.photoProfile.startsWith('http') ? user.photoProfile : `/storage/${user.photoProfile}`} 
                                                        alt="avatar" 
                                                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    user.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <span style={{ fontWeight: '600' }}>{user.name}</span>
                                        </div>
                                    </td>

                                    {/* 2. Email */}
                                    <td style={tdStyle}>{user.email}</td>

                                    {/* 3. Role (Badge Dynamic) */}
                                    <td style={tdStyle}>
                                        <span style={roleBadgeStyle(user.role)}>
                                            {user.role === 'admin' ? 'Administrateur' : user.role === 'provider' ? 'Prestataire' : 'Client'}
                                        </span>
                                    </td>

                                    {/* 4. Date d'inscription */}
                                    <td style={tdStyle}>
                                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </td>

                                    {/* 5. Actions */}
                                    <td style={tdStyle} style={{ textAlign: 'center' }}>
                                        {user.role !== 'admin' ? (
                                            <button 
                                                onClick={() => handleDeleteUser(user.id)} 
                                                style={deleteBtnStyle}
                                                title="Supprimer l'utilisateur"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>Protégé</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ ...tdStyle, textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                    Ma kine ḥta utilisateur f l-base de données.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

// --- CSS IN JS STYLES FOR SCANNABILITY ---
const tableContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '16px',
    border: '1px solid rgba(128, 128, 128, 0.1)',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
};

const tableHeaderRowStyle = {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderBottom: '1px solid rgba(128, 128, 128, 0.1)'
};

const thStyle = { padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: '#38bdf8' };
const tdStyle = { padding: '16px 20px', fontSize: '14px', borderBottom: '1px solid rgba(128, 128, 128, 0.05)' };
const tableRowStyle = { transition: 'background 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.01)' } };

const avatarContainerStyle = (name) => ({
    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#38bdf8', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'
});

const roleBadgeStyle = (role) => {
    const isAdmin = role === 'admin';
    const isProvider = role === 'provider';
    return {
        padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
        backgroundColor: isAdmin ? 'rgba(239, 68, 68, 0.1)' : isProvider ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        color: isAdmin ? '#ef4444' : isProvider ? '#10b981' : '#3b82f6',
    };
};

const deleteBtnStyle = {
    padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none',
    borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
};