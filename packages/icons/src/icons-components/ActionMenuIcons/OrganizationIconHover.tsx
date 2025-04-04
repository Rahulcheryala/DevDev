const OrganizationIconHover = ({
    size,
    className,
}: {
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
                d="M14 13H16.7508V18.78H23.2492V13H26V27H23.2492V21.18H16.7508V27H14V13Z"
                fill="url(#paint0_linear_13956_22769)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_13956_22769"
                    x1="14"
                    y1="13"
                    x2="26"
                    y2="27"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#7BA5E3" />
                    <stop offset="1" stopColor="#2A5CA6" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default OrganizationIconHover;
