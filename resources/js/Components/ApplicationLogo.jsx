import React from 'react';

export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img 
            {...props} 
            src="/images/mains_images/Booking_Logo.png" 
            alt="Booking System Logo" 
            className={`nav-logo ${className}`} 
        />
    );
}