const XcelprosIcon = ({
    color = "#677281",
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg
            width={size || "20"}
            height={size || "20"}
            viewBox="0 0 20 20"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.8334 9.16667H14.8334C15.7668 9.16667 16.2335 9.16667 16.5901 9.34832C16.9037 9.50811 17.1586 9.76308 17.3184 10.0767C17.5001 10.4332 17.5001 10.8999 17.5001 11.8333V17.5M10.8334 17.5V5.16667C10.8334 4.23325 10.8334 3.76654 10.6518 3.41002C10.492 3.09641 10.237 2.84144 9.9234 2.68166C9.56688 2.5 9.10017 2.5 8.16675 2.5H5.16675C4.23333 2.5 3.76662 2.5 3.4101 2.68166C3.09649 2.84144 2.84153 3.09641 2.68174 3.41002C2.50008 3.76654 2.50008 4.23325 2.50008 5.16667V17.5M18.3334 17.5H1.66675M5.41675 5.83333H7.91675M5.41675 9.16667H7.91675M5.41675 12.5H7.91675"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default XcelprosIcon; 