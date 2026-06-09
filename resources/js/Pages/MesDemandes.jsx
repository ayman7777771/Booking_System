import React from 'react';
import { Head } from '@inertiajs/react';
import { CalendarDays, ClipboardList } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProviderLayout from '@/Layouts/ProviderLayout';
import AdminLayout from '@/Layouts/AdminLayout';

const statusLabels = {
    en_attente: 'En attente',
    acceptee: 'Acceptee',
    refusee: 'Refusee',
    confirmee: 'Confirmee',
    terminee: 'Terminee',
    annulee: 'Annulee',
};

const statusClasses = {
    en_attente: 'bg-warning-subtle text-warning-emphasis border-warning-subtle',
    acceptee: 'bg-success-subtle text-success-emphasis border-success-subtle',
    refusee: 'bg-danger-subtle text-danger-emphasis border-danger-subtle',
    confirmee: 'bg-info-subtle text-info-emphasis border-info-subtle',
    terminee: 'bg-secondary-subtle text-secondary-emphasis border-secondary-subtle',
    annulee: 'bg-dark-subtle text-dark-emphasis border-dark-subtle',
};

const formatDate = (date) => {
    if (!date) {
        return '-';
    }

    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const formatDuration = (duration) => {
    if (!duration) {
        return '-';
    }

    return `${duration} min`;
};

export default function MesDemandes({ auth, reservations = [], mode = 'client' }) {
    const title = mode === 'provider'
        ? 'Demandes recues'
        : mode === 'admin'
            ? 'Toutes les demandes'
            : 'Mes demandes';

    const content = (
        <>
            <Head title={title} />

            <section className="mes-demandes-page">
                <div className="mes-demandes-header">
                    <div className="d-flex align-items-center gap-3">
                        <span className="mes-demandes-icon">
                            <ClipboardList size={22} />
                        </span>
                        <div>
                            <h1>{title}</h1>
                            <p>Suivi des reservations et de leur etat actuel.</p>
                        </div>
                    </div>
                </div>

                <div className="mes-demandes-card">
                    {reservations.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table mes-demandes-table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        {mode !== 'provider' && <th>Prestataire</th>}
                                        {mode !== 'client' && <th>Client</th>}
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Duree</th>
                                        <th>Etat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td className="fw-semibold">{reservation.service || '-'}</td>
                                            {mode !== 'provider' && <td>{reservation.prestataire || '-'}</td>}
                                            {mode !== 'client' && <td>{reservation.client || '-'}</td>}
                                            <td>{formatDate(reservation.date)}</td>
                                            <td>{reservation.heure || '-'}</td>
                                            <td>{formatDuration(reservation.duration)}</td>
                                            <td>
                                                <span className={`badge rounded-pill border px-3 py-2 ${statusClasses[reservation.statut] || 'bg-light text-dark border-light'}`}>
                                                    {statusLabels[reservation.statut] || reservation.statut}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="mes-demandes-empty">
                            <CalendarDays size={42} />
                            <h2>Aucune demande</h2>
                            <p>Les demandes de reservation apparaitront ici.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );

    if (mode === 'provider') {
        return <ProviderLayout>{content}</ProviderLayout>;
    }

    if (mode === 'admin') {
        return <AdminLayout auth={auth} title={title}>{content}</AdminLayout>;
    }

    return <AuthenticatedLayout auth={auth}>{content}</AuthenticatedLayout>;
}
