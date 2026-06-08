import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Eye, MapPin, Star } from 'lucide-react';

const coverFallback = '/images/mains_images/Background_Desktop.png';

const imageUrl = (path, fallback) => {
    if (!path) {
        return fallback;
    }

    return path.startsWith('http') ? path : `/storage/${path}`;
};

export default function ProviderCard({ provider }) {
    const user = provider?.user || {};
    const servicePhotos = provider?.services?.flatMap((service) => service?.photos || []) || [];
    const galleryCover = servicePhotos.find((photo) => photo?.path)?.path;
    const serviceName = provider?.service || provider?.categorie?.name || 'Service';
    const providerName = user?.name || 'Prestataire';
    const cityName = user?.ville?.name || 'Localisation';
    const hasMainPhoto = Boolean(provider?.main_photo);
    const coverCandidates = [
        imageUrl(provider?.main_photo, null),
        imageUrl(galleryCover, null),
        coverFallback,
    ].filter(Boolean);
    const profileImg = imageUrl(user?.photoProfile, null);
    const [coverIndex, setCoverIndex] = useState(0);
    const [hasProfileError, setHasProfileError] = useState(false);
    const initials = providerName.trim().charAt(0).toUpperCase() || 'P';
    const coverImg = coverCandidates[Math.min(coverIndex, coverCandidates.length - 1)];

    return (
        <article className="provider-service-card">
            <div className={`provider-service-cover ${hasMainPhoto ? '' : 'provider-service-cover-fallback'}`}>
                {coverImg ? (
                    <img
                        src={coverImg}
                        alt={serviceName}
                        onError={() => setCoverIndex((index) => index + 1)}
                    />
                ) : (
                    <div className="provider-service-cover-empty">{serviceName.charAt(0).toUpperCase()}</div>
                )}
            </div>

            <div className="provider-service-body">
                {profileImg && !hasProfileError ? (
                    <img
                        className="provider-service-avatar"
                        src={profileImg}
                        alt={providerName}
                        onError={() => setHasProfileError(true)}
                    />
                ) : (
                    <div className="provider-service-avatar provider-service-avatar-fallback" aria-label={providerName}>
                        {initials}
                    </div>
                )}

                <h3 className="provider-service-title">{serviceName}</h3>
                <p className="provider-service-name">{providerName}</p>

                <div className="provider-service-rating" aria-label="Note 4.5 sur 5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={star <= 4 ? 'is-filled' : ''} aria-hidden="true" />
                    ))}
                    <span>(4.5)</span>
                </div>

                <div className="provider-service-location">
                    <MapPin size={14} aria-hidden="true" />
                    <span>{cityName}</span>
                </div>

                <Link href={route('provider.profile', provider.id)} className="btn provider-service-link">
                    <span>Voir Profil</span>
                </Link>
            </div>
        </article>
    );
}
