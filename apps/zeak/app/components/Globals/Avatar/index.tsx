import { cn } from "~/components/Common/Utils";
import { User } from "lucide-react";
import { useState } from "react";

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

interface AvatarProps {
    src?: `${string}.${'svg' | 'jpg' | 'jpeg' | 'png'}`;
    alt?: string;
    size?: AvatarSize;
    className?: string;
    fallback?: React.ReactNode;
}

const sizeMap: Record<Exclude<AvatarSize, number>, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56
};

const Avatar = ({
    src,
    alt = "Avatar",
    size = 'md',
    className,
    fallback = <User className="h-1/2 w-1/2 text-muted-foreground" />
}: AvatarProps) => {
    const [hasError, setHasError] = useState(false);

    const dimensionSize = typeof size === 'number' ? size : sizeMap[size];

    const handleError = () => {
        setHasError(true);
    };

    return (
        <div
            className={cn(
                "relative inline-block rounded-full overflow-hidden bg-muted",
                "transition-all duration-200 ease-in-out",
                className
            )}
            style={{ width: dimensionSize, height: dimensionSize }}
        >
            {src && !hasError ? (
                <img
                    src={src}
                    alt={alt}
                    width={dimensionSize}
                    height={dimensionSize}
                    className="h-full w-full object-cover"
                    onError={handleError}
                    loading="lazy"
                />
            ) : (
                <div className="h-full w-full flex items-center justify-center bg-muted">
                    {fallback}
                </div>
            )}
        </div>
    );
};

export default Avatar;
