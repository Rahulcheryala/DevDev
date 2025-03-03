const UsersIconHover = ({
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
                d="M10 10H12.2876L16.5465 17.1314L20.7124 10H23V18H20.4893V15.4057L17.7554 19.9657C17.5694 20.2743 17.3772 20.4971 17.1788 20.6343C16.9928 20.76 16.7759 20.8229 16.5279 20.8229H16L12.5107 15.4057V22H10V10Z"
                fill="url(#paint0_linear_13956_22769)"
            />
            <path
                d="M22.1113 31C21.6351 31 21.2475 30.8514 20.9485 30.5543C20.6495 30.2571 20.5 29.8686 20.5 29.3886V19H26.0482C26.9341 19 27.7093 19.1714 28.3738 19.5143C29.0493 19.8571 29.5698 20.3429 29.9352 20.9714C30.3117 21.6 30.5 22.3257 30.5 23.1486V26.5086C30.5 27.9829 30.129 29.1029 29.387 29.8686C28.6451 30.6229 27.5543 31 26.1146 31H22.1113ZM26.0482 28.9086C26.7569 28.9086 27.294 28.6971 27.6595 28.2743C28.0249 27.8514 28.2076 27.2286 28.2076 26.4057V23.2514C28.2076 22.6 28.0028 22.08 27.593 21.6914C27.1833 21.2914 26.6462 21.0914 25.9817 21.0914H22.7924V28.9086H26.0482Z"
                fill="url(#paint1_linear_13956_22769)"
            />
            <defs>
                <linearGradient id="paint0_linear_13956_22769" x1="10" y1="9.5" x2="30" y2="31.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7BA5E3" />
                    <stop offset="1" stopColor="#2A5CA6" />
                </linearGradient>
                <linearGradient id="paint1_linear_13956_22769" x1="10" y1="9.5" x2="30" y2="31.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7BA5E3" />
                    <stop offset="1" stopColor="#2A5CA6" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default UsersIconHover;
