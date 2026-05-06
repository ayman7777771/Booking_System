import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

export default function Map({
    mode = "view",
    value = null,
    onChange,
    height = "310px",
}) {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const markerRef = useRef(null);

    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState(null);
    const [gpsError, setGpsError] = useState(null);
    const [manualArea, setManualArea] = useState("");
    const [editMode, setEditMode] = useState(false);

    //  هنا كيتم انشاء الخريطة
    useEffect(() => {
        if (mapRef.current) return;

        mapRef.current = new maplibregl.Map({
            container: containerRef.current,
            style: "https://styles.trailsta.sh/osm-liberty.json",
            center: value || [-6.85, 33.97],
            zoom: 11,
        });

        if (mode !== "view") {
            mapRef.current.on("click", async (e) => {
                const coords = [e.lngLat.lng, e.lngLat.lat];

                setCoords(coords);
                onChange?.(coords);
                const address = await getAddress(coords);
                setAddress(address);
            });
        }

        return () => mapRef.current?.remove();
    }, []);

    //  الدالة لي كاتحدث ال📌
    const setMarker = (coords) => {
        if (markerRef.current) markerRef.current.remove();

        markerRef.current = new maplibregl.Marker()
            .setLngLat(coords)
            .addTo(mapRef.current);
    };

    //  هذا هو الجزء لي كيحرك الخريطة مع تغر coords
    useEffect(() => {
        if (!mapRef.current || !value) return;

        //📌
        setMarker(value);
        mapRef.current.flyTo({ center: value, zoom: 15 });
    }, [value]);

    /* GPS */
    const locateMe = () => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const coords = [pos.coords.longitude, pos.coords.latitude];
                setCoords(coords);
                onChange?.(coords);
                const address = await getAddress(coords);
                setAddress(address);
            },
            () => {
                setGpsError("Impossible de récupérer votre position");
            },
        );
    };

    const getAddress = async ([lon, lat]) => {
        const { data } = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
                params: { format: "json", lat, lon },
                headers: {
                    "Accept-Language": "fr",
                },
            },
        );
        return data.address;
    };

    return (
        <div>
            <div
                ref={containerRef}
                style={{
                    height,
                    borderRadius: "12px",
                }}
            />
            {gpsError ? (
                <div className="alert alert-danger text-center mt-2">
                    {gpsError}
                </div>
            ) : coords ? (
                <div className="small text-muted mt-2 text-center">
                    📍 {coords[0].toFixed(6)} , {coords[1].toFixed(6)} <br />
                    🏙️ {address?.city || "—"} ,{" "}
                    {(manualArea || "").trim() || address?.suburb || "—"} ,{" "}
                    {address?.road || "—"}
                    {/* EDIT MODE */}
                    {mode === "picker" && (
                        <div className="mt-2">
                            {editMode ? (
                                <div className="d-flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Corriger le quartier"
                                        className="form-control mt-2 custom-input text-success"
                                        value={manualArea}
                                        onChange={(e) =>
                                            setManualArea(e.target.value)
                                        }
                                    />
                                    <button
                                        className="btn mt-2"
                                        onClick={() => setEditMode(false)}
                                    >
                                        ✏
                                    </button>
                                </div>
                            ) : (
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setManualArea(address?.suburb || "");
                                        setEditMode(true);
                                    }}
                                >
                                    {manualArea ||
                                        address?.suburb ||
                                        "Entrez la zone ou le quartier"}
                                     (✏️)
                                </span>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="small text-muted mt-2 text-center">
                    Aucune position sélectionnée.
                </div>
            )}
            <button
                type="button"
                onClick={locateMe}
                className="btn btn-outline-primary w-100 "
            >
                📍 Ma position actuelle
            </button>
        </div>
    );
}
