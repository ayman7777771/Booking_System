export default function About({
    description = "",
    editable = false,
    isDashboard = false,
    onChange,
}) {
    const title = isDashboard ? "A propos" : "Description";

    return (
        <div>
            <h5 className="text-white">
                <strong>{title}</strong>
            </h5>
            {editable ? (
                <textarea
                    className="form-control dashboard-input"
                    rows={isDashboard ? 3 : 4}
                    value={description}
                    onChange={(event) => onChange?.(event.target.value)}
                    placeholder="Description courte..."
                />
            ) : (
                <p className={isDashboard ? "text-secondary" : "text-white"}>
                    {description || "-"}
                </p>
            )}
        </div>
    );
}
