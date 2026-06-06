// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// // import Filters from "@/Components/Filters";
// import ProvidersCards from "@/Components/ProvidersCards";

// export default function Dashboard(props) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <Filters
//                     filters={props.filters}
//                     villes={props.villes}
//                     categories={props.categories}
//                 />
//             }
//         >

//             <ProvidersCards providers={props.providers} />

//         </AuthenticatedLayout>
//     );
// }
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2>Dashboard</h2>
            }
            main={
                <div>
                    You're logged in!
                </div>
            }
        >
            <Head title="Dashboard" />

            
            

        </AuthenticatedLayout>
    );
}
