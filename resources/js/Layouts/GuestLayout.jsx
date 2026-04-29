import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <>
            <div>
<div className="text-center mb-4" style={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    gap: "10px",
}}>
    <img 
        src="/images/Booking_System-removebg-preview.png" 
        alt="Logo" 
        style={{ height: "55px", width: "95px", objectFit: "contain" }} 
        
    />
</div>
            </div>

            <div>
                {children}
            </div>
        </>
    );
}
