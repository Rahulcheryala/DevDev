const ArrowTopRightIcon = ({
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
        d="M6 18L18 6M18 6H10M18 6V14"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowTopRightIcon;
