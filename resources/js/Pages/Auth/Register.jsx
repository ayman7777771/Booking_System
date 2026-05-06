import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import "animate.css";
import "@/../css/app.css";
import "@/../css/login.css";
import ThemeToggle from "@/Components/ThemeToggle";

// ********************************************//
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/step4_prov";
import Step5 from "./Steps/Step5_prov";
import Step6 from "./Steps/Step6_prov";
import Step7 from "./Steps/Step7_prov";

import validateStep from "./Steps/validateSteps";
// ********************************************//
// حفظ البيانات النصية والخطوة عند كل تغيير
// تُنفذ مرة واحدة عند تحميل الصفحة
export default function Register() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, reset } = useForm(
        {
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
            latitude: null,
            longitude: null,
        },
    );
    const [error, setError] = useState({});
    const [photoUrl, setPhotoUrl] = useState(null);
    const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
    const isNameValid =
        data.name.trim().length >= 3 &&
        /^[a-zA-Z\s\u0600-\u06FF-]+$/.test(data.name);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const isVilleValid = data.ville !== "";
    const isPasswordValid = data.password.length >= 8;
    const isPasswordMatch =
        data.password_confirmation === data.password && data.password !== "";

    const nextStep = () => {
        if (
            !validateStep(data, step, setError, {
                isNameValid,
                isEmailValid,
                isVilleValid,
                isPasswordValid,
                isPasswordMatch,
            })
        )
            return;
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

    const handleChange = (inputName, value) => {
        setData(inputName, value);
        setError(inputName, null);
    };
    // ========================================================
    // الدالة لي كاتعالج الصورة
    const handleFile = (input_Name, file) => {
        // 1. خريطة تربط كل حقل بصورة المعاينة الخاصة به
        const config = {
            photo_profile: { url: photoUrl, setter: setPhotoUrl },
            main_image: { url: mainPhotoUrl, setter: setMainPhotoUrl },
        };

        const { url, setter } = config[input_Name];

        if (url) URL.revokeObjectURL(url);

        setData(input_Name, file);

        // 5. إنشاء رابط أو مسحه إذا كانت القيمة null
        setter(file ? URL.createObjectURL(file) : null);

        if (errors[input_Name]) setError(input_Name, null);
    };
    ///////////////////////////////////////////////////
    //  هادي باينة ديالاش
    const submit = (e) => {
        e.preventDefault();
        if (
            !validateStep(data, step, setError, {
                isNameValid,
                isEmailValid,
                isVilleValid,
                isPasswordValid,
                isPasswordMatch,
                isVilleValid,
            })
        )
            return;
        post(route("register"), {
            onFinish: () => {
                reset("password", "password_confirmation");
            },
        });
    };

    return (
        <div className="auth-wrapper">
            <ThemeToggle />
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
                        Étape {step} sur {data.role === "provider" ? 7 : 3}
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
                            handleChange={handleChange}
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
                            handleChange={handleChange}
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
                            handleFile={handleFile}
                            setStep={setStep}
                            nextStep={nextStep}
                            processing={processing}
                        />
                    )}
                    {step === 4 && (
                        <Step4
                            error={allErrors}
                            mainPhotoUrl={mainPhotoUrl}
                            handleFile={handleFile}
                            setStep={setStep}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 5 && (
                        <Step5
                            data={data}
                            nextStep={nextStep}
                            setStep={setStep}
                            handleChange={handleChange}
                            error={allErrors}
                            getError={getError}
                        />
                    )}
                    {step === 6 && (
                        <Step6
                            data={data}
                            setData={setData}
                            nextStep={nextStep}
                            setStep={setStep}
                            error={allErrors}
                            setError={setError}
                        />
                    )}
                    {step === 7 && (
                        <Step7
                            data={data}
                            setData={setData}
                            setStep={setStep}
                            processing={processing}
                            error={allErrors}
                            getError={getError}
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
