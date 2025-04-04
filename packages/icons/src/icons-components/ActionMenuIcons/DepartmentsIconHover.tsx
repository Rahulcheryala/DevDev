const DepartmentsIconHover = ({
    size,
    className,
}: {
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M22.7355 23.74H17.2853L15.9955 27H13L18.6999 13H19.9896C20.891 13 21.5012 13.4 21.8202 14.2L27 27H24.0045L22.7355 23.74ZM18.055 21.42H21.9658L20.0312 16.38H20.0104L18.055 21.42Z" fill="url(#paint0_linear_13917_108223)" />
            <defs>
                <linearGradient id="paint0_linear_13917_108223" x1="27" y1="27" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#007AF5" />
                    <stop offset="1" stop-color="#FF00B3" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default DepartmentsIconHover;
