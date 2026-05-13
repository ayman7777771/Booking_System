import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ServiceCard from '@/Components/ServiceCard';

export default function Filter({ auth, services }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                {/* Search Header */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                    <input placeholder="Recherche..." style={{ flex: 1, padding: '12px', borderRadius: '15px', border: '1px solid #ddd' }} />
                    <select style={{ padding: '12px', borderRadius: '15px', border: '1px solid #ddd' }}>
                        <option>Fès, Maroc</option>
                    </select>
                </div>

                {/* Grid System */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                    gap: '30px' 
                }}>
                    {services.map(s => <ServiceCard key={s.id} service={s} />)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}