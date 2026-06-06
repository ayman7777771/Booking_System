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

    const [coords, setCoords] = useState(value);
    const [address, setAddress] = useState(null);
    const [gpsError, setGpsError] = useState(null);
    const [manualArea, setManualArea] = useState("");
    const [editMode, setEditMode] = useState(false);

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

    const setMarker = (nextCoords) => {
        if (markerRef.current) {
            markerRef.current.remove();
        }

        markerRef.current = new maplibregl.Marker()
            .setLngLat(nextCoords)
            .addTo(mapRef.current);
    };

    useEffect(() => {
        if (mapRef.current) {
            return;
        }

        mapRef.current = new maplibregl.Map({
            container: containerRef.current,
            style: "https://styles.trailsta.sh/osm-liberty.json",
            center: value || [-6.85, 33.97],
            zoom: value ? 14 : 11,
        });

        if (mode !== "view") {
            mapRef.current.on("click", async (event) => {
                const nextCoords = [event.lngLat.lng, event.lngLat.lat];

                setCoords(nextCoords);
                setMarker(nextCoords);
                onChange?.(nextCoords);
                setAddress(await getAddress(nextCoords));
            });
        }

        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        if (!mapRef.current || !value) {
            return;
        }

        setCoords(value);
        setMarker(value);
        mapRef.current.flyTo({ center: value, zoom: 15 });
    }, [value]);

    const locateMe = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const nextCoords = [
                    position.coords.longitude,
                    position.coords.latitude,
                ];

                setCoords(nextCoords);
                setMarker(nextCoords);
                onChange?.(nextCoords);
                setAddress(await getAddress(nextCoords));
            },
            () => {
                setGpsError("Impossible de recuperer votre position");
            },
        );
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
                    {coords[0].toFixed(6)} , {coords[1].toFixed(6)}
                    {mode === "picker" && address && (
                        <div className="mt-2">
                            {editMode ? (
                                <div className="d-flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Corriger le quartier"
                                        className="form-control mt-2 custom-input text-success"
                                        value={manualArea}
                                        onChange={(event) =>
                                            setManualArea(event.target.value)
                                        }
                                    />
                                    <button
                                        className="btn mt-2"
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-link btn-sm"
                                    type="button"
                                    onClick={() => {
                                        setManualArea(address?.suburb || "");
                                        setEditMode(true);
                                    }}
                                >
                                    {(manualArea || "").trim() ||
                                        address?.suburb ||
                                        "Entrer la zone"}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="small text-muted mt-2 text-center">
                    Aucune position selectionnee.
                </div>
            )}
            {mode !== "view" && (
                <button
                    type="button"
                    onClick={locateMe}
                    className="btn btn-outline-primary w-100"
                >
                    Ma position actuelle
                </button>
            )}
        </div>
    );
}
