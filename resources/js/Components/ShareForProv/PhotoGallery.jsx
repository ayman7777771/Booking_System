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
    const champFichierRef = useRef(null);
    const [deletingPhotoId, setDeletingPhotoId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

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

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files || []);
        setSelectedFiles(files);
        onFilesChange?.(files);
    };

    const handleRemovePreview = (idx) => {
        const updated = selectedFiles.filter((_, i) => i !== idx);
        URL.revokeObjectURL(previewUrls[idx]);
        setSelectedFiles(updated);
        onFilesChange?.(updated);
    };

    const handleDeletePhoto = (photo) => {
        setDeletingPhotoId(photo.id);
        router.delete(route("provider.photos.destroy", photo.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingPhotoId(null);
                onRemove?.(photo);
            },
            onError: () => {
                setDeletingPhotoId(null);
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
                                    <img src={photoUrl(photo.path)} alt="Galerie" />
                                    {isEdit && (
                                        <button
                                            className="photo-delete-btn"
                                            type="button"
                                            onClick={() => handleDeletePhoto(photo)}
                                            disabled={deletingPhotoId === photo.id}
                                            title="Supprimer la photo"
                                            aria-label="Supprimer la photo"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {selectedFiles.map((file, idx) => (
                            <div key={`preview-${idx}`} className="dashboard-gallery-item-wrapper">
                                <div className="dashboard-gallery-item" style={{ opacity: 0.7 }}>
                                    <img src={previewUrls[idx]} alt="Aperçu" />
                                    {isEdit && (
                                        <button
                                            className="photo-delete-btn"
                                            type="button"
                                            onClick={() => handleRemovePreview(idx)}
                                            title="Supprimer l'aperçu"
                                            aria-label="Supprimer l'aperçu"
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
                            onClick={() => champFichierRef.current?.click()}
                        >
                            <Plus size={16} /> Ajouter une photo
                        </button>
                        <input
                            ref={champFichierRef}
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
        </div>
    );
}