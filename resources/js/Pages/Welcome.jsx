import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import ThemeToggle from "@/Components/ThemeToggle";
import "../../css/app.css";
import "../../css/Welcome.css";

export default function Welcome({ auth, flash, query }) {
    const [searchTerm, setSearchTerm] = useState(query || "");

    if (auth.user) return null;

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.get(
            "/search",
            { q: searchTerm },
            { preserveState: true, replace: true },
        );
    };
    const CheckIcon = ({ type }) => (
        <span className={`check-icon ${type}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>
    );

    return (
        <>
            <Head title="Booking System - Accueil" />

            <div className="landing-container">
                {/* ── NAVBAR ── */}
                <header className="nav-bar">
                    <div className="logo-section">
                        <ApplicationLogo className="nav-logo" /> <h3 className="logo-text">Booking System</h3>
                    </div>

                    <nav className="nav-actions">
                        <Link href="#" className="btn-outline">
                            EXPLORER LES SERVICES
                        </Link>
                        <div className="connecter">
                            <Link href={route("login")} className="link-text">
                                SE CONNECTER
                            </Link>
                            <Link
                                href={route("register")}
                                className="btn-filled"
                            >
                                S'INSCRIRE
                            </Link>
                        </div>
                    </nav>

                    <ThemeToggle />
                </header>

                {/* ── HERO ── */}
                <main className="hero-content">
                    {/* Titre */}
                    <div className="hero-text-block">
                        <h1 className="title">
                            Simplifiez vos <span>réservations</span>,<br />
                            boostez votre <span>activité.</span>
                        </h1>
                        <p className="subtitle">
                            Une plateforme unique pour connecter les
                            prestataires professionnels et leurs clients.
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className="search-wrapper">
                        <form
                            onSubmit={handleSearch}
                            className={`search-input-group ${flash?.error ? "error-border" : ""}`}
                        >
                            <span className="search-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line
                                        x1="21"
                                        y1="21"
                                        x2="16.65"
                                        y2="16.65"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Rechercher un service..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="search-button">
                                RECHERCHER
                            </button>
                        </form>
                        {flash?.error && (
                            <p className="search-error">{flash.error}</p>
                        )}
                    </div>

                    {/* Section inférieure */}
                    <div className="bottom-section">
                        <h2 className="section-title">
                            Pourquoi nous rejoindre?
                        </h2>

                        <div className="cards-grid">
                            {/* PRESTATAIRES */}
                            <div className="info-card purple">
                                <h3>PRESTATAIRES</h3>
                                <ul>
                                    <li>
                                        <CheckIcon type="purple" />
                                        <span>COUVRE LE MONDE ENTIER</span>
                                    </li>
                                    <li>
                                        <CheckIcon type="purple" />
                                        <span>RÉSERVATIONS FIABLES</span>
                                    </li>
                                    <li>
                                        <CheckIcon type="purple" />
                                        <span>LOCALISATION OPTIMISÉE</span>
                                    </li>
                                    <li>
                                        <CheckIcon type="purple" />
                                        <span>GÉRER VOTRE ÉQUIPE</span>
                                    </li>
                                </ul>
                            </div>

                            {/* CLIENTS */}
                            <div className="info-card teal">
                                <h3>CLIENTS</h3>
                                <ul>
                                    <li>
                                        <CheckIcon type="teal" />
                                        <span>GLOBAL CUSTOMER</span>
                                    </li>
                                    <li>
                                        <CheckIcon type="teal" />
                                        <span>RÉSERVATIONS FIABLES</span>
                                    </li>
                                    <li>
                                        <CheckIcon type="teal" />
                                        <span>TAST ACCUSTONSHIP</span>
                                    </li>
                                    <li>
                                        <CheckIcon type="teal" />
                                        <span>ULTIMATE BOOKINGS</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
