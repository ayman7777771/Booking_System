import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import "@/../../resources/css/Guestlayout.css";

 
export default function GuestLayout({ children }) {
    return (
        <div className="guest-layout">
 
            {/* هيدر علوي أبيض مع الشعار */}
            <header className="guest-header">
                <Link href="/">
                    <ApplicationLogo className="nav-logo" />
                </Link>
            </header>
 
            <main className="guest-main">
                {children}
            </main>
 
        </div>
    );
}