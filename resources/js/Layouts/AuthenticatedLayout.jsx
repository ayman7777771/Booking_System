import React, { useEffect, useState } from 'react';
import NavBar from '@/Layouts/NavBar';
import ClientSidebar from '@/Layouts/ClientSidebar';

const prefersDarkTheme = () => {
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme') === 'dark';
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
};

export default function AuthenticatedLayout({ auth, children }) {
    const [isDarkMode, setIsDarkMode] = useState(prefersDarkTheme);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isClient = Boolean(auth?.user) && auth.user.role !== 'provider';

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';

        document.documentElement.classList.toggle('dark', isDarkMode);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDarkMode]);

    useEffect(() => {
        const syncTheme = (event) => {
            if (typeof event.detail?.isDark === 'boolean') {
                setIsDarkMode(event.detail.isDark);

                return;
            }

            setIsDarkMode(localStorage.getItem('theme') === 'dark');
        };

        const syncStoredTheme = () => setIsDarkMode(prefersDarkTheme());

        window.addEventListener('theme-change', syncTheme);
        window.addEventListener('storage', syncStoredTheme);

        return () => {
            window.removeEventListener('theme-change', syncTheme);
            window.removeEventListener('storage', syncStoredTheme);
        };
    }, []);

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="client-shell">
            <NavBar
                auth={auth}
                canToggleSidebar={isClient}
                onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
                isSidebarOpen={isSidebarOpen}
            />

            <main className="client-main">
                {children}
            </main>

            {isClient && (
                <ClientSidebar
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                    isDarkMode={isDarkMode}
                />
            )}

            {isSidebarOpen && (
                <button
                    type="button"
                    className="client-sidebar-backdrop"
                    onClick={closeSidebar}
                    aria-label="Fermer le menu"
                />
            )}
        </div>
    );
}
