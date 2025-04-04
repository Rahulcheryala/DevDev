const TeamsIcon = ({
    color = "#475467",
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M0 0H10V2.4H2.63359V6.16H9.29389V8.56H2.63359V14H0V0Z" fill="#475467" />
        </svg>
    );
};

export default TeamsIcon;
