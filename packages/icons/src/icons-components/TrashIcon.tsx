const TrashIcon = ({
  color,
  size,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) => {
  return (
    <svg
      width={size ? size : 20}
      height={size ? size : 20}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.66927H16"
        stroke={color ? color : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33203 4.66667V3.04167C7.33203 2.74251 7.57454 2.5 7.8737 2.5H11.1237C11.4229 2.5 11.6654 2.74251 11.6654 3.04167V4.66667"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.08594 4.66406H14.9193V15.3701C14.9193 16.2676 14.1917 16.9951 13.2943 16.9951H5.71094C4.81347 16.9951 4.08594 16.2676 4.08594 15.3701V4.66406Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
