import { useRef, useState, useMemo, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { router } from "@inertiajs/react";
export default function PhotoGallery({
    photos = [],
    isEdit = false,
    onFilesChange,
    onUpload,
    onRemove,
    onClearPhoto,
    processing = false,
    showUploadButton = true,
}) {
    const FichierRef = useRef(null);
    const [deletePhotoId, setDeletePhotoId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openphoto, setOpenphoto] = useState(null);

    const previewUrls = useMemo(() => {
        return selectedFiles.map(file => URL.createObjectURL(file));
    }, [selectedFiles]);

    useEffect(() => {
        if (onClearPhoto !== undefined) {
            setSelectedFiles([]);
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        }
    }, [onClearPhoto]);
    const photoUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") || path.startsWith("/") ? path : `/storage/${path}`;
};

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles(files);
        onFilesChange?.(files);
    };

    const handleRemovePreview = (i) => {
        const updated = selectedFiles.filter((_, i) => i !== i);
        URL.revokeObjectURL(previewUrls[i]);
        setSelectedFiles(updated);
        onFilesChange?.(updated);
    };

    const handleDeletePhoto = (photo) => {
        setDeletePhotoId(photo.id);
        router.delete(route("provider.photos.destroy", photo.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeletePhotoId(null);
                onRemove?.(photo);
            },
            onError: () => {
                setDeletePhotoId(null);
            },
        });
    };

    const handleUpload = () => {
        onUpload?.();
        setSelectedFiles([]);
        previewUrls.forEach(url => URL.revokeObjectURL(url));
    };

    return (
        <div>
            <div className="dashboard-gallery">
                {photos.length || selectedFiles.length ? (
                    <>
                        {photos.map((photo) => (
                            <div key={photo.id} className="dashboard-gallery-item-wrapper">
                                <div className="dashboard-gallery-item">
                                    <img src={photoUrl(photo.path)}  onClick={() => setOpenphoto(photoUrl(photo.path))} style={{ cursor: "pointer" }}/>
                                    {isEdit && (
                                        <button
                                            className="photo-delete-btn"
                                            type="button"
                                            onClick={() => handleDeletePhoto(photo)}
                                            disabled={deletePhotoId === photo.id}
                                            title="Supprimer la photo"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {selectedFiles.map((f, i) => (
                            <div key={i} className="dashboard-gallery-item-wrapper">
                                <div className="dashboard-gallery-item" style={{ opacity: 0.7 }}>
                                    <img src={previewUrls[i]}/>
                                    {isEdit && (
                                        <button
                                            className="photo-delete-btn"
                                            type="button"
                                            onClick={() => handleRemovePreview(i)}
                                            title="Supprimer la photo"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="dashboard-empty-gallery">Aucune photo</div>
                )}
            </div>
            {isEdit && (
                <div className="mt-3 d-flex justify-content-center">
                    <div className="w-100">
                        <button
                            className="dashboard-file-button"
                            type="button"
                            onClick={() => FichierRef.current?.click()}
                        >
                            <Plus size={16} /> Ajouter une photo
                        </button>
                        <input
                            ref={FichierRef}
                            className="dashboard-file-input"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                        />
                    </div>
                    {showUploadButton && selectedFiles.length > 0 && (
                        <div className="col-12">
                            <button
                                className="btn btn-info w-100"
                                type="button"
                                onClick={handleUpload}
                                disabled={processing}
                            >
                                <Plus size={15} /> Ajouter des photos
                            </button>
                        </div>
                    )}
                </div>
            )}
            {openphoto && (
    <div
        onClick={() => setOpenphoto(null)}
        style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, cursor: "zoom-out",
        }}
    >
        <img src={openphoto} style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: "8px" }} />
    </div>
)}
        </div>
    );
}