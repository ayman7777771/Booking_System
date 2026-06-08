import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    User, 
    MessageSquare, 
    Settings 
} from 'lucide-react';

export default function Sidebar({ isOpen = true }) {
    const { props, url } = usePage();
    const { auth } = props;
    const providerId = auth?.user?.provider?.id;
    const providerProfileHref = providerId ? `/provider/profile/${providerId}` : '/provider/Dashboard';

    if (auth?.user?.role !== 'provider') {
        return null;
    }

    const isActive = (path) => url.startsWith(path) ? 'active-link bg-info text-dark fw-bold' : 'text-secondary hover-link';

    return (
        <aside className={`provider-sidebar border-end p-3 d-flex flex-column ${isOpen ? '' : 'is-collapsed'}`}>
            <div className="px-3 mb-4 mt-2">
                <span className="text-muted text-uppercase fs-7 tracking-wider fw-semibold">Espace Prestataire</span>
            </div>

            <ul className="nav nav-pills flex-column mb-auto gap-1">
                <li className="nav-item">
                    <Link href="/provider/Dashboard" className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 transition-all ${isActive('/provider/Dashboard')}`}>
                        <LayoutDashboard size={18} />
                        <span>Tableau de bord</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link href={providerProfileHref} className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 transition-all ${isActive('/provider/profile')}`}>
                        <User size={18} />
                        <span>Mon Profil</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link href="/reviews" className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 transition-all ${isActive('/reviews')}`}>
                        <MessageSquare size={18} />
                        <span>Avis clients</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link href="/messages" className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 transition-all ${isActive('/messages')}`}>
                        <MessageSquare size={18} />
                        <span>Messages</span>
                    </Link>
                </li>

            </ul>

            <div className="border-top border-secondary pt-3 mt-3">
                <Link href="/settings" className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 transition-all ${isActive('/settings')}`}>
                    <Settings size={18} />
                    <span>Paramètres</span>
                </Link>
            </div>

        </aside>
    );
}
