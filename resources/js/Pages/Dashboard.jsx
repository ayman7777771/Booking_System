<<<<<<< HEAD
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ServiceCard from '@/Components/ProviderCard';

// N-astaqblou provider, villes, u categories li sifetna men l-Controller
export default function Dashboard({ auth, provider, villes, categories, filters }) {
    
    // Logic dyal l-Search (Inertia useForm bach n-sifto l-data)
    const { data, setData, get } = useForm({
        search: filters?.search || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('dashboard'), { preserveState: true });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Provider Dashboard" />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                
                {/* 1. Filter Section */}
                <form onSubmit={handleSearch} style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    marginBottom: '40px',
                    flexWrap: 'wrap' 
                }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                        <input 
                            type="text"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            placeholder="Recherche dans vos services..." 
                            style={{ 
                                width: '100%', 
                                padding: '12px 12px 12px 40px', 
                                borderRadius: '15px', 
                                border: '1px solid #ddd',
                                backgroundColor: '#fff',
                                color: '#333'
                            }} 
                        />
                    </div>
=======
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// // import Filters from "@/Components/Filters";
// import ProvidersCards from "@/Components/ProvidersCards";

// export default function Dashboard(props) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <Filters
//                     filters={props.filters}
//                     villes={props.villes}
//                     categories={props.categories}
//                 />
//             }
//         >

//             <ProvidersCards providers={props.providers} />

//         </AuthenticatedLayout>
//     );
// }
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2>Dashboard</h2>
            }
            main={
                <div>
                    You're logged in!
                </div>
            }
        >
            <Head title="Dashboard" />

            
            
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc

                    {/* Ville Select */}
                    <select style={{ padding: '12px', borderRadius: '15px', border: '1px solid #ddd', minWidth: '150px' }}>
                        <option value="">Toutes les villes</option>
                        {villes?.map(ville => (
                            <option key={ville.id} value={ville.id}>{ville.nom}</option>
                        ))}
                    </select>

                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '15px' }}>Filtrer</button>
                </form>

                {/* 2. Grid dyal les Cards */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '30px' 
                }}>
                    {/* Hna kan-loopiyou 3la services dyal l-provider */}
                    {provider?.services && provider.services.length > 0 ? (
                        provider.services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px', color: '#666' }}>
                            Aucun service trouvé.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
