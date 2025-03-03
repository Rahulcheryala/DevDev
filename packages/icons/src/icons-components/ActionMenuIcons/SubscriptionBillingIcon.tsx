const SubscriptionBillingIcon = ({
    color = "#475467",
    size,
    className,
}: {
    color?: string;
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
            <path d="M1.94 14C1.36666 14 0.899999 13.8267 0.539999 13.48C0.179999 13.1333 0 12.68 0 12.12V0H10.68V2.4H2.76V5.64H10.08V8.04H2.76V11.6H10.68V14H1.94Z" fill="#475467" />
        </svg>
    );
};

export default SubscriptionBillingIcon;
