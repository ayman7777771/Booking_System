import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import ProvInfo from "@/Components/ShareForProv/ProvInfo";
import ProviderLayout from "@/Layouts/ProviderLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import About from "@/Components/ShareForProv/About";
import Map from "@/Components/Map";
import PhotoGallery from "@/Components/ShareForProv/PhotoGallery";
import ServiceTable from "@/Components/ShareForProv/ServicesTable";
import WorkingHoursTable from "@/Components/ShareForProv/WorkingHoursTable";
import BookingModal from "@/Components/ShareForProv/BookingModal";
import ToastMessage from "@/Components/ShareForProv/ToastMessage";
import "@/../css/ProviderDashboard.css";
import "@/../css/ProviderProfile.css";

export default function Profile({ provider }) {
    const { auth } = usePage().props;
    const [serviceToReserve, setServiceToReserve] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timer = setTimeout(() => setToast(null), 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    if (!provider) {
        return <div className="text-white text-center p-5">Chargement...</div>;
    }

    const services = provider.services || [];
    const photos = services.flatMap((service) => service.photos || []);
    const position = provider.longitude && provider.latitude
        ? [Number(provider.longitude), Number(provider.latitude)]
        : null;

    const openReservation = (service) => {
        if (!auth?.user) {
            setToast({
                type: "warning",
                message: "Connectez-vous pour reserver.",
            });

            return;
        }

        setServiceToReserve(service);
        setToast({
            type: "info",
            message: "Choisissez une date puis un horaire disponible.",
        });
    };

    const confirmReservation = (reservation) => {
        router.post(route("reservations.store"), reservation, {
            preserveScroll: true,
            onSuccess: () => {
                setServiceToReserve(null);
                setToast({
                    type: "success",
                    message: "Votre demande de reservation a ete envoyee.",
                });
            },
            onError: (errors) => {
                setToast({
                    type: "danger",
                    message:
                        Object.values(errors)[0] ||
                        "Impossible d'envoyer cette reservation.",
                });
            },
        });
    };

    const Layout = auth?.user?.role === "provider" ? ProviderLayout : AuthenticatedLayout;

    return (
        <Layout auth={auth}>
            <div className="provider-profile-page min-vh-100 p-4">
                <div className="card profile-card-dark rounded-3 overflow-hidden shadow mb-4 text-white">
                    <div className="container" style={{ maxWidth: "1000px" }}>
                        <ProvInfo provider={provider} />
                        <About description={provider.description} />
                        <div className="row g-3 mb-4">
                            <div className="col-lg-6">
                                <div className="provider-profile-section h-100">
                                    <h5 className="mb-3 fw-bold">Galerie de photos</h5>
                                    <PhotoGallery photos={photos} services={services} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="provider-profile-section h-100">
                                    <h5 className="mb-3 fw-bold">Localisation</h5>
                                    <Map mode="view" value={position} height="300px" />
                                </div>
                            </div>
                        </div>
                        <ServiceTable
                            services={services}
                            isEdit={false}
                            onReserve={openReservation}
                        />
                        <WorkingHoursTable
                            plannings={provider.plannings}
                            readOnly
                        />
                        {auth?.user?.role === "client" && (
                            <div className="mt-4 text-end">
                                <Link
                                    href={route("messages.index", provider.user.id)}
                                    className="btn btn-info fw-semibold"
                                >
                                    Envoyer un message
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <BookingModal
                    service={serviceToReserve}
                    plannings={provider.plannings}
                    onClose={() => setServiceToReserve(null)}
                    onConfirm={confirmReservation}
                />
                <ToastMessage toast={toast} onClose={() => setToast(null)} />
            </div>
        </Layout>
    );
}
