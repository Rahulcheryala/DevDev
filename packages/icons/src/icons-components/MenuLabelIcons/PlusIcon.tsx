const PlusIcon = ({
    color = "#0D0C22",
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg
            width={size || "40"}
            height={size || "40"}
            viewBox="0 0 40 40"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 11V29"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M11 20H29"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default PlusIcon; 