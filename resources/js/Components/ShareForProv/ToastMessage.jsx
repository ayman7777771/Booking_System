import React from "react";

export default function ToastMessage({ toast, onClose }) {
    if (!toast) {
        return null;
    }

    return (
        <div
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: 1080 }}
        >
            <div
                className={`toast show text-bg-${toast.type || "success"} border-0`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body">{toast.message}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        onClick={onClose}
                        aria-label="Fermer"
                    />
                </div>
            </div>
        </div>
    );
}
