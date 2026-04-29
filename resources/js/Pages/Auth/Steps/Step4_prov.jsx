const Step4 = ({
    data,
    error,
    getError,
    hundleChange,
    mainPhotoUrl, 
    handleMainPhotoChange,
    setStep,
    nextStep
}) => {
    return (
        <div className="animate__animated animate__fadeIn">
            <h5 className="text-center mb-4">Détails Professionnels</h5>

            {/* اختيار التخصص */}
            <div className="mb-3 text-start">
                <label className="form-label small fw-bold">Catégorie de service</label>
                <select 
                    className={`form-select ${error.category_id ? 'is-invalid' : ''}`}
                    value={data.category_id}
                    onChange={(e) => hundleChange("category_id", e.target.value)}
                >
                    <option value="">Sélectionnez votre domaine...</option>
                    <option value="1">Plomberie</option>
                    <option value="2">Électricité</option>
                    <option value="3">Menuiserie</option>
                </select>
                {getError("category_id")}
            </div>

            {/* الوصف المهني */}
            <div className="mb-3 text-start">
                <label className="form-label small fw-bold">Description du profil</label>
                <textarea 
                    className={`form-control ${error.description ? 'is-invalid' : ''}`}
                    rows="4"
                    placeholder="Décrivez vos services, votre expérience..."
                    value={data.description}
                    onChange={(e) => hundleChange("description", e.target.value)}
                ></textarea>
                {getError("description")}
            </div>

            {/* صورة الغلاف (Main Image) */}
            <div className="mb-3 text-start">
                <label className="form-label small fw-bold">Image de couverture (Portfolio Main)</label>
                <div 
                    className="cover-upload-wrapper border rounded-3 d-flex align-items-center justify-content-center bg-light position-relative"
                    style={{ height: '180px', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => document.getElementById('main-image-input').click()}
                >
                    {mainPhotoUrl ? (
                        <img src={mainPhotoUrl} alt="Cover" className="w-100 h-100 object-fit-cover" />
                    ) : (
                        <div className="text-center text-muted">
                            <i className="bi bi-images fs-1"></i>
                            <p className="mb-0 small">Cliquez pour télécharger votre image principale</p>
                        </div>
                    )}
                </div>
                <input 
                    type="file" 
                    id="main-image-input" 
                    hidden 
                    accept="image/*" 
                    onChange={handleMainPhotoChange} 
                />
            </div>

            <div className="d-flex gap-2 mt-4">
                <button type="button" className="btn btn-light w-50 border" onClick={() => setStep(prev => prev - 1)}>Retour</button>
                <button type="button" className="btn-primary-custom w-50" onClick={nextStep}>Suivant</button>
            </div>
        </div>
    );
};
export default Step4;