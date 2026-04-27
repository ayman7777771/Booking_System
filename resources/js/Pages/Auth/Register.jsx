import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
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

    const submit = (e) => {
        e.preventDefault();

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
                        Créer un compte
                    </h2>

                    <p className="text-muted small">
                        Étape {step} sur {data.role === "provider" ? 3 : 2}
                    </p>
                </div>

                <form onSubmit={submit}>
                    {/* Étape 1: Type de compte et Nom */}

                    {step === 1 && (
                        <div className="animate__animated animate__fadeIn">
                            <div className="mb-3">
                                <label className="form-label small">
                                    Nom complet{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                {errors.name && (
                                    <small className="text-danger">
                                        {errors.name}
                                    </small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label small">
                                    Adresse Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    placeholder="exemple@mail.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                {errors.email && (
                                    <small className="text-danger">
                                        {errors.email}
                                    </small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label small">
                                    Ville
                                </label>

                                <select
                                    className="form-select custom-input"
                                    value={data.ville}
                                    onChange={(e) =>
                                        setData("ville", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Sélectionnez votre ville
                                    </option>
                                    <option value="Fès">Fès</option>
                                    <option value="Rabat">Rabat</option>
                                    <option value="Casablanca">
                                        Casablanca
                                    </option>
                                    <option value="Tanger">Tanger</option>
                                </select>

                                <label className="mt-3">Photo profile</label>

                                <input
                                    type="file"
                                    className="form-control custom-input mt-2"
                                    onChange={(e) =>
                                        setData("photo_profile", e.target.value)
                                    }
                                />
                            </div>

                            <button
                                type="button"
                                className="btn-primary-custom w-100"
                                onClick={() => setStep(2)}
                            >
                                Suivant{" "}
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    )}

                    {/* Étape 2: Email, Ville et Sécurité ////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

                    {step === 2 && (
                        <div className="animate__animated animate__fadeIn">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className="form-label small">
                                        Mot de passe
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control custom-input"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mb-4">
                                    <label className="form-label small">
                                        Confirmation
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control custom-input"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
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
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light w-50 border"
                                    onClick={() => setStep(1)}
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
                                            ? () => setStep(3)
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

                    {step === 3 && (
                        <div>
                            <p>p3</p>
                            <button
                                type="button"
                                className="btn btn-light w-50 border"
                                onClick={() => setStep(1)}
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
                    )}

                    <div className="text-center mt-4">
                        <Link
                            href={route("login")}
                            className="text-decoration-none small text-muted"
                        >
                            Vous avez déjà un compte ?{" "}
                            <span
                                style={{
                                    color: "var(--brand-teal)",

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
