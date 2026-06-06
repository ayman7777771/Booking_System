import { Plus, X } from "lucide-react";
import { useRef } from "react";

const photoUrl = (path) => {
    if (!path) {
        return null;
    }

    return path.startsWith("http") || path.startsWith("/") ? path : `/storage/${path}`;
};

export default function PhotoGallery({
    photos = [],
    services = [],
    isEdit = false,
    serviceId = "",
    onServiceChange,
    onFilesChange,
    onUpload,
    onRemove,
    processing = false,
    showUploadButton = true,
}) {
    const champFichierRef = useRef(null);

    return (
        <div>
            <div className="dashboard-gallery">
                {photos.length ? (
                    photos.map((photo) => (
                        <div key={photo.id} className="dashboard-gallery-item">
                            <img src={photoUrl(photo.path)} alt="Galerie" />
                            {isEdit && onRemove && (
                                <button
                                    className="btn btn-sm btn-danger"
                                    type="button"
                                    onClick={() => onRemove?.(photo)}
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    ))
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
                            onChange={(event) => onFilesChange?.(Array.from(event.target.files))}
                        />
                    </div>
                    {showUploadButton && (
                        <div className="col-12">
                            <button
                                className="btn btn-info w-100"
                                type="button"
                                onClick={onUpload}
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
