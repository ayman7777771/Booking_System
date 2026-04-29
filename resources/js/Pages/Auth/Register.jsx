import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import "animate.css";
import "@/../../resources/css/app.css";
import "@/../../resources/css/login.css";

export default function Register() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        ville: "",
        photo_profile: "",
        role: "client",
    });
    const [error, setError] = useState({});
    const [photoUrl, setPhotoUrl] = useState(null);

    const isNameValid = data.name.trim().length >= 3;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const isVilleValid = data.ville !== "";
    const isPasswordValid = data.password.length >= 8;
    const isPasswordMatch =
        data.password_confirmation === data.password && data.password !== "";

    //  finction خاصة بمراجعة ما ادخله المستخدم
    const validateStep = () => {
        const e = {};

        if (step === 1) {
            if (!data.name.trim()) e.name = " le Nom est obligatoire";
            else if (!isNameValid) e.name = "Min 3 caractères";

            if (!data.email.trim()) e.email = "L'email est obligatoire";
            else if (!isEmailValid) e.email = "Email invalide";

            if (!isVilleValid) e.ville = "La ville est obligatoire";
        }

        if (step === 2) {
            if (!data.password.trim())
                e.password = "Le mot de passe est obligatoire";
            else if (!isPasswordValid)
                e.password =
                    "Le mot de passe doit contenir au moins 8 caractères";

            if (!data.password_confirmation.trim()) {
                e.password_confirmation = "La confirmation est obligatoire";
            } else if (!isPasswordMatch) {
                e.password_confirmation =
                    "Les mots de passe ne correspondent pas";
            }
        }
        if (step === 3 && data.role === "provider" && !data.photo_profile) {
            e.photo =
                "La photo de profil est obligatoire pour les prestataires";
        }
        if (step === 3 && data.photo_profile) {
            const MAX_SIZE = 2 * 1024 * 1024;
            if (data.photo_profile.size > MAX_SIZE) {
                e.photo = "L'image est trop volumineuse (max 2 Mo)";
            }
        }
        setError(e);
        return Object.keys(e).length === 0;
    };

    // finction الخاصة ب الانتقال بي steps
    const nextStep = () => {
        if (!validateStep()) return;
        setStep((prev) => prev + 1);
    };
    //    function كاتفرق بين الاخطاط لي كيتحددو غير فالواجهة والاخطاء لي كيتحددو فsatabase
    const getError = (field) => {
        return error[field] || errors[field];
    };
    // function خاصة بتحديث data+ تعديل الاخطاء الخاصة ب رياكت

    const hundleChange = (inputName, value) => {
        setData(inputName, value);
        if (error[inputName]) {
            setError((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[inputName];
                return updatedErrors;
            });
        }
    };

    // الدالة لي كاتعالج الصورة
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (photoUrl) {
            URL.revokeObjectURL(photoUrl);
        }

        setError((prev) => {
            const updated = { ...prev };
            delete updated.photo;
            return updated;
        });
        setData("photo_profile", file);
        setPhotoUrl(URL.createObjectURL(file));
    };
    ///////////////////////////////////////////////////
    //  هادي باينة ديالاش
    const submit = (e) => {
        e.preventDefault();
        if (!validateStep()) return;
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="auth-wrapper">
            <Head title="Inscription" />

            <div className="auth-card">
                <div className="text-center mb-4">
                    <h2
                        className="fw-bold"
                        style={{ color: "var(--brand-blue)" }}
                    >
                        Créer un compte gratuite
                    </h2>

                    <p className="text-muted small">
                        Étape {step} sur {data.role === "provider" ? 4 : 3}
                    </p>
                </div>

                <form onSubmit={submit} noValidate>
                    {step === 1 && (
                        <div className="animate__animated animate__fadeIn">
                            {/* الاسم */}
                            <div className="field-group">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        className={` custom-input ${error.name ? "is-invalid" : data.name ? (isNameValid ? "is-valid" : "is-warning") : ""}`}
                                        value={data.name}
                                        onChange={(e) =>
                                            hundleChange("name", e.target.value)
                                        }
                                        required
                                        placeholder=" "
                                    />
                                    <label>
                                        Nom complet{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                                {getError("name") && (
                                    <small className="error-m">
                                        {getError("name")}
                                    </small>
                                )}
                            </div>

                            {/* الإيميل */}
                            <div className="field-group">
                                <div className="input-box">
                                    <input
                                        type="email"
                                        className={` custom-input ${error.email ? "is-invalid" : data.email ? (isEmailValid ? "is-valid" : "is-warning") : ""}`}
                                        value={data.email}
                                        onChange={(e) =>
                                            hundleChange(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                        required
                                        placeholder=" "
                                    />
                                    <label>
                                        Adresse Email{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                                {getError("email") && (
                                    <small className="error-m ">
                                        {getError("email")}
                                    </small>
                                )}
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
                                        onChange={(e) =>
                                            hundleChange(
                                                "ville",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    >
                                        <option value="" hidden></option>
                                        <option value="Fès">Fès</option>
                                        <option value="Rabat">Rabat</option>
                                        <option value="Casablanca">
                                            Casablanca
                                        </option>
                                        <option value="Tanger">Tanger</option>
                                    </select>
                                    <label>
                                        Ville{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                                {getError("ville") && (
                                    <small className="error-m">
                                        {getError("ville")}
                                    </small>
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn-primary-custom w-100 mt-3"
                                onClick={nextStep}
                            >
                                Suivant{" "}
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    )}

                    {step === 2 && (
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
                                            hundleChange(
                                                "password",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    <label>
                                        Mot de passe{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                                {error.password && (
                                    <small className="error-m">
                                        {error.password}
                                    </small>
                                )}
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
                                        Confirmation{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                                {error.password_confirmation && (
                                    <small className="error-m">
                                        {error.password_confirmation}
                                    </small>
                                )}
                            </div>
                            {/*    ////////////////////////////////////////////////////////////////////////////////////////////////////////////    */}
                            <label className="mb-2 fw-bold small text-secondary">
                                Je m'inscris en tant que :
                            </label>

                            <div className="role-selection">
                                <div
                                    className={`role-box ${data.role === "client" ? "active" : ""}`}
                                    onClick={() => setData("role", "client")}
                                >
                                    <i className="bi bi-person-fill"></i> Client
                                </div>
                                {/* //////////////////////////////////// */}
                                <div
                                    className={`role-box ${data.role === "provider" ? "active" : ""}`}
                                    onClick={() => setData("role", "provider")}
                                >
                                    <i className="bi bi-briefcase-fill"></i>{" "}
                                    Prestataire
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
                    )}

                    {step === 3 && (
                        <div className="animate__animated animate__fadeIn text-center">
                            <h5 className="mb-4">
                                Photo de profil{" "}
                                {data.role === "provider" && (
                                    <span style={{ color: "red" }}> *</span>
                                )}
                            </h5>

                            <div className="profile-upload-container">
                                <div className="profile-avatar-preview">
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt="Preview"
                                            className="avatar-img"
                                        />
                                    ) : (
                                        <i
                                            className={`bi ${data.role === "provider" ? "bi-briefcase-fill" : "bi-person-fill"} default-avatar-icon`}
                                        ></i>
                                    )}

                                    <label
                                        htmlFor="photo-input"
                                        className="upload-plus-btn"
                                    >
                                        <i className="bi bi-plus-lg"></i>
                                    </label>
                                </div>

                                <input
                                    type="file"
                                    id="photo-input"
                                    hidden
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </div>

                            <p
                                className={`small mt-3 ${error.photo ? "is-invalid-photo-prov" : "text-muted"}`}
                            >
                                {error.photo
                                    ? error.photo // ← يعرض رسالة الخطأ المحددة
                                    : data.role === "provider"
                                      ? "Photo de profil obligatoire"
                                      : "Ajouter une photo de profil (Optionnel)"}
                            </p>
                            <div className="d-flex gap-2 mt-5">
                                <button
                                    type="button"
                                    className="btn btn-light w-50 border"
                                    onClick={() => setStep((prev) => prev - 1)}
                                >
                                    Retour
                                </button>
                                <button
                                    type={
                                        data.role === "provider"
                                            ? "button"
                                            : "submit"
                                    }
                                    className="btn-primary-custom w-50"
                                    disabled={processing}
                                    onClick={
                                        data.role === "provider"
                                            ? nextStep
                                            : undefined
                                    }
                                >
                                    {data.role === "provider"
                                        ? "Suivant"
                                        : "S'inscrire"}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h3>step4</h3>
                            <div className="d-flex gap-2 mt-5">
                                <button
                                    type="button"
                                    className="btn btn-light w-50 border"
                                    onClick={() => setStep((prev) => prev - 1)}
                                >
                                    Retour
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary-custom w-50"
                                    disabled={processing}
                                >
                                    S'inscrire
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-4">
                        <Link
                            href={route("login")}
                            className="text-decoration-none small text-muted"
                        >
                            Vous avez déjà un compte ?{" "}
                            <span
                                style={{
                                    color: "var(--brand-blue)",

                                    fontWeight: "600",
                                }}
                            >
                                Se connecter
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
