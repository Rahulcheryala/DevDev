const SubscriptionBillingIconHover = ({
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
                d="M16.94 27C16.3667 27 15.9 26.8267 15.54 26.48C15.18 26.1333 15 25.68 15 25.12V13H25.68V15.4H17.76V18.64H25.08V21.04H17.76V24.6H25.68V27H16.94Z"
                fill="url(#paint0_linear_13956_22769)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_13956_22769"
                    x1="15"
                    y1="13"
                    x2="25.68"
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

export default SubscriptionBillingIconHover;
