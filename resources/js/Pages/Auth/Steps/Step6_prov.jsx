import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* ── إصلاح أيقونة Leaflet الافتراضية ── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ── إحداثيات المدن المغربية ── */
const CITY_COORDS = {
    fes: [34.0331, -5.0003],
    casablanca: [33.5731, -7.5898],
    rabat: [34.0209, -6.8416],
    marrakech: [31.6295, -7.9811],
    tanger: [35.7595, -5.834],
    agadir: [30.4278, -9.5981],
    meknes: [33.8935, -5.5473],
    oujda: [34.6814, -1.9086],
    kenitra: [34.261, -6.5802],
    tetouan: [35.5785, -5.3684],
};

/* ── يحرك الخريطة عند تغيير المدينة ── */
function MapCenterUpdater({ ville }) {
    const map = useMap();
    useEffect(() => {
        const coords = CITY_COORDS[ville?.toLowerCase()];
        if (coords) map.flyTo(coords, 13, { duration: 1.2 });
    }, [ville, map]);
    return null;
}

/* ── يضع الدبوس عند النقر ── */
function ClickHandler({ onPlace }) {
    useMapEvents({
        click(e) {
            onPlace([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

/* ══════════════════════════════════════
   STEP MAP — اختيار الموقع
══════════════════════════════════════ */
export default function Step6({
    data,
    setData,
    setStep,
    nextStep,
    error,
    getError,
    handleChange,
}) {
    const [position, setPosition] = useState(null);
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute("data-theme") === "dark",
    );
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(
                document.documentElement.getAttribute("data-theme") === "dark",
            );
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });
        return () => observer.disconnect();
    }, []);

    const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    const defaultCenter = CITY_COORDS[data.ville?.toLowerCase()] ?? [
        33.9716, -6.8498,
    ];

    const handlePlace = (coords) => {
        setPosition(coords);
        setData("latitude", coords[0]);
        setData("longitude", coords[1]);
    };

    return (
        <div>
            <p className="text-muted small mb-3 text-center">
                🗺️ Cliquez sur la carte pour indiquer votre emplacement exact
            </p>

            <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{
                    height: "280px",
                    width: "100%",
                    borderRadius: "12px",
                    border: isDark
                        ? "1px solid rgba(62,209,231,0.2)"
                        : "1px solid #e0e0e0",
                }}
            >
                {/* ✅ attribution داخل TileLayer مباشرة — هذا هو الصحيح */}
                <TileLayer
                    url={tileUrl}
                    attribution='&copy; <a href="https://carto.com">CARTO</a> | &copy; <a href="https://www.openstreetmap.org">OSM</a>'
                />
                <MapCenterUpdater ville={data.ville} />
                <ClickHandler onPlace={handlePlace} />
                {position && <Marker position={position} />}
            </MapContainer>

            <div className="mt-2" style={{ minHeight: "19px" }}>
                {error.location ? (
                    <small
                        className="text-danger animate__animated animate__shakeX animate__faster"
                        style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginLeft: "5px",
                        }}
                    >
                        {error.location}
                    </small>
                ) : (
                    <p className="small text-muted text-center">
                        {position
                            ? `📍 ${position[0].toFixed(5)}, ${position[1].toFixed(5)}`
                            : "Aucun emplacement sélectionné"}
                    </p>
                )}
            </div>

            <div className="d-flex gap-2 mt-4">
                <button
                    type="button"
                    className="btn btn-light w-50 border"
                    onClick={() => setStep((prev) => prev - 1)}
                >
                    Retour
                </button>
                <button
                    type="button"
                    className="btn-primary-custom w-50"
                    onClick={nextStep}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
