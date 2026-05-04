import React from "react";

export default function Step7({
    data,
    setData,
    setStep,
    processing,
    error,
}) {
    // 1. تعريف الثوابت (خارج الـ Logic لتبقى الواجهة نظيفة)
    const days = [
        { id: "lun", name: "Lun" },
        { id: "mar", name: "Mar" },
        { id: "mer", name: "Mer" },
        { id: "jeu", name: "Jeu" },
        { id: "ven", name: "Ven" },
        { id: "sam", name: "Sam" },
        { id: "dim", name: "Dim" },
    ];

    const time = [];
    for (let i = 6; i <= 24; i++) {
        time.push(`${i.toString().padStart(2, "0")}:00`);
    }

    // 2. دالة التحكم في المواعيد (مع الترتيب التلقائي)
    const toggleSlot = (day, x) => {
        const currDay = data.working_hours[day] || [];
        let newSlots;

        if (currDay.includes(x)) {
            newSlots = currDay.filter((s) => s !== x).sort();
        } else {
            newSlots = [...currDay, x].sort();
        }

        setData("working_hours", {
            ...data.working_hours,
            [day]: newSlots,
        });
    };

    return (
        <div className="animate__animated animate__fadeIn">
            <h5 className="text-center fw-bold mb-1">Votre Agenda</h5>
            <p className="text-muted text-center small mb-3">
                Cliquez sur les heures qui seront disponibles
            </p>
            <div
                className="table-responsive border rounded shadow-sm"
                style={{ maxHeight: "350px" }}
            >
                <table className="table table-sm table-bordered mb-0 text-center">
                    <thead className="bg-light sticky-top">
                        <tr>
                            <th
                                className="small py-2"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#e5eef6",
                                }}
                            >
                                Heure
                            </th>
                            {days.map((day) => (
                                <th
                                    key={day.id}
                                    className="small py-2"
                                    style={{
                                        width: "60px",
                                        backgroundColor: "#e5eef6",
                                    }}
                                >
                                    {day.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {time.map((heure) => (
                            <tr key={heure}>
                                <td
                                    className="small align-middle fw-bold bg-light"
                                    style={{ fontSize: "12px" }}
                                >
                                    {heure}
                                </td>
                                {days.map((day) => {
                                    const isSelected =
                                        data.working_hours[day.id]?.includes(
                                            heure,
                                        );
                                    return (
                                        <td
                                            key={`${day.id}-${heure}`}
                                            onClick={() =>
                                                toggleSlot(day.id, heure)
                                            }
                                            className="cursor-pointer transition-all"
                                            style={{
                                                height: "35px",
                                                cursor: "pointer",
                                                backgroundColor: isSelected
                                                    ? "#3ed1e7"
                                                    : "transparent",
                                                borderColor: isSelected
                                                    ? "#3ed1e7"
                                                    : "",
                                                transition: "0.3s",
                                            }}
                                        >
                                            {isSelected && (
                                                <i className="bi bi-check-lg text-white"></i>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2" style={{ minHeight: "19px" }}>
                {error.working_hours && (
                    <small
                        className="text-danger animate__animated animate__shakeX animate__faster"
                        style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginLeft: "5px",
                            marginTop: "5px",
                        }}
                    >
                        {error.working_hours}
                    </small>
                )}
            </div>{" "}
            <div className="d-flex gap-2 mt-3">
                <button
                    type="button"
                    className="btn btn-light w-50 border py-2"
                    onClick={() => setStep((prev) => prev - 1)}
                >
                    Retour
                </button>
                <button
                    type="submit"
                    className="btn-primary-custom w-50 py-2"
                    disabled={processing}
                >
                    {processing ? (
                        <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                        "Terminer"
                    )}
                </button>
            </div>
        </div>
    );
}
