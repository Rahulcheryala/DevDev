const SitesIconHover = ({
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
                d="M20 18H30V20.4H22.6336V24.16H29.2939V26.56H22.6336V32H20V18Z"
                fill="url(#paint0_linear_13956_22769)"
            />
            <path
                d="M17 13.0721L17.5505 12.541C18.1865 11.9246 18.5046 11.177 18.5046 10.2984V9H21V10.2984C21 11.177 20.8471 11.9705 20.5413 12.6787C20.2477 13.3869 19.8135 13.9836 19.2385 14.4689L18.6147 15L17 13.0721Z"
                fill="url(#paint1_linear_13956_22769)"
            />
            <path
                d="M11.8726 23C11.3063 23 10.8494 22.8333 10.5019 22.5C10.1673 22.1533 10 21.7 10 21.14V9H12.6641V20.6H18V23H11.8726Z"
                fill="url(#paint2_linear_13956_22769)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_13956_22769"
                    x1="20"
                    y1="18"
                    x2="30"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#7BA5E3" />
                    <stop offset="1" stopColor="#2A5CA6" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_13956_22769"
                    x1="17"
                    y1="9"
                    x2="21"
                    y2="15"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#7BA5E3" />
                    <stop offset="1" stopColor="#2A5CA6" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_13956_22769"
                    x1="10"
                    y1="9"
                    x2="18"
                    y2="23"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#7BA5E3" />
                    <stop offset="1" stopColor="#2A5CA6" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default SitesIconHover;
