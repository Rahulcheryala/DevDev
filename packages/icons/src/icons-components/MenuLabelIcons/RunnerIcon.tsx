const RunnerIcon = ({
    color = "#101828",
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
                d="M15 20.0006C17.5 12.9173 22.5 21.2506 27.5 18.334M12.5 27.0839L20 20.0006C20 20.0006 22.8149 22.8155 23.3333 23.3339C23.8518 23.8524 23.75 25.0006 22.5 25.0006C21.25 25.0006 18.3333 25.0006 18.3333 25.0006"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="22.9154"
                cy="14.5833"
                r="1.33333"
                stroke={color}
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default RunnerIcon; 