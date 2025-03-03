const AddIcon = ({
    color,
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size || "20"} height={size || "20"} className={className} viewBox="0 0 20 20" fill="none">
            <path d="M9.99998 3.33337V16.6667M3.33331 10H16.6666" stroke={color || "#007AF5"} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default AddIcon;
