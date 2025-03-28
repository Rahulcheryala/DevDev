const BellIcon = ({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.667 17.4993H8.33363M15.0003 6.66602C15.0003 5.33993 14.4735 4.06816 13.5358 3.13048C12.5982 2.1928 11.3264 1.66602 10.0003 1.66602C8.67422 1.66602 7.40245 2.1928 6.46477 3.13048C5.52708 4.06816 5.0003 5.33993 5.0003 6.66602C5.0003 9.24117 4.35069 11.0043 3.62502 12.1705C3.01291 13.1542 2.70685 13.6461 2.71807 13.7833C2.7305 13.9352 2.76268 13.9932 2.88511 14.084C2.99568 14.166 3.49413 14.166 4.49101 14.166H15.5096C16.5065 14.166 17.0049 14.166 17.1155 14.084C17.2379 13.9932 17.2701 13.9352 17.2825 13.7833C17.2938 13.6461 16.9877 13.1542 16.3756 12.1705C15.6499 11.0043 15.0003 9.24117 15.0003 6.66602Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BellIcon;
