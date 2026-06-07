import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProviderCard from '@/Components/ProviderCard';
import { Search } from 'lucide-react';

export default function Dashboard({ auth, providers = [], villes = [], categories = [], filters = {} }) {
    
    // 1. Handling l-Formulaire dynamicment m3a Inertia
    const { data, setData, get } = useForm({
        search: filters?.search || '',
        ville: filters?.ville || '',
        category: filters?.category || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('dashboard'), { preserveState: true });
    };

    const handleFilterChange = (field, value) => {
        setData(field, value);
        const updatedFilters = { ...data, [field]: value };
        get(route('dashboard'), { data: updatedFilters, preserveState: true });
    };

    // 2. Gestion dyal Mode Sombre / Mode Clair pour le Style inline
    const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
    const bgCard = isDark ? '#1e293b' : '#ffffff';
    const textMain = isDark ? '#f8fafc' : '#1e293b';
    const textMuted = isDark ? '#94a3b8' : '#64748b';
    const borderColor = isDark ? '#334155' : '#e2e8f0';
    const bgInput = isDark ? '#1e293b' : '#f8fafc';

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Découvrir les Services - Booking System" />

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                
                {/* --- Section Section Filter Bar --- */}
                <form onSubmit={handleSearch} style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '15px',
                    marginBottom: '40px',
                    backgroundColor: bgCard,
                    padding: '20px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: `1px solid ${borderColor}`,
                    alignItems: 'center'
                }}>
                    {/* Input de Recherche Textuelle */}
                    <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: textMuted }}>
                            <Search size={18} />
                        </span>
                        <input 
                            type="text"
                            placeholder="Que recherchez-vous ? (Coiffeur, Plombier...)"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 45px',
                                borderRadius: '12px',
                                border: `1px solid ${borderColor}`,
                                backgroundColor: bgInput,
                                color: textMain,
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    {/* Sélection Catégorie */}
                    <div style={{ minWidth: '180px' }}>
                        <select 
                            value={data.category}
                            onChange={e => handleFilterChange('category', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: `1px solid ${borderColor}`,
                                backgroundColor: bgInput,
                                color: textMain,
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">🎛️ Toutes catégories</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name || cat.nom}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sélection Ville */}
                    <div style={{ minWidth: '180px' }}>
                        <select 
                            value={data.ville}
                            onChange={e => handleFilterChange('ville', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: `1px solid ${borderColor}`,
                                backgroundColor: bgInput,
                                color: textMain,
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">📍 Toutes les villes</option>
                            {villes?.map(v => (
                                <option key={v.id} value={v.id}>{v.name || v.nom}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bouton Submit */}
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

                {/* --- Section Grille des Providers --- */}
                {providers && providers.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                        gap: '30px',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        {providers.map((provider) => (
                            /* Istaʿmalna l-Composant ProviderCard dyalk bach i-bqa l-code nqi */
                            <ProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                ) : (
                    /* Affichage f l-khwa (Aucun service) */
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '80px 20px',
                        color: textMuted
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                        <h2 style={{ marginBottom: '10px', color: textMain }}>Aucun service trouvé</h2>
                        <p>Essayez une autre recherche ou sélectionnez une autre catégorie / ville.</p>
                    </div>
                )}
            </div>

            {/* Animation custom f l-css */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}