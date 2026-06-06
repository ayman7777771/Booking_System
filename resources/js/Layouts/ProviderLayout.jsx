import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from './NavBar';
import Sidebar from './ProvSideBar';

export default function ProviderLayout({ header, children, footer }) {
    const { auth } = usePage().props;
    const shouldShowProviderSidebar = auth?.user?.role === 'provider';
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="provider-layout">
            <Navbar
                canToggleSidebar={shouldShowProviderSidebar}
                onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
            />
            <div className="provider-layout-body d-flex align-items-stretch">
                {shouldShowProviderSidebar && <Sidebar isOpen={isSidebarOpen} />}
                <div className="provider-main flex-grow-1">
                    {header && (
                        <header className="page-header">
                            {header}
                        </header>
                    )}
                    <main className="content">
                        {children}
                    </main>
                    {footer && (
                        <footer className="footer">
                            {footer}
                        </footer>
                    )}
                </div>
            </div>
        </div>
    );
}
