import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ServiceTest() {
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nom: "",
        prix: "",
        duration: "",
    });

    // CREATE or UPDATE
    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            put(route("provider.services.update", editingId), {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                },
            });
        } else {
            post(route("provider.services.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    // simulate edit (غادي تستعملها من table من بعد)
    const startEdit = (service) => {
        setData({
            nom: service.nom,
            prix: service.prix,
            duration: service.duration,
        });

        setEditingId(service.id);
    };

    return (
        <div>
            <form
                onSubmit={submit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                <input
                    placeholder="Nom"
                    value={data.nom}
                    onChange={(e) => setData("nom", e.target.value)}
                />
                {errors.nom && <p>{errors.nom}</p>}

                <input
                    placeholder="Prix"
                    type="number"
                    value={data.prix}
                    onChange={(e) => setData("prix", e.target.value)}
                />
                {errors.prix && <p>{errors.prix}</p>}

                <input
                    placeholder="Duration"
                    type="number"
                    value={data.duration}
                    onChange={(e) => setData("duration", e.target.value)}
                />
                {errors.duration && <p>{errors.duration}</p>}

                <button disabled={processing}>
                    {editingId ? "Update Service" : "Create Service"}
                </button>
            </form>

            {/* TEST BUTTON (simulate edit) */}
            <button
                onClick={() =>
                    startEdit({
                        id: 1,
                        nom: "Test Service",
                        prix: 100,
                        duration: 30,
                    })
                }
            >
                Load Service for Edit (Test)
            </button>
        </div>
    );
}