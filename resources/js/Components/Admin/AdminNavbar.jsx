import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Bell, Menu, Sun, Moon, LogOut } from 'lucide-react';

export default function AdminNavbar({ onToggleSidebar, darkMode, onToggleTheme, theme }) {
    const { auth } = usePage().props;

    return (
        <nav style={{ 
            height: '70px', 
            backgroundColor: theme.cardBg, 
            borderBottom: `1px solid ${theme.border}`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0 30px', 
            transition: 'all 0.3s' 
        }}>
            {/* L-Iṣar: Toggle Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={onToggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted }}>
                    <Menu size={20} />
                </button>
                <span style={{ color: theme.textMuted, fontSize: '14px', fontWeight: '500' }}>Workspace / Admin Dashboard</span>
            </div>

            {/* L-Yimen: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                
                {/* 🌗 Bouton dyal l-Lil u n-Nhar */}
                <button onClick={onToggleTheme} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: darkMode ? '#334155' : '#e2e8f0', transition: 'background 0.2s'
                }}>
                    {darkMode ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#475569" />}
                </button>

                {/* Notifications */}
                <div style={{ position: 'relative', cursor: 'pointer', color: theme.textMain }}>
                    <Bell size={20} />
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '50%' }}>3</span>
                </div>

                <hr style={{ height: '24px', borderLeft: `1px solid ${theme.border}`, margin: '0 5px' }} />

                {/* Avatar Admin */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#38bdf8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textMain }} className="d-none d-sm-inline">{auth.user.name}</span>
                </div>
            </div>
        </nav>
    );
}