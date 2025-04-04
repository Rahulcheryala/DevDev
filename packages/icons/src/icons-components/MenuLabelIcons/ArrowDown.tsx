const ArrowDown = ({
    color,
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg width={size || "14"}
            height={size || "9"}
            className={className} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8335 1.50004L7.00016 7.33337L1.16683 1.50004" stroke={color || "#475467"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ArrowDown;
