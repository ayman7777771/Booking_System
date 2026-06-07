import { Link, usePage } from '@inertiajs/react';
import { 
    Home, 
    Calendar, 
    User, 
    MessageSquare, 
    LogOut
} from 'lucide-react';

export default function ClientSidebar({ isOpen = true, onClose, isDarkMode = false }) {
    const { props, url } = usePage();
    const { auth } = props;

    if (!auth?.user || auth?.user?.role === 'provider') {
        return null;
    }

    const isActive = (path) => url.startsWith(path) ? 'active' : '';

    const bgColor = isDarkMode ? '#1e293b' : '#ffffff';
    const textColor = isDarkMode ? '#f8fafc' : '#1e293b';
    const mutedColor = isDarkMode ? '#94a3b8' : '#64748b';
    const hoverBg = isDarkMode ? '#334155' : '#f1f5f9';
    const activeBg = 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)';

    const menuItems = [
        { label: 'الرئيسية', href: '/', icon: Home },
        { label: 'حجوزاتي', href: '/bookings', icon: Calendar },
        { label: 'ملفي الشخصي', href: '/profile', icon: User },
        { label: 'الرسائل', href: '/messages', icon: MessageSquare },
    ];

    return (
        <>
            {/* Sidebar */}
            <aside style={{
                position: 'fixed',
                right: 0,
                top: 0,
                width: '280px',
                height: '100vh',
                backgroundColor: bgColor,
                borderLeft: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                padding: '20px',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease',
                zIndex: 999,
                overflowY: 'auto',
                direction: 'rtl'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    paddingBottom: '15px',
                    borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
                }}>
                    <h3 style={{ margin: 0, color: textColor, fontSize: '18px', fontWeight: 'bold' }}>
                        القائمة
                    </h3>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: mutedColor,
                            padding: '5px'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Menu Items */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 15px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: isActive(item.href) ? '#ffffff' : textColor,
                                background: isActive(item.href) ? activeBg : 'transparent',
                                transition: 'all 0.3s ease',
                                fontSize: '14px',
                                fontWeight: isActive(item.href) ? '600' : '500',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive(item.href)) {
                                    e.currentTarget.style.backgroundColor = hoverBg;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(item.href)) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Info */}
                <div style={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '15px',
                    textAlign: 'center',
                    borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    marginTop: '30px'
                }}>
                    <p style={{ 
                        margin: '0 0 10px 0',
                        color: textColor, 
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        {auth.user.name}
                    </p>
                    <p style={{ 
                        margin: 0,
                        color: mutedColor, 
                        fontSize: '12px'
                    }}>
                        {auth.user.email}
                    </p>
                </div>

                {/* Logout */}
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '12px',
                        borderRadius: '10px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
                >
                    <LogOut size={18} />
                    تسجيل الخروج
                </Link>
            </aside>
        </>
    );
}
