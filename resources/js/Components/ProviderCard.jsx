import React from 'react';
import { Link } from '@inertiajs/react';
import { Star, MapPin, Eye } from 'lucide-react';

export default function ProviderCard({ service }) {
    // احصل على الصور من البيانات
    const mainImg = service?.Mainphoto ? `/storage/${service.Mainphoto}` : '/images/default-service.jpg';
    const profileImg = service?.provider?.utilisateur?.photoProfile 
        ? `/storage/${service.provider.utilisateur.photoProfile}` 
        : '/images/default-avatar.jpg';

    // حساب عدد النجوم
    const rating = service?.moyen_note ? Math.round(service.moyen_note) : 0;
    const ratingValue = service?.moyen_note ? Number(service.moyen_note).toFixed(1) : '0.0';

    // الألوان حسب الـ Dark Mode
    const isDark = document.documentElement.classList.contains('dark');
    const bgCard = isDark ? '#1e293b' : '#ffffff';
    const textMain = isDark ? '#f8fafc' : '#1e293b';
    const textMuted = isDark ? '#94a3b8' : '#64748b';

    return (
        <div style={{
            background: bgCard,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        }}>
            
            {/* Service Image */}
            <div style={{
                height: '180px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                position: 'relative'
            }}>
                <img
                    src={mainImg}
                    alt={service?.nom || 'Service'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => e.target.src = '/images/default-service.jpg'}
                />
            </div>

            {/* Content */}
            <div style={{
                padding: '20px',
                textAlign: 'center'
            }}>
                {/* Provider Avatar */}
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
                        alt={service?.provider?.utilisateur?.name}
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

                {/* Service Name */}
                <h3 style={{
                    margin: '0 0 8px 0',
                    color: textMain,
                    fontSize: '16px',
                    fontWeight: '600',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {service?.nom || 'خدمة'}
                </h3>

                {/* Provider Name */}
                <p style={{
                    margin: '0 0 10px 0',
                    color: textMuted,
                    fontSize: '13px',
                    fontWeight: '500'
                }}>
                    {service?.provider?.utilisateur?.name || 'مقدم خدمة'}
                </p>

                {/* Rating */}
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
                                    fill: num <= rating ? '#FFD700' : '#E0E0E0',
                                    color: num <= rating ? '#FFD700' : '#E0E0E0',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        ))}
                    </div>
                    <span style={{
                        fontSize: '12px',
                        color: textMuted,
                        fontWeight: '500'
                    }}>
                        ({ratingValue})
                    </span>
                </div>

                {/* Location */}
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
                    <span>{service?.provider?.utilisateur?.ville || 'الموقع'}</span>
                </div>

                {/* Price */}
                <div style={{
                    background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}>
                    {service?.prix ? `${service.prix} DH` : 'غير محدد'}
                </div>

                {/* Button */}
                <Link
                    href={`/provider/${service?.provider?.id}/services`}
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
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 6px 16px rgba(0, 188, 212, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    <Eye size={14} />
                    عرض الملف الشخصي
                </Link>
            </div>
        </div>
    );
}
