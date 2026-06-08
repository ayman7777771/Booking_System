import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Users, Wrench, Briefcase, Calendar } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AdminLayout auth={auth} title="Admin Dashboard">
            {/* Titre Dynamic */}
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Tableau de Bord Global</h2>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Mraḥba bik a khoya Amine. Hna iḥṣāʾiyāt l-khedma kamla.</p>
            </div>

            {/* Grid dynamicment fih ga3 les stats d l-base de données */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                
                <div style={cardStyle('#3b82f6')}>
                    <div style={cardHeaderStyle}>
                        <span>TOTAL CLIENTS</span>
                        <Users size={20} />
                    </div>
                    <p style={numberStyle}>{stats?.total_clients || 0}</p>
                </div>

                <div style={cardStyle('#10b981')}>
                    <div style={cardHeaderStyle}>
                        <span>PRESTATAIRES</span>
                        <Wrench size={20} />
                    </div>
                    <p style={numberStyle}>{stats?.total_providers || 0}</p>
                </div>

                <div style={cardStyle('#06b6d4')}>
                    <div style={cardHeaderStyle}>
                        <span>SERVICES EN LIGNE</span>
                        <Briefcase size={20} />
                    </div>
                    <p style={numberStyle}>{stats?.total_services || 0}</p>
                </div>

                <div style={cardStyle('#f59e0b')}>
                    <div style={cardHeaderStyle}>
                        <span>RÉSERVATIONS</span>
                        <Calendar size={20} />
                    </div>
                    <p style={numberStyle}>{stats?.total_bookings || 0}</p>
                </div>

            </div>
        </AdminLayout>
    );
}

// Quick Styles dynamic d les cards bach i-bdlo s-style m3a dynamic structure
const cardStyle = (color) => ({
    border: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    borderLeft: `6px solid ${color}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '130px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)'
});

const cardHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 'bold' };
const numberStyle = { fontSize: '32px', fontWeight: '700', margin: 0 };
