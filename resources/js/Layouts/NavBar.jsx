import { Link, usePage } from '@inertiajs/react';
import { Bell, LogOut, Menu, Search, User } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';

export default function NavBar({ auth, isDarkMode, toggleDarkMode, toggleSidebar }) {
    const { user } = auth;
    const avatarPath = user?.photoProfile;
    const avatarSrc = avatarPath && !avatarPath.startsWith('http') ? `/storage/${avatarPath}` : null;

    const bgColor = isDarkMode ? '#1e293b' : '#ffffff';
    const textColor = isDarkMode ? '#f8fafc' : '#1e293b';
    const borderColor = isDarkMode ? '#334155' : '#e2e8f0';

    return (
        <nav style={{
            backgroundColor: bgColor,
            borderBottom: `1px solid ${borderColor}`,
            padding: '15px 25px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease'
        }}>
            {/* Left Side - Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <ApplicationLogo />
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BCD4' }}>
                    Booking System
                </span>
            </Link>

            {/* Center - Search (Desktop) */}
            <div style={{
                flex: 1,
                maxWidth: '300px',
                position: 'relative',
                marginX: '30px'
            }}>
                <Search size={16} style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                }} />
                <input
                    type="text"
                    placeholder="ابحث..."
                    style={{
                        width: '100%',
                        padding: '10px 15px 10px 40px',
                        borderRadius: '20px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
                        color: textColor,
                        fontSize: '14px'
                    }}
                />
            </div>

            {/* Right Side - Actions */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                {/* Theme Toggle */}
                <button
                    onClick={toggleDarkMode}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: '5px'
                    }}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>

                {/* Notifications */}
                {user && (
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <Bell size={20} style={{ color: textColor }} />
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#ef4444',
                            borderRadius: '50%'
                        }} />
                    </div>
                )}

                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* User Avatar & Name */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {avatarSrc ? (
                                <img
                                    src={avatarSrc}
                                    alt="Avatar"
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: `2px solid #00BCD4`
                                    }}
                                />
                            ) : (
                                <User size={20} style={{ color: textColor }} />
                            )}
                        </div>

                        {/* Logout */}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '5px'
                            }}
                        >
                            <LogOut size={20} style={{ color: '#ef4444' }} />
                        </Link>

                        {/* Menu Toggle (Mobile) */}
                        <button
                            onClick={toggleSidebar}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '5px'
                            }}
                        >
                            <Menu size={20} style={{ color: textColor }} />
                        </button>
                    </div>
                ) : (
                    <Link href={route('login')} style={{
                        padding: '8px 16px',
                        backgroundColor: '#00BCD4',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        دخول
                    </Link>
                )}
            </div>
        </nav>
    );
}
