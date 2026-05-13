import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';

export default function AuthenticatedLayout({ auth, children }) {
    // 1. Nidam l-layli (Dark Mode) - k-i-tḥakkem f l-class 'dark' f l-HTML
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
            backgroundColor: 'var(--bg-page)', 
            transition: 'background-color 0.3s ease' 
        }}>
            {/* Navbar: k-i-akhod l-user mn auth w l-functions dyal dark/sidebar  */}
            <Navbar 
                user={auth.user} 
                toggleDarkMode={toggleDarkMode} 
                isDarkMode={isDarkMode} 
                toggleSidebar={toggleSidebar}
            />

            <div style={{ display: 'flex', position: 'relative' }}>
                {/* Sidebar: k-i-ban fach k-t-cliqui 3la l-menu burger  */}
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                />

                {/* Main Content: fin k-it-render 'Discover.jsx' */}
                <main style={{ 
                    flex: 1, 
                    padding: '20px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {children}
                </main>
            </div>
            
            {/* Style l-khalfia l-ghadi iban f l-clipping (kima f s-sora) */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 45
                    }}
                />
            )}
        </div>
    );
}