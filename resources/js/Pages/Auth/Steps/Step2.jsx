export default function Step2({
    data,
    error,
    getError,
    isPasswordValid,
    isPasswordMatch,
    hundleChange,
    setStep,
    nextStep,
}) {
    return (
        <div className="animate__animated animate__fadeIn">
            {/* كلمة المرور */}
            <div className="field-group">
                <div className="input-box">
                    <input
                        type="password"
                        className={`"" custom-input ${error.password ? "is-invalid" : data.password ? (isPasswordValid ? "is-valid" : "is-warning") : ""}`}
                        placeholder=" "
                        value={data.password}
                        onChange={(e) =>
                            hundleChange("password", e.target.value)
                        }
                        required
                    />
                    <label>
                        Mot de passe <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.password && (
                        <span className="input-status-icon">
                            {error.password ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : isPasswordValid ? (
                                <i className="bi bi-check-lg text-success"></i>
                            ) : (
                                <i className="bi bi-exclamation-triangle text-warning"></i>
                            )}
                        </span>
                    )}
                </div>
                {getError("password")}
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="field-group">
                <div className="input-box">
                    <input
                        type="password"
                        className={`"" custom-input ${error.password_confirmation ? "is-invalid" : data.password_confirmation ? (isPasswordMatch ? "is-valid" : "is-warning") : ""}`}
                        placeholder=" "
                        value={data.password_confirmation}
                        onChange={(e) =>
                            hundleChange(
                                "password_confirmation",
                                e.target.value,
                            )
                        }
                        required
                    />
                    <label>
                        Confirmation <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.password_confirmation && (
                        <span className="input-status-icon">
                            {error.password_confirmation ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : isPasswordMatch ? (
                                <i className="bi bi-check-lg text-success"></i>
                            ) : (
                                <i className="bi bi-exclamation-triangle text-warning"></i>
                            )}
                        </span>
                    )}
                </div>
                {getError("password_confirmation")}
            </div>
            {/*    ////////////////////////////////////////////////////////////////////////////////////////////////////////////    */}
            <label className="mb-2 fw-bold small text-secondary">
                Je m'inscris en tant que :
            </label>

            <div className="role-selection">
                <div
                    className={`role-box ${data.role === "client" ? "active" : ""}`}
                    onClick={() => hundleChange("role", "client")}
                >
                    <i className="bi bi-person-fill"></i> Client
                </div>
                {/* //////////////////////////////////// */}
                <div
                    className={`role-box ${data.role === "provider" ? "active" : ""}`}
                    onClick={() => {
                        hundleChange("role", "provider");
                        console.log(data.role);
                    }}
                >
                    <i className="bi bi-briefcase-fill"></i> Prestataire
                </div>
            </div>

            {/*  /////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="d-flex gap-2 mt-5">
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
