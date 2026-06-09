import Map from "../../../Components/Map";
import { MapPin } from "lucide-react";
export default function Step6({
    data,
    setData,
    error,
    setError,
    setStep,
    nextStep,
}) {
    return (
        <div>
            <p className="text-center small text-muted mb-2">
                <MapPin size={18} /> Cliquez ou utilisez votre position
            </p>

            <Map
                mode="picker"
                value={
                    data.latitude && data.longitude
                        ? [data.longitude, data.latitude]
                        : null
                }
                onChange={(coords) => {
                    setData("latitude", coords[1]);
                    setData("longitude", coords[0]);
                    setError((prev) => ({
                        ...prev,
                        location: null,
                    }));
                }}
            />

            <div style={{ minHeight: "21px" }}>
            {error?.location && (
                <div className="text-danger small animate__animated animate__shakeX animate__faster" >
                    {error.location}
                </div>
            )}
            </div>

            <div className="d-flex gap-2" style={{marginTop:"-18px"}}>
                <button
                    type="button"
                    className="btn btn-light w-50"
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


