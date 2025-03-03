const FilterLinesIcon = ({
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
        d="M6 12H18M3 6H21M9 18H15"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterLinesIcon;
