const Step4 = ({
    error,
    mainPhotoUrl,
    handleFile,
    setStep,
    nextStep,
}) => {
    return (
        <div className="animate__animated animate__fadeIn">
            {/* Main Image */}
                <h5 className="text-center mb-4">Image Principale</h5>
            <div className="mb-3">
                <label htmlFor="main-image"
                    className="cover-upload-wrapper border rounded-3 d-flex align-items-center justify-content-center bg-light position-relative"
                    style={{
                        height: "180px",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                >
                    {mainPhotoUrl ? (
                        <img
                            src={mainPhotoUrl}
                            alt="Cover"
                            className="w-100 h-100 object-fit-cover"
                        />
                    ) : (
                        <div className="text-center text-muted">
                            <i className="bi bi-images fs-1"></i>
                            <p className="mb-0 small">
                                Cliquez pour télécharger votre image principale
                            </p>
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    id="main-image"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFile("main_image", e.target.files[0])}
                    required
                />
                <div className="mt-2" style={{ minHeight: "19px" }}>
                    {error.main_image && (
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
                            {error.main_image}
                        </small>
                    )}
                </div>{" "}
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
};
export default Step4;
