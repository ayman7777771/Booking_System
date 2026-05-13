import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ServiceCard from '@/Components/ServiceCard'; // T-akked beli had l-component kine

export default function Dashboard({ auth, services }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Discover - Dashboard" />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                
                {/* 1. Filter Section (Recherche / Catégorie / Ville) */}
                <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    marginBottom: '40px',
                    flexWrap: 'wrap' 
                }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                        <input 
                            type="text"
                            placeholder="Recherche..." 
                            style={{ 
                                width: '100%', 
                                padding: '12px 12px 12px 40px', 
                                borderRadius: '15px', 
                                border: '1px solid var(--input-border)',
                                backgroundColor: 'var(--bg-card)',
                                color: 'var(--text-main)'
                            }} 
                        />
                    </div>
                    <select style={{ 
                        padding: '12px', 
                        borderRadius: '15px', 
                        border: '1px solid var(--input-border)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        minWidth: '150px'
                    }}>
                        <option>Catégorie...</option>
                    </select>

                    <select style={{ 
                        padding: '12px', 
                        borderRadius: '15px', 
                        border: '1px solid var(--input-border)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        minWidth: '150px'
                    }}>
                        <option>Fès, Maroc</option>
                    </select>
                </div>

                {/* 2. Grid dyal les Cards */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '30px' 
                }}>
                    {services && services.length > 0 ? (
                        services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px', color: 'var(--text-main)' }}>
                            Aucun service disponible pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}