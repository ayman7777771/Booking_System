import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import "animate.css";
import "@/../../resources/css/app.css";
import "@/../../resources/css/login.css";
// ********************************************//
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/step4_prov";
import Step5 from "./Steps/Step5_prov";
import Step6 from "./Steps/Step6_prov";
// ********************************************//
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
        category_id: "",
        description: "",
        main_image: null,
        working_hours: {
            lun: [],
            mar: [],
            mer: [],
            jeu: [],
            ven: [],
            sam: [],
            dim: [],
        },
    });
    const [error, setError] = useState({});
    const [photoUrl, setPhotoUrl] = useState(null);
    const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
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
        if (step === 4 && data.role === "provider") {
            if (!data.main_image) {
                e.main_image = "L'image de couverture est obligatoire";
            }
        }
        if (step === 5 && data.role === "provider") {
            if (!data.category_id) {
                e.category_id = "Veuillez choisir une catégorie";
            }
            if (!data.description || data.description.trim().length < 20) {
                e.description =
                    "La description doit contenir au moins 20 caractères";
            }
        }
        if (step === 6 && data.role === "provider") {
            // نتأكد هل هناك أي يوم يحتوي على ساعات مختارة
            const hasHours = Object.values(data.working_hours).some(
                (daySlots) => daySlots.length > 0,
            );

            if (!hasHours) {
                e.working_hours =
                    "Veuillez sélectionner au moins une heure de travail pour continuer.";
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
    const allErrors = { ...errors, ...error };
    const getError = (field) => {
        const msg = allErrors[field];
        if (!msg) return null;

        return (
            <small className="is-invalid-prov text-muted d-block">{msg}</small>
        );
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

    const removePhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setData("photo_profile", null);
        URL.revokeObjectURL(photoUrl);
        setPhotoUrl(null);
    };

    const handleMainPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (mainPhotoUrl) URL.revokeObjectURL(mainPhotoUrl);
            setData("main_image", file);
            setMainPhotoUrl(URL.createObjectURL(file));
        }
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
                        Étape {step} sur {data.role === "provider" ? 6 : 3}
                    </p>
                </div>

                <form onSubmit={submit} noValidate>
                    {step === 1 && (
                        <Step1
                            data={data}
                            error={allErrors}
                            getError={getError}
                            isNameValid={isNameValid}
                            isEmailValid={isEmailValid}
                            hundleChange={hundleChange}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 2 && (
                        <Step2
                            data={data}
                            error={allErrors}
                            getError={getError}
                            isPasswordValid={isPasswordValid}
                            isPasswordMatch={isPasswordMatch}
                            hundleChange={hundleChange}
                            setStep={setStep}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 3 && (
                        <Step3
                            data={data}
                            error={allErrors}
                            getError={getError}
                            photoUrl={photoUrl}
                            handlePhotoChange={handlePhotoChange}
                            setStep={setStep}
                            nextStep={nextStep}
                            removePhoto={removePhoto}
                            processing={processing}
                        />
                    )}
                    {step === 4 && (
                        <Step4
                            error={allErrors}
                            mainPhotoUrl={mainPhotoUrl}
                            handleMainPhotoChange={handleMainPhotoChange}
                            setStep={setStep}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 5 && (
                        <Step5
                            data={data}
                            nextStep={nextStep}
                            setStep={setStep}
                            hundleChange={hundleChange}
                            error={allErrors}
                            getError={getError}
                        />
                    )}
                    {step === 6 && (
                        <Step6
                            data={data}
                            setData={setData}
                            setStep={setStep}
                            processing={processing}
                        />
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
