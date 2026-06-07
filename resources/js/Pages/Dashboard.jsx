import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Star, MapPin, Mail, Phone, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ auth, providers = [], villes = [], categories = [], filters = {} }) {
    const [data, setData] = useState({
        search: filters?.search || '',
        ville: filters?.ville || '',
        category: filters?.category || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (data.search) params.append('search', data.search);
        if (data.ville) params.append('ville', data.ville);
        if (data.category) params.append('category', data.category);
        window.location.href = route('dashboard') + (params.toString() ? '?' + params.toString() : '');
    };

    const isDark = document.documentElement.classList.contains('dark');
    const bgCard = isDark ? '#1e293b' : '#ffffff';
    const textMain = isDark ? '#f8fafc' : '#1e293b';
    const textMuted = isDark ? '#94a3b8' : '#64748b';
    const borderColor = isDark ? '#334155' : '#e2e8f0';

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Découvrir les Services - Booking System" />

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Section Titre */}
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ 
                        fontSize: '32px', 
                        fontWeight: 'bold',
                        color: textMain,
                        marginBottom: '10px'
                    }}>
                        Découvrez les Services
                    </h1>
                    <p style={{ color: textMuted, fontSize: '16px' }}>
                        Trouvez les meilleurs prestataires dans votre région
                    </p>
                </div>

                {/* Section Filtre */}
                <form onSubmit={handleSearch} style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '40px',
                    backgroundColor: bgCard,
                    padding: '25px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    border: `1px solid ${borderColor}`
                }}>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="text"
                            value={data.search}
                            onChange={e => setData({...data, search: e.target.value})}
                            placeholder="Recherchez un service..." 
                            style={{ 
                                width: '100%', 
                                padding: '12px 15px', 
                                borderRadius: '12px', 
                                border: `1px solid ${borderColor}`,
                                backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
                                color: textMain,
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <select 
                        value={data.ville}
                        onChange={e => setData({...data, ville: e.target.value})}
                        style={{ 
                            padding: '12px 15px', 
                            borderRadius: '12px', 
                            border: `1px solid ${borderColor}`,
                            backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
                            color: textMain,
                            fontSize: '14px',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="">Toutes les villes</option>
                        {villes?.map(ville => (
                            <option key={ville.id} value={ville.id}>{ville.nom}</option>
                        ))}
                    </select>

                    <select 
                        value={data.category}
                        onChange={e => setData({...data, category: e.target.value})}
                        style={{ 
                            padding: '12px 15px', 
                            borderRadius: '12px', 
                            border: `1px solid ${borderColor}`,
                            backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
                            color: textMain,
                            fontSize: '14px',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="">Toutes les catégories</option>
                        {categories?.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nom}</option>
                        ))}
                    </select>

                    <button 
                        type="submit"
                        style={{ 
                            padding: '12px 25px', 
                            borderRadius: '12px', 
                            border: 'none',
                            background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        🔍 Filtrer
                    </button>
                </form>

                {/* Grille des Services */}
                {providers && providers.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                        gap: '30px',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        {providers.map((provider) => (
                            <div key={provider.id} style={{
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
                                
                                {/* Image Principale */}
                                <div style={{
                                    height: '180px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f0f0f0'
                                }}>
                                    <img
                                        src={provider?.main_photo ? `/storage/${provider.main_photo}` : '/images/default-service.jpg'}
                                        alt={provider?.nom}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => e.target.src = '/images/default-service.jpg'}
                                    />
                                </div>

                                {/* Contenu */}
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    {/* Avatar Prestataire */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '-50px',
                                        marginBottom: '15px',
                                        position: 'relative',
                                        zIndex: 10
                                    }}>
                                        <img
                                            src={provider?.user?.photoProfile ? `/storage/${provider.user.photoProfile}` : '/images/default-avatar.jpg'}
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

                                    {/* Nom Service */}
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

                                    {/* Nom Prestataire */}
                                    <p style={{
                                        margin: '0 0 10px 0',
                                        color: textMuted,
                                        fontSize: '13px',
                                        fontWeight: '500'
                                    }}>
                                        {provider?.user?.name || 'Prestataire'}
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

                                    {/* Localisation */}
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

                                    {/* Bouton Voir Profil */}
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
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '80px 20px',
                        color: textMuted
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                        <h2 style={{ marginBottom: '10px', color: textMain }}>Aucun service trouvé</h2>
                        <p>Essayez une autre recherche ou sélectionnez une autre ville</p>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
