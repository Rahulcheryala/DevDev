const AlertCircleIcon = ({
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
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8V13M12 16H12.01"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AlertCircleIcon;
