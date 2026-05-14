import Navbar from "@/Components/Navbar";

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="app-layout">

            <Navbar />

            {header && (
                <header className="page-header">
                    {header}
                </header>
            )}

            <main className="page-content">
                {children}
            </main>

        </div>
    );
}