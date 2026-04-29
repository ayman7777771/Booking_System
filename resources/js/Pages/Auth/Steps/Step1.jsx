export default function Step1({
    data,
    error,
    getError,
    isNameValid,
    isEmailValid,
    hundleChange,
    nextStep,
}) {
    return (
       <div className="animate__animated animate__fadeIn">
            {/* الاسم */}
            <div className="field-group">
                <div className="input-box">
                    <input
                        type="text"
                        className={` custom-input ${error.name ? "is-invalid" : data.name ? (isNameValid ? "is-valid" : "is-warning") : ""}`}
                        value={data.name}
                        onChange={(e) => hundleChange("name", e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label>
                        Nom complet <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.name && (
                        <span className="input-status-icon">
                            {error.name ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : isNameValid ? (
                                <i className="bi bi-check-lg text-success"></i>
                            ) : (
                                <i className="bi bi-exclamation-triangle text-warning"></i>
                            )}
                        </span>
                    )}
                </div>
               {getError("name")}
            </div>

            {/* الإيميل */}
            <div className="field-group">
                <div className="input-box">
                    <input
                        type="email"
                        className={` custom-input ${error.email ? "is-invalid" : data.email ? (isEmailValid ? "is-valid" : "is-warning") : ""}`}
                        value={data.email}
                        onChange={(e) => hundleChange("email", e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label>
                        Adresse Email <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.email && (
                        <span className="input-status-icon">
                            {error.email ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : isEmailValid ? (
                                <i className="bi bi-check-lg text-success"></i>
                            ) : (
                                <i className="bi bi-exclamation-triangle text-warning"></i>
                            )}
                        </span>
                    )}
                </div>
                {getError("email")}
            </div>

            {/* المدينة */}
            <div className="field-group">
                <div className="input-box">
                    <select
                        className={`"" custom-input ${
                            error.ville
                                ? "is-invalid"
                                : data.ville
                                  ? "is-valid"
                                  : ""
                        }`}
                        value={data.ville}
                        onChange={(e) => hundleChange("ville", e.target.value)}
                        required
                    >
                        <option value="" hidden></option>
                        <option value="Fès">Fès</option>
                        <option value="Rabat">Rabat</option>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Tanger">Tanger</option>
                    </select>
                    <label>
                        Ville <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.ville && (
                        <span className="input-status-icon">
                            {" "}
                            {error.ville ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : (
                                <i className="bi bi-check-lg text-success"></i>
                            )}
                        </span>
                    )}
                </div>
                {getError("ville")}
            </div>

            <button
                type="button"
                className="btn-primary-custom w-100 mt-3"
                onClick={nextStep}
            >
                Suivant <i className="bi bi-arrow-right ms-2"></i>
            </button>
        </div>
    );
}
