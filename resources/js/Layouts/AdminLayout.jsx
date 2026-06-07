import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import AdminNavbar from '@/Components/Admin/AdminNavbar';

export default function AdminLayout({ auth, children, title }) {
    // 1. State dyal Sidebar (T-ftaḥ u t-sedd)
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // 2. State dyal l-Theme (Dark / Light Mode)
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('admin-theme');
        return savedMode ? savedMode === 'dark' : true; // Default Dark kima l-provider
    });

    // Toggle dyal Theme
    const toggleTheme = () => setDarkMode(!darkMode);
    // Toggle dyal Sidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        localStorage.setItem('admin-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Configuration dyal l-Alwan dynamicment 3la hsab Theme
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

            {/* 🛠️ l-Sidebar (kiy-akhud state dyal open/close u auth) */}
            <AdminSidebar isOpen={sidebarOpen} auth={auth} />

            {/* Right Side Content (Navbar + Main Component) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                {/* 👑 l-Navbar (kat-akhud dynamicment les fonctions d toggle u theme) */}
                <AdminNavbar 
                    onToggleSidebar={toggleSidebar} 
                    darkMode={darkMode} 
                    onToggleTheme={toggleTheme} 
                    theme={theme} 
                />

                {/* 📦 l-Wajha fin ghadi i-bqa i-dar children dyal ga3 les pages */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '30px', color: theme.textMain }}>
                    {children}
                </main>
            </div>
        </div>
    );
}