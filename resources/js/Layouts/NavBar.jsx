import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bell, LayoutDashboard, LogOut, Menu, User } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Navbar({
    canToggleSidebar = false,
    onToggleSidebar,
    isSidebarOpen = false,
}) {
    const { auth } = usePage().props;
    const authUser = auth?.user;

    const providerId = authUser?.provider?.id;
    const userName = authUser?.name || 'User';

    const profileHref = providerId
        ? `/provider/profile/${providerId}`
        : '/profile';

    const dashboardHref =
        authUser?.role === 'provider'
            ? '/provider/Dashboard'
            : authUser?.role === 'admin'
                ? '/admin'
                : '/dashboard';

    const photoPath = authUser?.photoProfile;

    const photoprofile = photoPath
        ? (photoPath.startsWith('http')
            ? photoPath
            : `/storage/${photoPath}`)
        : null;

    return (
        <nav className="navbar navbar-expand-lg app-navbar border-bottom px-4 py-2 sticky-top shadow-sm">
            <div className="container-fluid p-0">

                {canToggleSidebar && (
                    <button
                        className={`provider-sidebar-toggle ${isSidebarOpen ? 'is-open' : ''} me-3`}
                        type="button"
                        onClick={onToggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={18} />
                    </button>
                )}

                <Link
                    className="navbar-brand d-flex align-items-center gap-2 fw-bold text-info"
                    href={authUser ? dashboardHref : '/'}
                >
                    <ApplicationLogo className="mx-1" />
                    <span>Booking System</span>
                </Link>

                <button
                    className="navbar-toggler border-0 text-secondary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <Menu size={20} />
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-3">

                        <li className="nav-item">
                            <ThemeToggle />
                        </li>

                        {authUser && (
                            <li className="nav-item position-relative">
                                <button className="btn btn-link text-secondary p-1 hover-text-white position-relative">
                                    <Bell size={20} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1">
                                        <span className="visually-hidden"></span>
                                    </span>
                                </button>
                            </li>
                        )}

                        {authUser && (
                            <div
                                className="vr d-none d-lg-block bg-secondary my-2"
                                style={{ height: '24px' }}
                            />
                        )}

                        {authUser ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center gap-2 fw-semibold"
                                    href="#"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {photoprofile ? (
                                        <img
                                            src={photoprofile}
                                            alt="User Avatar"
                                            className="rounded-circle border border-secondary"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <span
                                            className="rounded-circle border border-secondary d-inline-flex align-items-center justify-content-center bg-secondary text-white"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                            }}
                                        >
                                            {userName.slice(0, 2)}
                                        </span>
                                    )}

                                    <span className="d-none d-sm-inline small navbar-user-name">
                                        {userName}
                                    </span>
                                </a>

                                <ul
                                    className="dropdown-menu dropdown-menu-end dropdown-menu-dark border-secondary shadow-lg mt-2"
                                    aria-labelledby="userDropdown"
                                >
                                    <li>
                                        <Link
                                            className="dropdown-menu-item dropdown-item d-flex align-items-center gap-2 py-2 small"
                                            href={profileHref}
                                        >
                                            <User size={14} className="text-info" />
                                            Mon Profil
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-menu-item dropdown-item d-flex align-items-center gap-2 py-2 small"
                                            href={dashboardHref}
                                        >
                                            <LayoutDashboard
                                                size={14}
                                                className="text-success"
                                            />
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider border-secondary" />
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger small"
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'none',
                                                border: 'none',
                                            }}
                                        >
                                            <LogOut size={14} />
                                            Deconnexion
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item d-flex align-items-center gap-2">
                                <Link
                                    className="btn btn-outline-info btn-sm"
                                    href="/login"
                                >
                                    Connexion
                                </Link>

                                <Link
                                    className="btn btn-info btn-sm text-dark fw-semibold"
                                    href="/register"
                                >
                                    Inscription
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}