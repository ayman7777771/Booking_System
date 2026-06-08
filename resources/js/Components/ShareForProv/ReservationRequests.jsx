import { router } from "@inertiajs/react";
import { format } from "date-fns";

export default function ReservationRequests({ reservations = [] }) {
    const hundlesub = (reservation, action) => {
        router.patch(route(`provider.reservations.${action}`, reservation.id), {}, {
            preserveScroll: true,
        });
    };
    const formatDate = (date) => format(new Date(date), "dd/MM/yyyy");

    return (
        <div className="text-white">
            <h5>Demandes de reservation</h5>
            {reservations.length === 0 ? (
                <p className="text-muted">Aucune demande.</p>
            ) : reservations.map((r) => (
                <div key={r.id} className="d-flex justify-content-between align-items-center border-bottom border-secondary py-2">
                    <span>{r.client?.user?.name} - {r.service?.name} - {formatDate(r.date)} {r.heure}</span>
                    {r.statut === "en_attente" ? (
                        <span className="d-flex gap-2">
                            <button className="btn btn-sm btn-success" onClick={() => hundlesub(r, "accept")}>Accepter</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => hundlesub(r, "refuse")}>Refuser</button>
                        </span>
                    ) : (
                        <span className="badge bg-secondary">{r.statut}</span>
                    )}
                </div>
            ))}
        </div>
    );
}
