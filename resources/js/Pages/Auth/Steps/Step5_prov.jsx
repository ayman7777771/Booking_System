export default function Step5({
    data,
    nextStep,
    setStep,
    handleChange,
    error,
    getError,
}) {
    return (
        <div className="animate__animated animate__fadeIn">
            <h5 className="text-center fw-bold">
                Détails de votre Service
            </h5>
            <div className="text-muted text-center small mb-4">
                Ces informations aideront les clients à mieux comprendre ce que
                vous proposez.
            </div>

            <div className="field-group ">
                <div className="input-box">
                    <select
                        className={`custom-input ${
                            error.category_id
                                ? "is-invalid"
                                : data.category_id
                                  ? "is-valid"
                                  : ""
                        }`}
                        value={data.category_id}
                        onChange={(e) =>
                            handleChange("category_id", e.target.value)
                        }
                        required
                    >
                        <option value="" hidden></option>
                        <option value="1">Plomberie</option>
                        <option value="2">Électricité</option>
                        <option value="3">Menuiserie</option>
                    </select>
                    <label style={{ marginLeft: "-7px" }}>
                        Sélectionnez votre domaine...{" "}
                        <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.category_id && (
                        <span className="input-status-icon">
                            {error.category_id ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : (
                                <i className="bi bi-check-lg text-success"></i>
                            )}
                        </span>
                    )}
                </div>
                <div style={{ minHeight: "25px" }}>
                    {getError("category_id")}
                </div>
            </div>

            <div style={{ position: "relative" }}>
                <label className="form-label small fw-bold">
                    Description du profil{" "}
                    <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                    className={`form-control custom-textarea ${error.description ? "is-invalid" : ""}`}
                    rows="5"
                    placeholder="Décrivez vos services, votre expérience (min 20 caractères)..."
                    value={data.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                ></textarea>

                {/* حجز مساحة ثابتة للخطأ */}
                <div className="mt-1" style={{ minHeight: "25px" }}>
                    {error.description && (
                        <small
                            className="text-danger animate__animated animate__shakeX animate__faster d-block"
                            style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                marginLeft: "5px",
                            }}
                        >
                            {error.description}
                        </small>
                    )}
                </div>
            </div>

            <div className="d-flex gap-2 mt-4">
                <button
                    type="button"
                    className="btn btn-light w-50 border"
                    onClick={() => setStep((prev) => prev - 1)}
                >
                    Retour
                </button>
                <button
                    type="button"
                    className="btn-primary-custom w-50"
                    onClick={nextStep}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
