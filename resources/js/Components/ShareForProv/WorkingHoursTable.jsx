import React from "react";
import { CheckCircle } from "lucide-react";
const Jours = [
    { id: "lun", name: "Lun" },
    { id: "mar", name: "Mar" },
    { id: "mer", name: "Mer" },
    { id: "jeu", name: "Jeu" },
    { id: "ven", name: "Ven" },
    { id: "sam", name: "Sam" },
    { id: "dim", name: "Dim" },
];

const HOURS = Array.from({ length: 19 }, (_, index) => {
    const hour = index + 6;

    return `${hour.toString().padStart(2, "0")}:00`;
});
// دالة كاتحول من  { day: "Lun", time: ["09:00", "10:00"] } ل  lun: ["09:00", "10:00"],
const toWorkingHours = (plannings = []) =>
    plannings.reduce((hours, planning) => {
        const day = Jours.find((item) => item.name === planning.day);

        if (!day) {
            return hours;
        }
        return {
            ...hours,
            [day.id]: planning.time || [],
        };
    }, {});

export default function WorkingHoursTable({
    value,
    plannings,
    onChange,
    onSlotSelect,
    selectedSlot,
    enabledDays,
    readOnly = false,
    emptyText = "Aucun horaire disponible",
}) {
    const selectedHours = value || toWorkingHours(plannings);
    const hasHours = Object.values(selectedHours).some((hours) => hours?.length);
    const enabledDayId = enabledDays || Jours.map((d) => d.id);

    const toggleSlot = (day, hour) => {
        if (readOnly || !onChange) {
            return;
        }

        const currentD_H = selectedHours[day] || [];
        const nextD_H = currentD_H.includes(hour)
            ? currentD_H.filter((h) => h !== hour)
            : [...currentD_H, hour].sort();

        onChange({
            ...selectedHours,
            [day]: nextD_H,
        });
    };

    const handleSlotClick = (day, hour, isSelected) => {
        if (onSlotSelect) {
            if (isSelected && enabledDayId.includes(day.id)) {
                onSlotSelect({ day: day.id, dayName: day.name, hour });
            }

            return;
        }

        toggleSlot(day.id, hour);
    };

    if (readOnly && !hasHours) {
        return (
            <div className="border rounded shadow-sm p-3 text-center text-muted bg-light">
                {emptyText}
            </div>
        );
    }

    return (
        <div
            className="table-responsive border rounded shadow-sm"
            style={{ maxHeight: "350px" }}
        >
            <table className="table table-sm table-bordered mb-0 text-center">
                <thead className="bg-light sticky-top">
                    <tr>
                        <th
                            className="small py-2"
                            style={{ width: "60px", backgroundColor: "#e5eef6" }}
                        >
                            Heure
                        </th>
                        {Jours.map((day) => (
                            <th
                                key={day.id}
                                className="small py-2"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#dbebfa",
                                }}
                            >
                                {day.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {HOURS.map((hour) => (
                        <tr key={hour}>
                            <td
                                className="small align-middle fw-bold bg-light"
                                style={{ fontSize: "12px" }}
                            >
                                {hour}
                            </td>
                            {Jours.map((day) => {
                                const isSelected = selectedHours[
                                    day.id
                                ]?.includes(hour);

                                const isEnable = enabledDayId.includes(day.id);
                                const isChosen =selectedSlot?.day === day.id && selectedSlot?.hour === hour;
                                const canClick =
                                    (!readOnly && onChange) ||
                                    (onSlotSelect && isSelected && isEnable);

                                return (
                                    <td
                                        key={`${day.id}-${hour}`}
                                        onClick={() =>
                                            handleSlotClick(day, hour, isSelected)
                                        }
                                        className={canClick ? "user-select-none" : ""}
                                        style={{
                                            height: "35px",
                                            cursor: canClick ? "pointer" : "default",
                                            backgroundColor: isChosen
                                                ? "#198754"
                                                : isSelected
                                                  ? "#3ed1e7"
                                                  : "transparent",
                                            borderColor: isChosen
                                                ? "#198754"
                                                : isSelected
                                                  ? "#3ed1e7"
                                                  : "",
                                            opacity:
                                                onSlotSelect && !isEnable ? 0.35 : 1,
                                            transition: "0.3s",
                                        }}
                                    >
                                        {(isSelected || isChosen) && (
                                        <CheckCircle size={16} color="white" />                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
