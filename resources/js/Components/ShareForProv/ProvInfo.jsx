import React from 'react';
import { Mail, MapPin, Phone, Star } from 'lucide-react';
import '@/../css/ProvInfo.css';

export default function ProvInfo({ provider }) {
    if (!provider) {
        return <div className="text-white p-3 text-center">Chargement...</div>;
    }

    const getStorageImage = (path) => {
        if (!path) {
            return null;
        }

        return path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`;
    };
    const main_mage = getStorageImage(provider.main_photo);
    const photo_progile = getStorageImage(provider.user?.photoProfile || provider.user?.profile_photo);

    return (
        <div>
            <div className="cover-wrapper">
                {main_mage && (
                    <img
                        src={main_mage}
                        alt="Cover"
                        className="cover-img"
                    />
                )}
            </div>

            <div className="card-body position-relative pt-0 px-4 pb-4">
                <div className="row align-items-end identity-row">
                    <div className="col-auto position-relative">
                        {photo_progile ? (
                            <img
                                src={photo_progile}
                                alt={provider.user?.name || 'Provider'}
                                className="rounded-circle avatar-img"
                            />
                        ) : (
                            <div className="rounded-circle avatar-img d-flex align-items-center justify-content-center bg-secondary text-white fw-bold">
                                {(provider.user?.name || 'P').charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="col mt-3 mt-md-0">
                        <h3 className="mb-0 fw-bold prov-name">
                            {provider.user?.name || 'Nom non disponible'}
                        </h3>

                        <p className="text-specialty mb-1">
                            {provider.categorie?.name || 'Specialite non definie'}
                        </p>

                        <p className="text-secondary small mb-0 d-flex align-items-center gap-1">
                            <MapPin size={14} className="text-danger" />
                            Ville: {provider.user?.ville?.name || provider.user?.city || 'Ville non disponible'}
                        </p>
                    </div>

                    <div className="col-md-auto text-md-end mt-3 mt-md-0">

                        <div className="small text-secondary d-flex flex-column align-items-md-end gap-1">
                            <span className="d-flex align-items-center gap-1">
                                <Mail size={12} className="text-info" />
                                {provider.user?.email || 'Email non disponible'}
                            </span>

                            <span className="d-flex align-items-center gap-1">
                                <Phone size={12} className="text-success" />
                                {provider.user?.tel || provider.user?.phone || 'Telephone non disponible'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
