import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar'; // Checki l-masar dialo
import Navbar from '@/Components/Navbar';   // Checki l-masar dialo

export default function AuthenticatedLayout({ header, children }) {
    // Kanghibo l-user mn Inertia bach n-khdmo bih
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* 1. Sidebar li saybna */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* 2. Navbar dyalna (ghadi n-sifto lih l-user ka Prop) */}
                <Navbar user={user} />

                {/* 3. Header (Optional - ila knti katsiftiha mn l-Page) */}
                {header && (
                    <header className="bg-white dark:bg-slate-900 shadow-sm px-8 py-4 border-b dark:border-slate-800">
                        <div className="text-xl font-semibold dark:text-white">
                            {header}
                        </div>
                    </header>
                )}

                {/* 4. L-mohtawa dyal l-page (L-cards, etc.) */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}