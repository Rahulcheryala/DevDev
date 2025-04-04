import React, { useMemo, useState, useEffect } from 'react';
import { cn } from '../utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt: string;
    className?: string;
}

// More precise typing for the input parameter
const getInitials = (name: string): string => {
    if (!name || typeof name !== 'string') return 'NA';

    // Clean the input string
    const cleanName = name.trim();
    if (!cleanName) return 'NA';

    // Split by space and take first two parts
    const parts = cleanName.split(' ');
    if (parts.length > 1) {
        // If multiple words, take first letter of first two words
        const first = parts[0][0] || '';
        const second = parts[1][0] || '';
        return (first + second).toUpperCase();
    }
    // If single word, take first two letters
    return cleanName.slice(0, 2).toUpperCase();
};

const generateColorFromString = (str: string): string => {
    if (!str || typeof str !== 'string') {
        return 'hsl(210, 65%, 45%)'; // Default blue color
    }

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 65%, 45%)`; // Saturation and lightness fixed for readability
};

const Image = React.memo(({
    src,
    alt,
    className,
    ...props
}: ImageProps) => {
    // Using null initially for SSR compatibility
    const [imgError, setImgError] = useState<boolean | null>(null);

    // Handle SSR by setting state during effect
    useEffect(() => {
        setImgError(false);
    }, []);

    // Base styles as constants
    const baseImageStyles = "object-cover w-full h-full";
    const basePlaceholderStyles = "flex items-center justify-center w-full h-full text-white font-medium";

    // Memoize these values to prevent recalculation on re-renders
    const { initials, backgroundColor } = useMemo(() => ({
        initials: getInitials(alt),
        backgroundColor: generateColorFromString(alt)
    }), [alt]);

    // Show fallback during SSR to avoid hydration mismatch
    if (imgError === null || !src || imgError) {
        return (
            <div
                className={cn(basePlaceholderStyles, className)}
                style={{ backgroundColor }}
                aria-label={alt}
                {...props}
            >
                {initials}
            </div>
        );
    }

    // Only render image on client once we know the state
    return (
        <img
            src={src}
            alt={alt}
            className={cn(baseImageStyles, className)}
            onError={() => setImgError(true)}
            {...props}
        />
    );
});

export default Image;