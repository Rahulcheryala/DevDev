const BellIcon = ({
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
                d="M24.3438 17.0531C24.3438 14.2624 22.0884 12 19.3063 12C16.5241 12 14.2688 14.2624 14.2688 17.0531C14.2688 22.9484 11.75 24.6328 11.75 24.6328H26.8625C26.8625 24.6328 24.3438 22.9484 24.3438 17.0531"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.7604 27.1577C20.46 27.6772 19.9066 27.9969 19.3079 27.9969C18.7093 27.9969 18.1559 27.6772 17.8555 27.1577"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="25.25" cy="15" r="4" fill="#F0F4FD" />
            <circle cx="25.2503" cy="15.0003" r="3.00028" fill="#FF4A5F" />
        </svg>
    );
};

export default BellIcon; 