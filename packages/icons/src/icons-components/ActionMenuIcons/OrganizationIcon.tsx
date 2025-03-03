const OrganizationIcon = ({
    color = "#475467",
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M14 13H16.7508V18.78H23.2492V13H26V27H23.2492V21.18H16.7508V27H14V13Z" fill="#475467" />
        </svg>
    );
};

export default OrganizationIcon;
