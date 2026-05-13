import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ isOpen, onClose }) {
    if (!isOpen) return null;

    const sidebarStyle = {
        position: 'fixed', right: 0, top: 0, width: '320px', height: '100%',
        background: 'var(--glass-bg)', backdropFilter: 'blur(15px)',
        zIndex: 100, padding: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        direction: 'rtl'
    };

    return (
        <div style={sidebarStyle}>
            <button onClick={onClose} style={{ float: 'left', background: 'none', border: 'none' }}>إغلاق ✕</button>
            <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="menu-item active" style={{ background: 'var(--brand-gradient)', color: '#white', padding: '15px', borderRadius: '15px' }}>
                    📅 حجوزاتي
                </div>
                <div style={{ padding: '15px' }}>👤 الملف الشخصي</div>
                <div style={{ padding: '15px' }}>⚙️ الإعدادات</div>
                <hr style={{ border: '0.5px solid #eee' }} />
                <Link method="post" href="/logout" style={{ color: 'red', textDecoration: 'none', padding: '15px' }}>🚪 تسجيل الخروج</Link>
            </div>
        </div>
    );
}