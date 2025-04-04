import React from 'react';
import { cn } from '../utils/form-builder';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt: string;
    className?: string;
}

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

const Image = ({
    src,
    alt,
    className,
    ...props
}: ImageProps) => {
    const [imgError, setImgError] = React.useState(false);

    // Base image styles
    const baseImageStyles = "object-cover w-full h-full";

    // Base placeholder styles
    const basePlaceholderStyles = "flex items-center justify-center w-full h-full text-white font-medium";

    if (src && !imgError) {
        return (
            <img
                src={src}
                alt={alt}
                className={cn(baseImageStyles, className)}
                onError={() => setImgError(true)}
                {...props}
            />
        );
    }

    const initials = getInitials(alt);
    const backgroundColor = generateColorFromString(alt);

    return (
        <div
            className={cn(basePlaceholderStyles, className)}
            style={{ backgroundColor }}
            {...props}
        >
            {initials}
        </div>
    );
};

export default Image;