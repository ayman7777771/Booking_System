import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [isDark]);

    const toggle = () => setIsDark(!isDark);

    return (
        <button
            onClick={toggle}
            className="theme-toggle-btn"
            style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: "var(--brand-gradient)",
                color: "white",
                fontSize: "20px",
                boxShadow: "0 4px 15px rgba(25, 4, 182, 0.3)",
                transition: "var(--transition)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}