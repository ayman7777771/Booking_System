const Step3 = ({
    data,
    error,
    photoUrl,
    handleFile,
    setStep,
    nextStep,
    processing,
}) => {
    return (
        <div className="animate__animated animate__fadeIn text-center">
            <h5 className="mb-4">
                Photo de profil{" "}
                {data.role === "provider" && (
                    <span style={{ color: "red" }}> *</span>
                )}
            </h5>
            <div className="profile-upload-container field-group">
                <label
                    htmlFor="photo-input"
                    className="profile-avatar"
                    style={{ cursor: "pointer" }}
                >
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt="Preview"
                            className="avatar-img"
                        />
                    ) : (
                        <i
                            className={`${data.role === "provider" ? "bi-briefcase-fill" : "bi-person-fill"} default-avatar`}
                        ></i>
                    )}

                    {photoUrl ? (
                        <div
                            className="upload-plus-btn bg-danger border-danger"
                            onClick={() => handleFile("photo_profile", null)}
                        >
                            <i className="bi bi-trash3-fill text-white"></i>
                        </div>
                    ) : (
                        <div className="upload-plus-btn">
                            <i className="bi-plus-lg"></i>
                        </div>
                    )}
                </label>

                <input
                    type="file"
                    id="photo-input"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFile("photo_profile", e.target.files[0])}
                />
            </div>

            <div className="mt-4 text-center" style={{ minHeight: "28px" }}>
                {error.photo ? (
                    <div
                        className="animate__animated animate__shakeX animate__faster"
                        style={{
                            color: "#dc3545",
                            fontWeight: "bold",
                            fontSize: "12px",
                        }}
                    >
                        <i className="bi bi-exclamation-circle-fill me-1"></i>
                        {error.photo}
                    </div>
                ) : (
                    <p className="small text-muted mb-0">
                        {data.role === "provider"
                            ? "Photo de profil obligatoire"
                            : "Ajouter une photo de profil (Optionnel)"}
                    </p>
                )}
            </div>

            <div className="d-flex gap-2 mt-5">
                <button
                    type="button"
                    className="btn btn-light w-50 border"
                    onClick={() => setStep((prev) => prev - 1)}
                >
                    Retour
                </button>
                <button
                    type={data.role === "provider" ? "button" : "submit"}
                    className="btn-primary-custom w-50"
                    disabled={processing}
                    onClick={data.role === "provider" ? nextStep : undefined}
                >
                    {data.role === "provider" ? "Suivant" : "S'inscrire"}
                </button>
            </div>
        </div>
    );
};

export default Step3;
