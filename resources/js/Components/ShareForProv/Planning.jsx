import { Save } from "lucide-react";
import WorkingHoursTable from "./WorkingHoursTable";

export default function Planning({
    plannings,
    value,
    isEdit = false,
    onChange,
    onSave,
    processing = false,
    showSaveButton = true,
}) {
    return (
        <div className="bg-dark rounded p-3">
            <h5 className="mb-3 text-white">
                <strong>Votre Agenda</strong>
            </h5>
            <WorkingHoursTable
                value={value}
                plannings={plannings}
                readOnly={!isEdit}
                onChange={onChange}
            />
            {isEdit && showSaveButton && (
                <button
                    className="btn btn-outline-info mt-3"
                    type="button"
                    onClick={onSave}
                    disabled={processing}
                >
                    <Save size={15} /> Enregistrer l'agenda
                </button>
            )}
        </div>
    );
}
