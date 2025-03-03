const PlugIcon = ({
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
                d="M20 28.3334V23.7037M20 23.7037V23.7037C22.7614 23.7037 25 21.4651 25 18.7037V16.2963H22.3333M20 23.7037V23.7037C17.2386 23.7037 15 21.4651 15 18.7037V16.2963H17.6667M22.3333 16.2963V11.6667M22.3333 16.2963H17.6667M17.6667 16.2963V11.6667"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PlugIcon; 