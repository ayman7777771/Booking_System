import React from 'react';

export default function ProviderCard({ service }) {
    // 1. Path dyal l-tsawer
    const mainImg = service.provider?.Mainphoto ? `/storage/${service.provider.Mainphoto}` : '/default.jpg';
    const profileImg = service.provider?.utilisateur?.photoProfile ? `/storage/${service.provider.utilisateur.photoProfile}` : '/avatar.png';

    // 2. Logic dyal les étoiles (Moyen)
    // service.moyen_note k-t-wsal mn l-controller (mital: 4.5)
    const rating = service.moyen_note ? Math.round(service.moyen_note) : 0;

    return (
        <div className="service-card" style={{ 
            background: 'var(--bg-card)', 
            borderRadius: '20px', 
            overflow: 'hidden', 
            boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease'
        }}>
            {/* L-image l-kbira */}
            <div style={{ height: '180px', overflow: 'hidden' }}>
                <img src={mainImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Service" />
            </div>
            
            {/* L-avatar w l-ma'loumat */}
            <div style={{ padding: '0 20px 20px', textAlign: 'center', marginTop: '-40px' }}>
                <img src={profileImg} style={{ 
                    width: '80px', height: '80px', borderRadius: '50%', 
                    border: '5px solid var(--bg-card)', backgroundColor: 'white',
                    objectFit: 'cover'
                }} alt="Provider" />
                
                <h3 style={{ margin: '10px 0 5px', color: 'var(--text-main)' }}>{service.nom}</h3>
                
                {/* --- Hna l-parti dyal les étoiles (Rating) --- */}
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span key={num} style={{ 
                            color: num <= rating ? '#FFD700' : '#E0E0E0', // Joloud l-star (Gold) ola Grey
                            fontSize: '18px'
                        }}>
                            ★
                        </span>
                    ))}
                    <span style={{ fontSize: '12px', color: '#888', marginLeft: '5px' }}>
                        ({service.moyen_note ? Number(service.moyen_note).toFixed(1) : '0.0'})
                    </span>
                </div>
                {/* ------------------------------------------ */}

                <p style={{ color: 'var(--brand-teal)', fontWeight: 'bold', fontSize: '1.1rem' }}>{service.prix} DH</p>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>📍 {service.provider?.utilisateur?.ville}</p>
                
                <button className="btn-brand" style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--brand-gradient)',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    Voir Profil Personnel
                </button>
            </div>
        </div>
    );
}