//  finction خاصة بمراجعة ما ادخله المستخدم

const validateStep = (data, step, setError, validationProps) => {
    const { isEmailValid, isVilleValid, isPasswordValid, isPasswordMatch } =
        validationProps;
    const e = {};
    if (step === 1) {
        if (!data.name.trim()) {
            e.name = "Le Nom est obligatoire";
        } else if (data.name.length < 3) {
            e.name = "Min 3 caractères";
        } else if (!/^[a-zA-Z\s\u0600-\u06FF-]+$/.test(data.name)) {
            e.name =
                "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux";
        }
        if (!data.email.trim()) e.email = "L'email est obligatoire";
        else if (!isEmailValid) e.email = "Email invalide";
        if (!isVilleValid) e.ville = "La ville est obligatoire";
    }

    if (step === 2) {
        if (!data.password.trim())
            e.password = "Le mot de passe est obligatoire";
        else if (!isPasswordValid)
            e.password = "Le mot de passe doit contenir au moins 8 caractères";

        if (!data.password_confirmation.trim()) {
            e.password_confirmation = "La confirmation est obligatoire";
        } else if (!isPasswordMatch) {
            e.password_confirmation = "Les mots de passe ne correspondent pas";
        }
    }
    if (step === 3 && data.role === "provider" && !data.photo_profile) {
        e.photo = "La photo de profil est obligatoire pour les prestataires";
    }
    if (step === 3 && data.photo_profile) {
        const MAX_SIZE = 2 * 1024 * 1024;
        if (data.photo_profile.size > MAX_SIZE) {
            e.photo = "L'image est trop volumineuse (max 2 Mo)";
        }
    }
    if (step === 4 && data.role === "provider") {
        if (!data.main_image) {
            e.main_image = "L'image de couverture est obligatoire";
        }
    }
    if (step === 5 && data.role === "provider") {
        if (!data.category_id) {
            e.category_id = "Veuillez choisir une catégorie";
        }
        if (!data.description || data.description.trim().length < 20) {
            e.description =
                "La description doit contenir au moins 20 caractères";
        }
    }
    if (step === 6 && data.role === "provider") {
        if (!data.latitude || !data.longitude) {
            e.location = "Veuillez sélectionner un emplacement sur la carte";
        }
    }
    if (step === 7 && data.role === "provider") {
        // نتأكد هل هناك أي يوم يحتوي على ساعات مختارة
        const hasHours = Object.values(data.working_hours).some(
            (jour) => jour.length > 0,
        );

        if (!hasHours) {
            e.working_hours =
                "Veuillez sélectionner au moins une heure de travail pour continuer.";
        }
    }

    setError(e);
    return Object.keys(e).length === 0;
};
export default validateStep;
