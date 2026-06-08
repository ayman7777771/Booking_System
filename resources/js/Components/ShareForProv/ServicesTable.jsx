import {
    CalendarCheck,
    ClipboardList,
    Clock,
    DollarSign,
    Pencil,
    Save,
    Settings,
    Trash2,
} from "lucide-react";

export default function ServiceTable({
    services = [],
    isEdit = false,
    onEdit,
    onDelete,
    onReserve,
    form,
    editingId,
    onSubmit,
    onCancel,
    showSubmitButton = false,
}) {
    return (
        <div>
            {isEdit && form && (
                <div className="row g-2 mb-3">
                    {["name", "prix", "duration"].map((f) => (
                        <div className="col-md" key={f}>
                            <input
                                className="form-control dashboard-input"
                                type={f === "name" ? "text" : "number"}
                                min={f === "name" ? undefined : "0"}
                                placeholder={
                                    f === "name"
                                        ? "Service"
                                        : f === "prix"
                                          ? "Prix"
                                          : "Duree"
                                }
                                value={form.data[f]}
                                onChange={(e) =>
                                    form.setData(f, e.target.value)
                                }
                            />
                        </div>
                    ))}
                    <div className="col-md-auto d-flex gap-2">
                        {showSubmitButton==true && (
                            <button
                                className="btn btn-info"
                                type="button"
                                onClick={onSubmit}
                                disabled={form.processing}
                            >
                                <Save size={15} />
                            </button>
                        )}
                        {editingId && (
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={onCancel}
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div className="table-responsive">
                <table className="table table-dark table-hover align-middle text-center">
                    <thead>
                        <tr>
                            <th>
                                <ClipboardList size={16} className="me-2 text-info" />
                                Service
                            </th>
                            <th>
                                <DollarSign size={16} className="me-2 text-success" />
                                Prix
                            </th>
                            <th>
                                <Clock size={16} className="me-2 text-warning" />
                                Duree
                            </th>
                            <th>
                                <Settings size={16} className="me-2 text-secondary" />
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} className="text-center">
                                <td className="fw-bold text-light">{service.name}</td>
                                <td>{service.prix} DH</td>
                                <td>{service.duration}</td>
                                <td>
                                    {isEdit ? (
                                        <div className="d-flex gap-2 text-center">
                                            <button
                                                className="btn btn-sm btn-outline-info"
                                                onClick={() => onEdit?.(service)}
                                                type="button"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete?.(service)}
                                                type="button"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ) : onReserve ? (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => onReserve(service)}
                                            type="button"
                                            title="Reserver ce service"
                                        > 
                                            <CalendarCheck size={14} />
                                        </button>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                        {!services.length && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Aucun service
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
