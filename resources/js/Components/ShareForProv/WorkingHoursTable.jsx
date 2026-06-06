import React from "react";

const DAYS = [
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

const toWorkingHours = (plannings = []) =>
    plannings.reduce((hours, planning) => {
        const day = DAYS.find((item) => item.name === planning.day);

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
    const enabledDayIds = enabledDays || DAYS.map((day) => day.id);

    const toggleSlot = (day, hour) => {
        if (readOnly || !onChange) {
            return;
        }

        const currentDayHours = selectedHours[day] || [];
        const nextDayHours = currentDayHours.includes(hour)
            ? currentDayHours.filter((slot) => slot !== hour)
            : [...currentDayHours, hour].sort();

        onChange({
            ...selectedHours,
            [day]: nextDayHours,
        });
    };

    const handleSlotClick = (day, hour, isSelected) => {
        if (onSlotSelect) {
            if (isSelected && enabledDayIds.includes(day.id)) {
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
                        {DAYS.map((day) => (
                            <th
                                key={day.id}
                                className="small py-2"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#e5eef6",
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
                            {DAYS.map((day) => {
                                const isSelected = selectedHours[
                                    day.id
                                ]?.includes(hour);
                                const isEnabled = enabledDayIds.includes(day.id);
                                const isChosen =
                                    selectedSlot?.day === day.id &&
                                    selectedSlot?.hour === hour;
                                const canClick =
                                    (!readOnly && onChange) ||
                                    (onSlotSelect && isSelected && isEnabled);

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
                                                onSlotSelect && !isEnabled ? 0.35 : 1,
                                            transition: "0.3s",
                                        }}
                                    >
                                        {(isSelected || isChosen) && (
                                            <i className="bi bi-check-lg text-white"></i>
                                        )}
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
