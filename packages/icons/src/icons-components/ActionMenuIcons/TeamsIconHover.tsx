const TeamsIconHover = ({
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
                d="M15 13H25V15.4H17.6336V19.16H24.2939V21.56H17.6336V27H15V13Z"
                fill="url(#paint0_linear_13917_108213)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_13917_108213"
                    x1="15"
                    y1="13"
                    x2="25.1426"
                    y2="26.552"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#C93400" />
                    <stop offset="1" stopColor="#FF003C" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default TeamsIconHover;
