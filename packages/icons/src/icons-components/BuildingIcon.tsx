const BuildingIcon = ({
  color,
  size,
  className,
}: {
  color?: string;
  className?: string;
  size?: string;
}) => {
  return (
    <svg
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.8337 9.16667H14.8337C15.7671 9.16667 16.2338 9.16667 16.5903 9.34832C16.9039 9.50811 17.1589 9.76308 17.3187 10.0767C17.5003 10.4332 17.5003 10.8999 17.5003 11.8333V17.5M10.8337 17.5V5.16667C10.8337 4.23325 10.8337 3.76654 10.652 3.41002C10.4922 3.09641 10.2372 2.84144 9.92364 2.68166C9.56712 2.5 9.10041 2.5 8.16699 2.5H5.16699C4.23357 2.5 3.76686 2.5 3.41034 2.68166C3.09674 2.84144 2.84177 3.09641 2.68198 3.41002C2.50033 3.76654 2.50033 4.23325 2.50033 5.16667V17.5M18.3337 17.5H1.66699M5.41699 5.83333H7.91699M5.41699 9.16667H7.91699M5.41699 12.5H7.91699"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BuildingIcon;
