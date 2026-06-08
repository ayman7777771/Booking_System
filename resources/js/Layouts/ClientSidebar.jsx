import { Link, usePage } from '@inertiajs/react';
import {
    CalendarDays,
    CircleHelp,
    Grid2X2,
    LogOut,
    Mail,
    Settings,
    User,
    Users,
    X,
} from 'lucide-react';
import ThemeToggle from '@/Components/ThemeToggle';

const userPhoto = (user) => {
    if (!user?.photoProfile) {
        return null;
    }

    return user.photoProfile.startsWith('http')
        ? user.photoProfile
        : `/storage/${user.photoProfile}`;
};

export default function ClientSidebar({ isOpen = true, onClose }) {
    const { props, url } = usePage();
    const { auth } = props;

    if (!auth?.user || auth.user.role === 'provider') {
        return null;
    }

    const isAdmin = auth.user.role === 'admin';
    const menuItems = isAdmin ? [
        { label: 'Dashboard', href: '/admin', icon: Grid2X2 },
        { label: 'Utilisateurs', href: '/admin/users', icon: Users },
        { label: 'Messages', href: '/messages', icon: Mail, badge: true },
        { label: 'Support', href: '/messages', icon: CircleHelp },
        { label: 'Profil', href: '/profile', icon: Settings },
    ] : [
        { label: 'Dashboard', href: '/dashboard', icon: Grid2X2 },
        { label: 'Mes reservations', href: '/bookings', icon: CalendarDays },
        { label: 'Mon profil', href: '/profile', icon: User },
        { label: 'Messages', href: '/messages', icon: Mail, badge: true },
        { label: 'Parametres', href: '/profile', icon: Settings },
        { label: 'Support', href: '/messages', icon: CircleHelp },
    ];

    const photo = userPhoto(auth.user);
    const initials = auth.user.name?.slice(0, 2).toUpperCase() || 'U';

    const isActive = (href) => {
        if (href === '/admin') {
            return url === '/admin';
        }

        if (href === '/dashboard') {
            return url === '/dashboard';
        }

        return url.startsWith(href);
    };

    return (
        <aside className={`client-sidebar ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
            <div className="client-sidebar-glow" />

            <button type="button" className="client-sidebar-close" onClick={onClose} aria-label="Fermer">
                <X size={18} />
                <span>Fermer</span>
            </button>

            <div className="client-sidebar-user">
                <div className="client-sidebar-avatar">
                    {photo ? (
                        <img src={photo} alt={auth.user.name} />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>
                <div className="client-sidebar-user-text">
                    <p>{auth.user.name}</p>
                    <span>{isAdmin ? 'Administrateur' : 'Client'}</span>
                </div>
            </div>

            <div className="client-sidebar-theme">
                <span>Theme</span>
                <ThemeToggle />
            </div>

            <nav className="client-sidebar-nav" aria-label={isAdmin ? 'Navigation admin' : 'Navigation client'}>
                {menuItems.map((item) => (
                    <Link
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        className={`client-sidebar-link ${isActive(item.href) ? 'is-active' : ''}`}
                        onClick={onClose}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                        {item.badge && <span className="client-sidebar-badge" />}
                    </Link>
                ))}
            </nav>

            <div className="client-sidebar-preview">
                <div className="client-sidebar-preview-row" />
                <div>
                    <p>{isAdmin ? 'Booking System' : 'Services disponibles'}</p>
                    <span>{isAdmin ? 'Dashboard & stats' : 'Reservation rapide'}</span>
                </div>
            </div>

            <Link href={route('logout')} method="post" as="button" className="client-sidebar-logout">
                <LogOut size={18} />
                <span>Deconnexion</span>
            </Link>
        </aside>
    );
}
