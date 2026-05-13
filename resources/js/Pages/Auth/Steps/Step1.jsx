export default function Step1({
    data,
    error,
    getError,
    isNameValid,
    isTelValid,
    isEmailValid,
    handleChange,
    nextStep,
    villes,
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
                        onChange={(e) => handleChange("name", e.target.value)}
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

            <div className="field-group">
                <div className="input-box">
                    <input
                        type="text"
                        className={` custom-input ${error.tel ? "is-invalid" : data.tel ? (isTelValid ? "is-valid" : "is-warning") : ""}`}
                        value={data.tel}
                        onChange={(e) => handleChange("tel", e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label>
                        Numéro de Télephone{" "}
                        <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.tel && (
                        <span className="input-status-icon">
                            {error.tel ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : isTelValid ? (
                                <i className="bi bi-check-lg text-success"></i>
                            ) : (
                                <i className="bi bi-exclamation-triangle text-warning"></i>
                            )}
                        </span>
                    )}
                </div>
                {getError("tel")}
            </div>

            {/* الإيميل */}
            <div className="field-group">
                <div className="input-box">
                    <input
                        type="email"
                        className={` custom-input ${error.email ? "is-invalid" : data.email ? (isEmailValid ? "is-valid" : "is-warning") : ""}`}
                        value={data.email}
                        onChange={(e) => handleChange("email", e.target.value)}
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
                            error.ville_id
                                ? "is-invalid"
                                : data.ville_id
                                  ? "is-valid"
                                  : ""
                        }`}
                        value={data.ville_id}
                        onChange={(e) => handleChange("ville_id", e.target.value)}
                        required
                    >
                        <option value="" hidden></option>
                        {villes.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                    <label style={{ marginLeft: "-4px" }}>
                        Ville <span style={{ color: "red" }}>*</span>
                    </label>
                    {data.ville_id && (
                        <span className="input-status-icon">
                            {" "}
                            {error.ville_id ? (
                                <i className="bi bi-x-lg text-danger"></i>
                            ) : (
                                <i className="bi bi-check-lg text-success"></i>
                            )}
                        </span>
                    )}
                </div>
                {getError("ville_id")}
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
