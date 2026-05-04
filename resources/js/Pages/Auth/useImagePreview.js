// useImagePreview.js
import { useState, useEffect } from 'react';

export const useImagePreview = () => {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        return () => {
            if (url) URL.revokeObjectURL(url); // تنظيف تلقائي عند الحذف أو إغلاق الصفحة
        };
    }, [url]);

    const createPreview = (file) => {
        if (url) URL.revokeObjectURL(url);
        const newUrl = URL.createObjectURL(file);
        setUrl(newUrl);
        return newUrl;
    };

    return [url, createPreview, setUrl];
};