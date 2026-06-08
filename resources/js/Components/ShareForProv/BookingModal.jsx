import React, { useEffect, useState } from "react";
import WorkingHoursTable from "@/Components/ShareForProv/WorkingHoursTable";

const days_id = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

const today = () => new Date().toISOString().slice(0, 10);

const getDayId = (date) => {
    if (!date) {
        return null;
    }

    return days_id[new Date(`${date}T00:00:00`).getDay()];
};

export default function BookingModal({ service, plannings, onClose, onConfirm }) {
    const [date, setDate] = useState(today());
    const [slot, setSlot] = useState(null);
    const selectedDay = getDayId(date);

    useEffect(() => {
        setSlot(null);
    }, [date, service]);

    if (!service) {
        return null;
    }

    const confirm = () => {
        if (!slot) {
            return;
        }

        onConfirm({
            service_id: service.id,
            date,
            heure: slot.hour,
        });
    };

    return (
        <>
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header border-secondary">
                            <h5 className="modal-title">{service.name}</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            />
                        </div>
                        <div className="modal-body">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control mb-3"
                                min={today()}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <WorkingHoursTable
                                plannings={plannings}
                                enabledDays={selectedDay ? [selectedDay] : []}
                                selectedSlot={slot}
                                onSlotSelect={setSlot}
                                readOnly={!selectedDay}
                                emptyText="Aucun horaire disponible"
                            />
                        </div>
                        <div className="modal-footer border-secondary">
                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                disabled={!slot}
                                onClick={confirm}
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </>
    );
}
