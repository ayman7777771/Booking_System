import { Upload } from "lucide-react";

const photoUrl = (path) => {
    if (!path) {
        return null;
    }

    return path.startsWith("http") || path.startsWith("/") ? path : `/storage/${path}`;
};

export default function PhotoSection({ provider, isEdit = false, preview, onChange }) {
    const mainPhoto = preview || photoUrl(provider?.main_photo);

    return (
        <label className="dashboard-main-photo">
            {mainPhoto ? (
                <img src={mainPhoto} alt="Principal" />
            ) : (
                <span>Aucune photo</span>
            )}
            {isEdit && (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => onChange?.(event.target.files[0] || null)}
                    />
                    <small>
                        <Upload size={14} /> Modifier
                    </small>
                </>
            )}
        </label>
    );
}
