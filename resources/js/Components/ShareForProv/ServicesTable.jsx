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
    showSubmitButton = true,
}) {
    return (
        <div>
            {isEdit && form && (
                <div className="row g-2 mb-3">
                    {["name", "prix", "duration"].map((field) => (
                        <div className="col-md" key={field}>
                            <input
                                className="form-control dashboard-input"
                                type={field === "name" ? "text" : "number"}
                                min={field === "name" ? undefined : "0"}
                                placeholder={
                                    field === "name"
                                        ? "Service"
                                        : field === "prix"
                                          ? "Prix"
                                          : "Duree"
                                }
                                value={form.data[field]}
                                onChange={(event) =>
                                    form.setData(field, event.target.value)
                                }
                            />
                        </div>
                    ))}
                    <div className="col-md-auto d-flex gap-2">
                        {showSubmitButton && (
                            <button
                                className="btn btn-info"
                                type="button"
                                onClick={onSubmit}
                                disabled={form.processing}
                            >
                                <Save size={15} /> Enregistrer
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
                <table className="table table-dark table-hover align-middle">
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
                            <tr key={service.id}>
                                <td className="fw-bold text-light">{service.name}</td>
                                <td>{service.prix} DH</td>
                                <td>{service.duration}</td>
                                <td>
                                    {isEdit ? (
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-info"
                                                onClick={() => onEdit?.(service)}
                                                type="button"
                                            >
                                                <Pencil size={14} /> Modifier
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
                                        >
                                            <CalendarCheck size={14} /> Reserver
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
