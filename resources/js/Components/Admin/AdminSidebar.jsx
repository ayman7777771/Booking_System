import React from 'react';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminSidebar({ isOpen, auth }) {
    // S-style dyal Sidebar dima dark dynamicment bhal dyal l-provider
    const sidebarBg = '#1f2937'; 

    return (
        <aside style={{ 
            width: isOpen ? '260px' : '0px', 
            overflow: 'hidden',
            backgroundColor: sidebarBg, 
            color: '#fff', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: isOpen ? '20px' : '0px',
            transition: 'all 0.3s ease'
        }}>
            {/* Logo dyal l-Projet */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', marginBottom: '20px', whiteSpace: 'nowrap' }}>
                <ApplicationLogo style={{ width: '45px', height: 'auto', fill: '#fff' }} />
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#38bdf8' }}>Booking System</span>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #374151', marginBottom: '20px' }} />

            {/* Links Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, whiteSpace: 'nowrap' }}>
                <Link href={route('admin.dashboard')} style={route().current('admin.dashboard') ? activeLinkStyle : linkStyle}>
                    <LayoutDashboard size={18} /> Dashboard Global
                </Link>
                <Link href={route('admin.users.index')} style={route().current('admin.users.*') ? activeLinkStyle : linkStyle}>
                    <Users size={18} /> Gestion Utilisateurs
                </Link>
                <Link href="#" style={linkStyle}>
                    <Settings size={18} /> Configuration l-Site
                </Link>
            </nav>

            {/* Footer Sidebar */}
            <div style={{ borderTop: '1px solid #374151', paddingTop: '15px', whiteSpace: 'nowrap' }}>
                <div style={{ marginBottom: '10px' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{auth.user.name}</p>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>Administrateur</span>
                </div>
                <Link href={route('logout')} method="post" as="button" style={logoutBtnStyle}>
                    <LogOut size={14} /> Déconnexion
                </Link>
            </div>
        </aside>
    );
}

// Inline Styles Clean
const linkStyle = { color: '#9ca3af', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' };
const activeLinkStyle = { ...linkStyle, backgroundColor: '#38bdf8', color: '#fff', fontWeight: '600' };
const logoutBtnStyle = { width: '100%', padding: '10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' };
