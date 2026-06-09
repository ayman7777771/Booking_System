import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        window.dispatchEvent(new CustomEvent("theme-change", {
            detail: { isDark },
        }));
    }, [isDark]);

    const toggle = () => setIsDark(!isDark);

    return (
        <button
            type="button"
            onClick={toggle}
            className="theme-toggle-btn"
            title={isDark ? "Mode clair" : "Mode sombre"}
        >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span className="d-none d-xl-inline">{isDark ? "Light" : "Dark"}</span>
        </button>
    );
}
