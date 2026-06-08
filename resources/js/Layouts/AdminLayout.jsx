import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import NavBar from '@/Layouts/NavBar';

export default function AdminLayout({ auth, children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('admin-theme');
        return savedMode ? savedMode === 'dark' : true; 
    });

    const toggleTheme = () => setDarkMode(!darkMode);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        localStorage.setItem('admin-theme', darkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', darkMode);
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const syncTheme = (event) => {
            if (typeof event.detail?.isDark === 'boolean') {
                setDarkMode(event.detail.isDark);
            }
        };

        window.addEventListener('theme-change', syncTheme);

        return () => window.removeEventListener('theme-change', syncTheme);
    }, []);

    const theme = {
        bg: darkMode ? '#0f172a' : '#f1f5f9',
        cardBg: darkMode ? '#1e293b' : '#ffffff',
        textMain: darkMode ? '#f8fafc' : '#334155',
        textMuted: darkMode ? '#94a3b8' : '#64748b',
        border: darkMode ? '#334155' : '#e2e8f0',
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: theme.bg, transition: 'all 0.3s ease' }}>
            <Head title={title} />

            <AdminSidebar isOpen={sidebarOpen} auth={auth} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                <NavBar
                    canToggleSidebar
                    onToggleSidebar={toggleSidebar}
                    isSidebarOpen={sidebarOpen}
                />

                <main style={{ flex: 1, overflowY: 'auto', padding: '30px', color: theme.textMain }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
