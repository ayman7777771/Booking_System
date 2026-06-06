import { Head, router, useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Map from "@/Components/Map";
import About from "@/Components/ShareForProv/About";
import PhotoGallery from "@/Components/ShareForProv/PhotoGallery";
import PhotoSection from "@/Components/ShareForProv/PhotoSection";
import Planning from "@/Components/ShareForProv/Planning";
import ReservationRequests from "@/Components/ShareForProv/ReservationRequests";
import ServiceTable from "@/Components/ShareForProv/ServicesTable";
import ToastMessage from "@/Components/ShareForProv/ToastMessage";
import ProviderLayout from "@/Layouts/ProviderLayout";
import "@/../css/ProviderDashboard.css";

const days = { Lun: "lun", Mar: "mar", Mer: "mer", Jeu: "jeu", Ven: "ven", Sam: "sam", Dim: "dim" };
const toHours = (plannings = []) =>
    plannings.reduce((items, planning) => days[planning.day] ? { ...items, [days[planning.day]]: planning.time || [] } : items, {});
const valeurPresente = (value) => value !== null && value !== undefined && value !== "";
const imageUrl = (path) => {
    if (!path) {
        return null;
    }

    return path.startsWith("http") || path.startsWith("/") ? path : `/storage/${path}`;
};
const donneesProfil = (provider) => ({
    service: provider?.service || "",
    categorie_id: `${provider?.categorie_id || provider?.categorie?.id || ""}`,
    description: provider?.description || "",
    longitude: provider?.longitude ?? "",
    latitude: provider?.latitude ?? "",
    main_photo: null,
});


export default function Dashboard({ provider, categories = [], reservations = [] }) {


    const services = provider?.services || [];
    const photos = useMemo(() => services.flatMap((service) => service.photos || []), [services]);
    const [toast, setToast] = useState(null);
    const [planning, setPlanning] = useState(toHours(provider?.plannings));
    const [clearPhoto, setClearPhoto] = useState(0);
    const [editingService, setEditingService] = useState(null);
    const [enregistrement, setEnregistrement] = useState(false);
    const profile = useForm(donneesProfil(provider));
    const gallery = useForm({ service_id: `${services[0]?.id || ""}`, photos: [] });
    const agenda = useForm({ working_hours: planning });
    const service = useForm({ name: "", prix: "", duration: "" });
    const preview = profile.data.main_photo
        ? URL.createObjectURL(profile.data.main_photo)
        : imageUrl(provider?.main_photo);
    const positionProfil = valeurPresente(profile.data.longitude) && valeurPresente(profile.data.latitude)
        ? [Number(profile.data.longitude), Number(profile.data.latitude)]
        : null;

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timer = setTimeout(() => setToast(null), 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        if (!provider) {
            return;
        }

        const heures = toHours(provider.plannings);

        profile.setData(donneesProfil(provider));
        setPlanning(heures);
        agenda.setData("working_hours", heures);
        gallery.setData("service_id", `${provider.services?.[0]?.id || ""}`);
    }, [provider?.id]);

    const notify = (type, message) => setToast({ type, message });
    const executerFormulaire = (form, method, url, options = {}) =>
        new Promise((resolve, reject) => {
            form[method](url, {
                ...options,
                onSuccess: () => resolve(),
                onError: (errors) => reject(errors),
            });
        });
    const enregistrerService = () => {
        const url = editingService
            ? route("provider.services.update", editingService)
            : route("provider.services.store");
        const method = editingService ? "put" : "post";

        return executerFormulaire(service, method, url, { preserveScroll: true });
    };
   const enregistrerTout = async () => {
    const hasServiceData = Object.values(service.data)
        .some(value => `${value}`.trim());

    const hasMainPhoto = !!profile.data.main_photo;
    const hasGalleryPhotos =
        gallery.data.service_id &&
        gallery.data.photos.length > 0;

    const profileChanged =
        hasMainPhoto ||
        profile.data.description !== provider.description ||
        profile.data.service !== provider.service ||
        profile.data.categorie_id !== `${provider?.categorie_id || provider?.categorie?.id || ""}` ||
        profile.data.longitude !== (provider?.longitude ?? "") ||
        profile.data.latitude !== (provider?.latitude ?? "");

    setEnregistrement(true);

    try {
        if (profileChanged) {
            await executerFormulaire(
                profile,
                "patch",
                route("provider.profile.update", provider.id),
                {
                    forceFormData: true,
                    preserveScroll: true,
                }
            );
        }

        await executerFormulaire(
            agenda,
            "post",
            route("provider.plannings.store"),
            { preserveScroll: true }
        );

        if (hasGalleryPhotos) {
            await executerFormulaire(
                gallery,
                "post",
                route("provider.services.photos.store", gallery.data.service_id),
                {
                    forceFormData: true,
                    preserveScroll: true,
                }
            );

            gallery.reset("photos");
            setClearPhoto(n => n + 1);
        }

        if (hasServiceData) {
            await enregistrerService();
            setEditingService(null);
            service.setData({
                name: "",
                prix: "",
                duration: "",
            });
        }

        notify("success", "Toutes les informations ont ete enregistrees.");
    } catch (errors) {
        notify(
            "danger",
            Object.values(errors || {})[0] ||
            "Verifiez les informations avant d'enregistrer."
        );
    } finally {
        setEnregistrement(false);
    }
};
    const enCoursEnregistrement = enregistrement || profile.processing || gallery.processing || agenda.processing || service.processing;
    const isReady =
    provider &&
    provider.user &&
    provider.services &&
    provider.description &&
    provider.plannings;

    if (!isReady) {
        return <ProviderLayout><div className="provider-dashboard min-vh-100 p-4">Chargement...</div></ProviderLayout>;
    }

    return (
        <ProviderLayout>
            <Head title="Tableau de bord" />
            <div className="provider-dashboard min-vh-100 p-3 p-xl-4">
                <div className="provider-dashboard-header d-flex align-items-center justify-content-between gap-3 mb-3">
                    <h1 className="h5 fw-bold mb-0">Tableau de Bord du Prestataire: {provider.user?.name}</h1>
                    <button className="btn btn-info btn-sm text-dark fw-bold" type="button" onClick={enregistrerTout} disabled={enCoursEnregistrement}>
                        <Save size={15} /> Enregistrer
                    </button>
                </div>

                <div className="row g-3">
                    <div className="col-12 col-xl-7">
                        <div className="provider-panel h-100">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <h2 className="panel-title">Photo Principale</h2>
                                    <PhotoSection provider={provider} isEdit preview={preview} onChange={(file) => profile.setData("main_photo", file)} />
                                </div>
                                <div className="col-md-6">
                                    <h2 className="panel-title">Galerie de Photos</h2>
                                    <PhotoGallery
                                        photos={photos}
                                        isEdit
                                        processing={gallery.processing}
                                        onServiceChange={(id) => gallery.setData("service_id", id)}
                                        onFilesChange={(files) => gallery.setData("photos", files)}
                                        onUpload={() => {}}
                                        showUploadButton={false}
                                        onClearPhoto={clearPhoto}
                                    />
                                </div>
                                <div className="col-12">
                                 { console.log(profile.data.description)}
                                    <About description={profile.data.description} editable isDashboard onChange={(value) => profile.setData("description", value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-5">
                        <div className="provider-panel map-panel h-100">
                            <h2 className="panel-title">Geolocalisation</h2>
                            <Map
                                mode="picker"
                                height="230px"
                                value={positionProfil}
                                onChange={([longitude, latitude]) => profile.setData({ ...profile.data, longitude, latitude })}
                            />
                            <div className="row g-2 mt-3">
                                <div className="col-md-7">
                                    <label className="form-label panel-title mb-1">Service</label>
                                    <input className="form-control dashboard-input" value={profile.data.service} onChange={(e) => profile.setData("service", e.target.value)} />
                                </div>
                                <div className="col-md-5">
                                    <label className="form-label panel-title mb-1">Categorie</label>
                                    <select className="form-select dashboard-input" value={profile.data.categorie_id} onChange={(e) => profile.setData("categorie_id", e.target.value)}>
                                        <option value="">Choisir</option>
                                        {categories.map((category) => <option key={category.id} value={`${category.id}`}>{category.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-3 mt-1">
                    <div className="col-12 col-xl-7">
                        <div className="provider-panel agenda-panel">
                            <Planning
                                plannings={provider.plannings}
                                value={planning}
                                isEdit
                                processing={agenda.processing}
                                showSaveButton={false}
                                onChange={(value) => {
                                    setPlanning(value);
                                    agenda.setData("working_hours", value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-xl-5">
                        <div className="provider-panel h-100">
                            <h2 className="panel-title">Gestion des Services Detailles</h2>
                            <ServiceTable
                                services={services}
                                isEdit
                                form={service}
                                editingId={editingService}
                                showSubmitButton={false}
                                onCancel={() => {
                                    setEditingService(null);
                                    service.setData({ name: "", prix: "", duration: "" });
                                }}
                                onEdit={(item) => {
                                    setEditingService(item.id);
                                    service.setData({ name: item.name, prix: item.prix, duration: item.duration });
                                }}
                                onDelete={(item) => router.delete(route("provider.services.destroy", item.id), { preserveScroll: true })}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="provider-panel"><ReservationRequests reservations={reservations} /></div>
                    </div>
                </div>
                <ToastMessage toast={toast} onClose={() => setToast(null)} />
            </div>
        </ProviderLayout>
    );
}
