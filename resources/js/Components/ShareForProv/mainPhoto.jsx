import { Upload } from "lucide-react";

export default function MainPhoto({ photo, isEdit = false }) {
    const getStorage = (path) => {
        if (!path || path.startsWith("http")) return null;
        return `/storage/${path}`;
    };

    const photoUrl = getStorage(photo);

    if (!isEdit) {
        return (
            <div
                className="bg-dark rounded overflow-hidden"
                style={{ height: "300px" }}
            >
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <div className="w-100 h-100 bg-secondary d-flex align-items-center justify-content-center">
                        <p className="text-white mb-0">Aucune photo</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="border-2 border-dashed rounded d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
            style={{ height: "300px", cursor: "pointer" }}
        >
            <div className="text-center">
                <Upload size={32} className="mb-2 mx-auto d-block text-white" />
                <p className="text-white small">Cliquez pour modifier</p>
            </div>
        </div>
    );
}
