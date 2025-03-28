const InfoCircleIcon = ({
  color,
  size,
  className,
}: {
  color?: string;
  size?: string;
  className?: string;
}) => {
  return (
    <svg
      width={size || "20"}
      height={size || "20"}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfoCircleIcon;
