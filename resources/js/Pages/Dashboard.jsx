import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProviderCard from '@/Components/ProviderCard';
import { Search } from 'lucide-react';

export default function Dashboard({ auth, providers = [], villes = [], categories = [], filters = {} }) {
    const { data, setData } = useForm({
        search: filters?.search || '',
        ville: filters?.ville || '',
        category: filters?.category || '',
    });

    const submitFilters = (nextData = data) => {
        router.get(route('dashboard'), nextData, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (event) => {
        event.preventDefault();
        submitFilters();
    };

    const handleFilterChange = (field, value) => {
        const nextData = { ...data, [field]: value };

        setData(field, value);
        submitFilters(nextData);
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Decouvrir les Services - Booking System" />

            <div className="booking-dashboard container-fluid px-0">
                <div className="booking-dashboard-inner mx-auto">
                    <form className="booking-filter row g-3 align-items-center mb-4 mb-lg-5" onSubmit={handleSearch}>
                        <div className="col-12 col-lg">
                            <div className="booking-input-icon">
                                <Search size={18} aria-hidden="true" />
                                <input
                                    type="text"
                                    className="form-control booking-control"
                                    placeholder="Recherche..."
                                    value={data.search}
                                    onChange={(event) => setData('search', event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <select
                                className="form-select booking-control"
                                value={data.category}
                                onChange={(event) => handleFilterChange('category', event.target.value)}
                            >
                                <option value="">Toutes categories</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <select
                                className="form-select booking-control"
                                value={data.ville}
                                onChange={(event) => handleFilterChange('ville', event.target.value)}
                            >
                                <option value="">Toutes les villes</option>
                                {villes?.map((ville) => (
                                    <option key={ville.id} value={ville.id}>
                                        {ville.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-lg-auto">
                            <button type="submit" className="btn booking-filter-btn w-100">
                                <Search size={16} aria-hidden="true" />
                                <span>Filtrer</span>
                            </button>
                        </div>
                    </form>

                    {providers?.data && providers.data.length > 0 ? (
                        <div className="booking-provider-grid">
                            {providers.data.map((provider) => (
                                <ProviderCard key={provider.id} provider={provider} />
                            ))}
                        </div>
                    ) : (
                        <div className="booking-empty text-center">
                            <Search size={42} aria-hidden="true" />
                            <h2 className="h5 fw-bold mb-2">Aucun service trouve</h2>
                            <p className="mb-0">Essayez une autre recherche ou selectionnez une autre categorie / ville.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
