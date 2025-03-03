const PlugIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99999 17.5V13.3333M9.99999 13.3333V13.3333C12.3012 13.3333 14.1667 11.4679 14.1667 9.16667V6.66667H11.9444M9.99999 13.3333V13.3333C7.69881 13.3333 5.83333 11.4679 5.83333 9.16667V6.66667H8.05555M11.9444 6.66667V2.5M11.9444 6.66667H8.05555M8.05555 6.66667V2.5"
        stroke={color ? color : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlugIcon;
