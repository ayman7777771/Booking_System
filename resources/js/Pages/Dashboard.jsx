import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Filters from "@/Components/Filters";
import ProvidersCards from "@/Components/ProvidersCards";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            header={
                <Filters
                    filters={props.filters}
                    villes={props.villes}
                    categories={props.categories}
                />
            }
        >

            <ProvidersCards providers={props.providers} />

        </AuthenticatedLayout>
    );
}