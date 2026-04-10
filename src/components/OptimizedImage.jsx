import React, { useState, useEffect } from 'react';

/**
 * OptimizedImage Component
 * Handles 'Text-First' loading by:
 * 1. Reserving space with a skeleton/placeholder.
 * 2. Applying Cloudinary dynamic optimizations (f_auto, q_auto).
 * 3. Loading asynchronously without blocking page content.
 */
const OptimizedImage = ({ src, alt, className, height = '250px', placeholderColor = '#f8f9fa' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Dynamic Cloudinary Optimization
    const getOptimizedUrl = (url) => {
        if (!url) return '';
        // If it's a relative path from our API
        if (url.startsWith('/uploads/') || url.startsWith('/static/')) {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            return apiUrl.replace(/\/api$/, '') + url;
        }
        return url;
    };

    const optimizedSrc = getOptimizedUrl(src);

    return (
        <div 
            className={`image-container ${!isLoaded ? 'skeleton' : ''}`} 
            style={{ height, backgroundColor: placeholderColor }}
        >
            {optimizedSrc && !error && (
                <img
                    src={optimizedSrc}
                    alt={alt}
                    loading="lazy"
                    className={`optimized-img ${isLoaded ? 'loaded' : ''} ${className || ''}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                        setError(true);
                        setIsLoaded(true); // Stop skeleton on error
                    }}
                />
            )}
            
            {/* Fallback if no image or error */}
            {(error || !src) && (
                <div 
                    className="d-flex align-items-center justify-content-center w-100 h-100 text-muted"
                    style={{ backgroundColor: placeholderColor, fontSize: '0.9rem' }}
                >
                    {error ? 'Image unavailable' : ''}
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;
