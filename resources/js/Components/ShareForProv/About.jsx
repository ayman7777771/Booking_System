export default function About({
    description = "",
    editable = false,
    isDashboard = false,
    onChange,
}) {
    const title = isDashboard ?  "Description :":"A propos :";

    return (
        <div>
            <h5 className="text-color">
                <strong>{title}</strong>
            </h5>
            {editable ? (
                <textarea
                    className="form-control dashboard-input text-color"
                    rows= {4}
                    value={description}
                    onChange={(event) => onChange?.(event.target.value)}
                    placeholder="Description courte..."
                />
            ) : (
                <p className={isDashboard ? "text-secondary" : "text-color-p"}>
                    {description || "-"}
                </p>
            )}
        </div>
    );
}
