import React from 'react';
import { Link } from '@inertiajs/react';
import { Star, MapPin, Eye } from 'lucide-react';

export default function ProviderCard({ provider }) {
    const mainImg = provider?.main_photo ? `/storage/${provider.main_photo}` : '/images/default-service.jpg';
    const profileImg = provider?.user?.photoProfile ? `/storage/${provider.user.photoProfile}` : '/images/default-avatar.jpg';

    const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
    const bgCard = isDark ? '#1e293b' : '#ffffff';
    const textMain = isDark ? '#f8fafc' : '#1e293b';
    const textMuted = isDark ? '#94a3b8' : '#64748b';
    const borderColor = isDark ? '#334155' : '#e2e8f0';

    return (
        <div style={{
            background: bgCard,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: `1px solid ${borderColor}`
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        }}>
            
            <div style={{
                height: '180px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0'
            }}>
                <img
                    src={mainImg}
                    alt={provider?.service}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => e.target.src = '/images/default-service.jpg'}
                />
            </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '-50px',
                    marginBottom: '15px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <img
                        src={profileImg}
                        alt={provider?.user?.name}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: `4px solid ${bgCard}`,
                            objectFit: 'cover',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                        onError={(e) => e.target.src = '/images/default-avatar.jpg'}
                    />
                </div>

                <h3 style={{
                    margin: '0 0 8px 0',
                    color: textMain,
                    fontSize: '16px',
                    fontWeight: '600',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {provider?.service || 'Service'}
                </h3>

                <p style={{
                    margin: '0 0 10px 0',
                    color: textMuted,
                    fontSize: '13px',
                    fontWeight: '500'
                }}>
                    {provider?.user?.name || 'Prestataire'}
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px'
                }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                                key={num}
                                size={14}
                                style={{
                                    fill: num <= 4 ? '#FFD700' : '#E0E0E0',
                                    color: num <= 4 ? '#FFD700' : '#E0E0E0'
                                }}
                            />
                        ))}
                    </div>
                    <span style={{
                        fontSize: '12px',
                        color: textMuted,
                        fontWeight: '500'
                    }}>
                        (4.5)
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '12px',
                    color: textMuted,
                    fontSize: '12px'
                }}>
                    <MapPin size={14} />
                    <span>{provider?.user?.ville?.nom || 'Localisation'}</span>
                </div>

                <Link
                    href={route('provider.profile', provider.id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '11px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontSize: '13px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 188, 212, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <Eye size={14} />
                    Voir le Profil
                </Link>
            </div>
        </div>
    );
}
