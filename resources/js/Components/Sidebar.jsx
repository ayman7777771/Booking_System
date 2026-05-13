import React from 'react';
import Sidebar from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white dark:bg-slate-900 h-screen border-r dark:border-slate-800 sticky top-0 hidden md:block">
            <div className="p-6">
                <h2 className="text-xl font-bold text-blue-600">Booking System</h2>
            </div>
            <nav className="mt-6 px-4 space-y-2">
                <Link href="/" className="block p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium">Discover</Link>
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300">Bookings</Link>
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300">Messages</Link>
            </nav>
        </aside>
    );
}