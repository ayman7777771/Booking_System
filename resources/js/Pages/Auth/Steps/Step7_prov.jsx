import React from "react";
import WorkingHoursTable from "@/Components/ShareForProv/WorkingHoursTable";

export default function Step7({
    data,
    setData,
    setStep,
    processing,
    error,
}) {
    return (
        <div className="animate__animated animate__fadeIn">
            <h5 className="text-center fw-bold mb-1">Votre Agenda</h5>
            <p className="text-muted text-center small mb-3">
                Cliquez sur les heures qui seront disponibles
            </p>
            <WorkingHoursTable
                value={data.working_hours}
                onChange={(workingHours) =>
                    setData("working_hours", workingHours)
                }
            />
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
