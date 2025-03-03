const LogoIcon = ({
    size,
    className,
}: {
    size?: string;
    className?: string;
}) => {
    return (
        <svg
            width={size || "94"}
            height={size ? (parseInt(size) * 24 / 94).toString() : "24"}
            viewBox="0 0 94 24"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 24C0 22.4791 0.469347 21.0038 1.34748 19.7718L15.5036 0H19.107C19.107 1.52091 18.6376 2.99619 17.7444 4.21292L3.51254 24H0Z" fill="url(#paint0_linear_14101_20541)" />
            <path d="M15.4913 0H0V4.04562H12.6018L15.4913 0Z" fill="#A7B9EC" />
            <path d="M3.50964 24H19.1069V19.9544H6.4294" fill="#A7B9EC" />
            <path d="M28.8113 13.9923H41.2107V9.86074H28.8113V4H24.1351V20.7712C24.1351 21.7352 24.4368 22.5157 25.0553 23.1124C25.6737 23.7092 26.4581 24 27.4235 24H42.2365V19.8684H28.8113V14.0076V13.9923Z" fill="#A7B9EC" />
            <path d="M42.2366 0H33.1859V4.0421H42.2366V0Z" fill="#A7B9EC" />
            <path d="M78.2487 24L78.2487 0L73.6757 -1.99891e-07L73.6757 24L78.2487 24Z" fill="#A7B9EC" />
            <path d="M64.3603 16H57.3209V20.0421H64.3603V16Z" fill="#A7B9EC" />
            <path d="M57.8467 5.79103H57.8773L61.0765 14.4244H65.6535L60.8316 2.06714C60.3112 0.699178 59.3009 0.0151978 57.8007 0.0151978H55.673L46.2589 24.0001H51.2185L57.862 5.80623L57.8467 5.79103Z" fill="#A7B9EC" />
            <path d="M62.3472 18.3913L62.3319 18.4065L64.429 23.9847H69.3886L67.1997 18.3913H62.3472Z" fill="#A7B9EC" />
            <path d="M61.0767 14.4242L62.3472 18.3913H67.1996L65.6536 14.4242H61.0767Z" fill="#A7B9EC" />
            <path d="M86.0244 12L92.4466 4.21654C93.4566 2.9908 94 1.51379 94 0H89.8763L86.5537 4.04494L83.0152 8.35341L80.027 12L83.0152 15.6466L86.5537 19.955L89.8763 24H94C94 22.4862 93.4566 21.0092 92.4466 19.7834L86.0244 12Z" fill="#A7B9EC" />
            <defs>
                <linearGradient id="paint0_linear_14101_20541" x1="9.06672" y1="7.67132e-08" x2="-0.0442008" y2="31.8044" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00FF7B" />
                    <stop offset="1" stopColor="#004DFF" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default LogoIcon; 