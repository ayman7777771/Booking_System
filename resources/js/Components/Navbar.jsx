export default function Navbar({ user }) {
    return (
        <nav className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex-1 max-w-md">
                <input type="text" placeholder="Recherche..." className="..." />
            </div>
            
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold dark:text-white">{user.name}</p>
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="text-xs text-red-500 hover:underline"
                    >
                        Déconnexion
                    </Link>
                </div>
                <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full border" />
            </div>
        </nav>
    );
}