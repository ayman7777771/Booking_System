import React from 'react';

export default function ServiceCard({ service }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent dark:border-cyan-500/30 group">
            <div className="relative h-40 overflow-hidden">
                <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {/* Dik l-vague l-bidda li t-teḥt */}
                <div className="absolute bottom-0 w-full">
                    <svg viewBox="0 0 1440 320" className="fill-white dark:fill-slate-800 w-full h-12">
                        <path d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
            
            <div className="p-5 pt-0 text-center relative">
                <img src={service.avatar} className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 mx-auto -mt-10 relative z-10" />
                <h3 className="mt-2 font-bold text-gray-800 dark:text-white">{service.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.category}</p>
                <div className="flex justify-center my-2 text-yellow-400 text-xs italic font-semibold">⭐⭐⭐⭐⭐</div>
                <p className="text-xs text-gray-400 mb-4">📍 {service.location}</p>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                    Voir Profil Personnel
                </button>
            </div>
        </div>
    );
}