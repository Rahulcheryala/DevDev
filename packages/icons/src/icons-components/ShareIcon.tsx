const ShareIcon = ({
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
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.72667 9.00927L10.28 11.6626M10.2733 4.3426L5.72667 6.99594M14 3.33594C14 4.44051 13.1046 5.33594 12 5.33594C10.8954 5.33594 10 4.44051 10 3.33594C10 2.23137 10.8954 1.33594 12 1.33594C13.1046 1.33594 14 2.23137 14 3.33594ZM6 8.0026C6 9.10717 5.10457 10.0026 4 10.0026C2.89543 10.0026 2 9.10717 2 8.0026C2 6.89803 2.89543 6.0026 4 6.0026C5.10457 6.0026 6 6.89803 6 8.0026ZM14 12.6693C14 13.7738 13.1046 14.6693 12 14.6693C10.8954 14.6693 10 13.7738 10 12.6693C10 11.5647 10.8954 10.6693 12 10.6693C13.1046 10.6693 14 11.5647 14 12.6693Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShareIcon;
