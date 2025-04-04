const SitesIcon = ({
    color = "#475467",
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
            <path d="M10 9H20V11.4H12.6336V15.16H19.2939V17.56H12.6336V23H10V9Z" fill="#475467" />
            <path d="M7 4.07213L7.55046 3.54098C8.18654 2.92459 8.50459 2.17705 8.50459 1.29836V0H11V1.29836C11 2.17705 10.8471 2.97049 10.5413 3.67869C10.2477 4.38689 9.81345 4.98361 9.23853 5.46885L8.61468 6L7 4.07213Z" fill="#475467" />
            <path d="M1.87259 14C1.30631 14 0.849421 13.8333 0.501931 13.5C0.16731 13.1533 0 12.7 0 12.14V0H2.66409V11.6H8V14H1.87259Z" fill="#475467" />
        </svg>
    );
};

export default SitesIcon;
