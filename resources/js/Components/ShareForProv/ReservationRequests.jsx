import { router } from "@inertiajs/react";

export default function ReservationRequests({ reservations = [] }) {
    const answer = (reservation, action) => {
        router.patch(route(`provider.reservations.${action}`, reservation.id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="text-white">
            <h5>Demandes de reservation</h5>
            {reservations.length === 0 ? (
                <p className="text-muted">Aucune demande.</p>
            ) : reservations.map((reservation) => (
                <div key={reservation.id} className="d-flex justify-content-between align-items-center border-bottom border-secondary py-2">
                    <span>{reservation.client?.user?.name} - {reservation.service?.name} - {reservation.date} {reservation.heure}</span>
                    {reservation.statut === "en_attente" ? (
                        <span className="d-flex gap-2">
                            <button className="btn btn-sm btn-success" onClick={() => answer(reservation, "accept")}>Accepter</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => answer(reservation, "refuse")}>Refuser</button>
                        </span>
                    ) : (
                        <span className="badge bg-secondary">{reservation.statut}</span>
                    )}
                </div>
            ))}
        </div>
    );
}
