import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ProviderCard from '@/Components/ProviderCard';
import { Search } from 'lucide-react';

export default function Dashboard({ auth, providers = [], villes = [], categories = [], filters = {} }) {
    const { data, setData, get } = useForm({
        search: filters?.search || '',
        ville: filters?.ville || '',
        category: filters?.category || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('dashboard'), { preserveState: true });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Dashboard - Booking System" />

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Title Section */}
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ 
                        fontSize: '32px', 
                        fontWeight: 'bold',
                        color: 'var(--text-main)',
                        marginBottom: '10px'
                    }}>
                        اكتشف الخدمات
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                        ابحث عن أفضل مقدمي الخدمات في منطقتك
                    </p>
                </div>

                {/* Filter Section */}
                <form onSubmit={handleSearch} style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '40px',
                    backgroundColor: 'var(--bg-card)',
                    padding: '25px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                    {/* Search Input */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ 
                            position: 'absolute', 
                            left: '15px', 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }} />
                        <input 
                            type="text"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            placeholder="ابحث عن خدمة..." 
                            style={{ 
                                width: '100%', 
                                padding: '12px 12px 12px 45px', 
                                borderRadius: '12px', 
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-input)',
                                color: 'var(--text-main)',
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#00BCD4'}
                        />
                    </div>

                    {/* City Select */}
                    <select 
                        value={data.ville}
                        onChange={e => setData('ville', e.target.value)}
                        style={{ 
                            padding: '12px 15px', 
                            borderRadius: '12px', 
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-input)',
                            color: 'var(--text-main)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            outline: 'none'
                        }}
                    >
                        <option value="">اختر مدينة</option>
                        {villes?.map(ville => (
                            <option key={ville.id} value={ville.id}>{ville.nom}</option>
                        ))}
                    </select>

                    {/* Category Select */}
                    <select 
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                        style={{ 
                            padding: '12px 15px', 
                            borderRadius: '12px', 
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-input)',
                            color: 'var(--text-main)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            outline: 'none'
                        }}
                    >
                        <option value="">اختر فئة</option>
                        {categories?.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nom}</option>
                        ))}
                    </select>

                    {/* Filter Button */}
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
                            transition: 'all 0.3s ease',
                            fontSize: '14px'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        🔍 ابحث
                    </button>
                </form>

                {/* Services Grid */}
                {providers && providers.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                        gap: '30px',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        {providers.map((provider) => (
                            <ProviderCard key={provider.id} service={provider} />
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '80px 20px',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                        <h2 style={{ marginBottom: '10px', color: 'var(--text-main)' }}>لا توجد خدمات</h2>
                        <p>حاول البحث بكلمات مفتاحية أخرى أو اختر مدينة مختلفة</p>
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

                :root {
                    --bg-page: ${document.documentElement.classList.contains('dark') ? '#0f172a' : '#f8fafc'};
                    --bg-card: ${document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff'};
                    --text-main: ${document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b'};
                    --text-muted: ${document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b'};
                    --border-color: ${document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0'};
                    --bg-input: ${document.documentElement.classList.contains('dark') ? '#0f172a' : '#f1f5f9'};
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
