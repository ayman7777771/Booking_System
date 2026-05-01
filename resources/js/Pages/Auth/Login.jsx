import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import "@/../../resources/css/app.css";
import "@/../../resources/css/login.css";
import ThemeToggle from "@/Components/ThemeToggle";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            email: "",
            password: "",
            remember: false,
        });

    const handleInputChange = (field, value) => {
        setData(field, value);
        if (errors[field]) {
            clearErrors(field);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

    return (
        <GuestLayout>
            <ThemeToggle />
            <Head title="Connexion" />

            <div className="auth-wrapper">
                <div className="auth-card">
                    <p className="text-center text-muted small mb-4">
                        Bon retour parmi nous
                    </p>

                    {status && (
                        <div className="alert alert-success small mb-3">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} noValidate>
                        <div className="field-group mb-4">
                            <div className="input-box">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={`custom-input ${
                                        errors.email
                                            ? "is-invalid"
                                            : data.email
                                              ? isEmailValid
                                                  ? "is-valid"
                                                  : "is-warning"
                                              : ""
                                    }`}
                                    autoComplete="username"
                                    placeholder=" "
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <label htmlFor="email">
                                    Adresse Email{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </label>

                                {data.email && (
                                    <span className="input-status-icon">
                                        {errors.email ? (
                                            <i className="bi bi-x-lg text-danger"></i>
                                        ) : isEmailValid ? (
                                            <i className="bi bi-check-lg text-success"></i>
                                        ) : (
                                            <i className="bi bi-exclamation-triangle text-warning"></i>
                                        )}
                                    </span>
                                )}
                            </div>
                            {errors.email && (
                                <small
                                    className="error-m "
                                    style={{ margin: "17px" }}
                                >
                                    {errors.email}
                                </small>
                            )}
                        </div>

                        <div className="field-group">
                            <div className="input-box">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={`custom-input ${errors.password ? "is-invalid" : ""}`}
                                    autoComplete="current-password"
                                    placeholder=" "
                                    onChange={(e) =>
                                        handleInputChange("password", e.target.value)
                                    }
                                    required
                                />
                                <label htmlFor="password">
                                    Mot de passe{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </label>

                                {errors.password && (
                                    <span className="input-status-icon">
                                        <i className="bi bi-x-lg text-danger"></i>
                                    </span>
                                )}
                            </div>
                            {errors.password && (
                                <small
                                    className="error-m"
                                    style={{ margin: "17px" }}
                                >
                                    {errors.password}
                                </small>
                            )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <label
                                className="d-flex align-items-center gap-2 small"
                                style={{
                                    fontWeight: "normal",
                                    cursor: "pointer",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                Souvenez-vous de moi
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="small text-decoration-none"
                                    style={{ color: "var(--brand-blue)" }}
                                >
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn-primary-custom w-100"
                            disabled={processing}
                        >
                            {processing ? (
                                "Chargement..."
                            ) : (
                                <>
                                    Se connecter{" "}
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </>
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <Link
                                href={route("register")}
                                className="text-decoration-none small text-muted"
                            >
                                Pas encore de compte ?{" "}
                                <span
                                    style={{
                                        color: "var(--brand-blue)",
                                        fontWeight: "600",
                                    }}
                                >
                                    S'inscrire
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
