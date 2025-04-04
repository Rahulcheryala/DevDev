const DotsVerticalIcon = ({
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
        d="M12.125 13.125C12.7463 13.125 13.25 12.6213 13.25 12C13.25 11.3787 12.7463 10.875 12.125 10.875C11.5037 10.875 11 11.3787 11 12C11 12.6213 11.5037 13.125 12.125 13.125Z"
        fill="#475467"
      />
      <path
        d="M12.125 5.25C12.7463 5.25 13.25 4.74632 13.25 4.125C13.25 3.50368 12.7463 3 12.125 3C11.5037 3 11 3.50368 11 4.125C11 4.74632 11.5037 5.25 12.125 5.25Z"
        fill="#475467"
      />
      <path
        d="M12.125 21C12.7463 21 13.25 20.4963 13.25 19.875C13.25 19.2537 12.7463 18.75 12.125 18.75C11.5037 18.75 11 19.2537 11 19.875C11 20.4963 11.5037 21 12.125 21Z"
        fill="#475467"
      />
      <path
        d="M12.125 13.125C12.7463 13.125 13.25 12.6213 13.25 12C13.25 11.3787 12.7463 10.875 12.125 10.875C11.5037 10.875 11 11.3787 11 12C11 12.6213 11.5037 13.125 12.125 13.125Z"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.125 5.25C12.7463 5.25 13.25 4.74632 13.25 4.125C13.25 3.50368 12.7463 3 12.125 3C11.5037 3 11 3.50368 11 4.125C11 4.74632 11.5037 5.25 12.125 5.25Z"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.125 21C12.7463 21 13.25 20.4963 13.25 19.875C13.25 19.2537 12.7463 18.75 12.125 18.75C11.5037 18.75 11 19.2537 11 19.875C11 20.4963 11.5037 21 12.125 21Z"
        stroke={color || "#101828"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DotsVerticalIcon;
