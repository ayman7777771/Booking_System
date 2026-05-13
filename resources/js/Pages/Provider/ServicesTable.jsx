import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ServicesTable({ services }) {
    const { delete: destroy, put, data, setData, reset } = useForm({
        name: "",
        prix: "",
        duration: "",
    });

    const [editingId, setEditingId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer ce service ?")) {
            destroy(route("provider.services.destroy", id));
        }
    };

    const startEdit = (service) => {
        setEditingId(service.id);
        setData({
            name: service.name,
            prix: service.prix,
            duration: service.duration,
        });
    };

    const handleUpdate = (id) => {
        put(route("provider.services.update", id), {
            onSuccess: () => {
                setEditingId(null);
                reset();
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Mes Services</h2>

            <table border="1" cellPadding="10" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.length === 0 && (
                        <tr>
                            <td colSpan="4">Aucun service trouvé</td>
                        </tr>
                    )}

                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>
                                {editingId === service.id ? (
                                    <input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                ) : (
                                    service.name
                                )}
                            </td>

                            <td>
                                {editingId === service.id ? (
                                    <input
                                        type="number"
                                        value={data.prix}
                                        onChange={(e) =>
                                            setData("prix", e.target.value)
                                        }
                                    />
                                ) : (
                                    service.prix
                                )}
                            </td>

                            <td>
                                {editingId === service.id ? (
                                    <input
                                        type="number"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                    />
                                ) : (
                                    service.duration
                                )}
                            </td>

                            <td>
                                {editingId === service.id ? (
                                    <>
                                        <button onClick={() => handleUpdate(service.id)}>
                                            Save
                                        </button>

                                        <button onClick={() => setEditingId(null)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(service)}>
                                            Edit
                                        </button>

                                        <button onClick={() => handleDelete(service.id)}>
                                            Supprimer
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}