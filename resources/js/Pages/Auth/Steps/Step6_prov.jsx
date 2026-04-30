import React, { useState } from "react";

export default function Step6({ data, setData, setStep, processing }) {
    const daysMapping = {
        lun: "Lun", mar: "Mar", mer: "Mer",
        jeu: "Jeu", ven: "Ven", sam: "Sam", dim: "Dim"
    };

    const timeSlots = [];
    for (let i = 6; i <= 24; i++) {
        timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
    }

    const toggleSlot = (day, slot) => {
        const currentDaySlots = data.working_hours[day] || [];
        let newSlots;

        if (currentDaySlots.includes(slot)) {
            newSlots = currentDaySlots.filter(s => s !== slot);
        } else {
            newSlots = [...currentDaySlots, slot];
        }

        setData("working_hours", {
            ...data.working_hours,
            [day]: newSlots
        });
    };

    return (
        <div className="animate__animated animate__fadeIn">
            <h5 className="text-center fw-bold mb-1">Votre Agenda</h5>
            <p className="text-muted text-center small mb-3">Cliquez sur les heures qui seront disponibles.</p>

          <div className="table-responsive border rounded bg-white shadow-sm" style={{ maxHeight: '380px' }}>
    <table className="table table-sm table-bordered mb-0 text-center">
        <thead className="bg-light sticky-top">
            <tr>
                <th className="small py-2" style={{ width: '60px' }}>Heure</th>
                {Object.entries(daysMapping).map(([key, label]) => (
                    <th key={key} className="small py-2">{label}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {timeSlots.map((slot) => (
                <tr key={slot}>
                    <td className="small align-middle fw-bold bg-light" style={{ fontSize: '11px' }}>
                        {slot}
                    </td>
                    {Object.keys(daysMapping).map((day) => {
                        const isSelected = data.working_hours[day]?.includes(slot);
                        return (
                            <td 
                                key={`${day}-${slot}`}
                                onClick={() => toggleSlot(day, slot)}
                                className="cursor-pointer transition-all"
                                style={{ 
                                    height: '35px',
                                    cursor: 'pointer',
                                    // نستخدم لون البراند هنا عند الاختيار
                                    backgroundColor: isSelected ? '#3ed1e7' : 'transparent',
                                    // لون الحدود عند الاختيار ليعطي مظهراً متناسقاً
                                    borderColor: isSelected ? '#3ed1e7' : '',
                                    transition: '0.2s'
                                }}
                            >
                                {isSelected && <i className="bi bi-check-lg text-white"></i>}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    </table>
</div>

            <div className="d-flex gap-2 mt-3">
                <button type="button" className="btn btn-light w-50 border py-2" onClick={() => setStep(prev => prev - 1)}>
                    Retour
                </button>
                <button type="submit" className="btn-primary-custom w-50 py-2" disabled={processing}>
                    {processing ? <span className="spinner-border spinner-border-sm"></span> : "Terminer"}
                </button>
            </div>
        </div>
    );
}