import React, { useState, useEffect } from 'react';
import NavBar from '@/Layouts/NavBar';
import ClientSidebar from '@/Layouts/ClientSidebar';

export default function AuthenticatedLayout({ auth, children }) {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', 
            transition: 'background-color 0.3s ease'
        }}>
            {/* Navbar */}
            <NavBar 
                auth={auth}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                toggleSidebar={toggleSidebar}
            />

            <div style={{ display: 'flex', position: 'relative' }}>
                {/* Sidebar للـ Client */}
                <ClientSidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)}
                    isDarkMode={isDarkMode}
                />

                {/* Main Content */}
                <main style={{ 
                    flex: 1, 
                    padding: '30px 20px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {children}
                </main>
            </div>
            
            {/* Backdrop عند فتح Sidebar */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 45
                    }}
                />
            )}
        </div>
    );
}
