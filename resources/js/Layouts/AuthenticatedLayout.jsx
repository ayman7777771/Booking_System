// import Navbar from "@/Components/Navbar";

// export default function AuthenticatedLayout({ header, children, footer }) {
//     return (
//         <div className="app-layout">

//             <Navbar />

//             {header && (
//                 <header className="page-header">
//                     {header}
//                 </header>
//             )}

//             <main className="page-content">
//                 {children}
//             </main>
//              {footer && (
//                 <footer className="page-footer">
//                     {footer}
//                 </footer>
//             )}
//         </div>
//     );
// }

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div>
            <nav>
                <div>
                    <div>
                        <Link href="/">
                            {/* <ApplicationLogo /> */}
                            Home
                        </Link>
                    </div>

                    <div>
                        <Link href={route('dashboard')}>
                            Dashboard
                        </Link> {/* active={route().current('dashboard')} */}
                    </div>
                </div>

                <div>
                    {user.name}

                    <Link href={route('profile.edit')}>
                        Profile
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                    >
                        Log Out
                    </Link>
                </div>
            </nav>

            {header && (
                <header>
                    <div>
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
