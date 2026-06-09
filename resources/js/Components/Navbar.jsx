import React from 'react';

export default function Navbar({ user, toggleDarkMode, isDarkMode, toggleSidebar }) {
    const navbarStyle = {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        padding: '10px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
        boxSizing: 'border-box'
    };

    return (
        <nav style={navbarStyle} className="navbar-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--brand-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                    B
                </div>
                <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--brand-blue)', letterSpacing: '-0.5px' }}>
                    Booking System
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Dark Mode Toggle */}
                <button 
                    onClick={toggleDarkMode}
                    style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>

                {/* User Avatar - mn l-Utilisateur f l-diagramme [cite: 1] */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img 
                        src={user?.photoProfile ? `/storage/${user.photoProfile}` : '/avatar.png'} 
                        alt="Profile"
                        style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid var(--brand-teal)' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>▼</span>
                </div>

                <button 
                    onClick={toggleSidebar}
                    style={{ 
                        background: 'var(--bg-card)', 
                        border: '1px solid var(--input-border)',
                        padding: '8px', 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}
                >
                    <span style={{ width: '18px', height: '2px', background: 'var(--brand-blue)', borderRadius: '2px' }}></span>
                    <span style={{ width: '18px', height: '2px', background: 'var(--brand-blue)', borderRadius: '2px' }}></span>
                    <span style={{ width: '18px', height: '2px', background: 'var(--brand-blue)', borderRadius: '2px' }}></span>
                </button>
            </div>
        </nav>
    );
}