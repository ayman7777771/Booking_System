import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// ... imports lokhrin

export default function Discover(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Découvrir</h2>}
        >
            {/* Hna l-content dyal l-page */}
        </AuthenticatedLayout>
    );
}