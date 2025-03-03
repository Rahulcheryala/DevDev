const RunningIcon = ({
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
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 10.0006C7.5 2.9173 12.5 11.2506 17.5 8.33396M2.5 17.0839L10 10.0006C10 10.0006 12.8149 12.8155 13.3333 13.3339C13.8518 13.8524 13.75 15.0006 12.5 15.0006C11.25 15.0006 8.33333 15.0006 8.33333 15.0006"
        stroke={color ? color : "#677281"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.9154"
        cy="4.58333"
        r="1.48333"
        stroke={color ? color : "#677281"}
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default RunningIcon;
