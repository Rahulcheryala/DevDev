const WebDisable = ({ color }: { color?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.10866 3.10768L14.892 14.891M17.3337 8.99935C17.3337 13.6017 13.6027 17.3327 9.00033 17.3327C4.39795 17.3327 0.666992 13.6017 0.666992 8.99935C0.666992 4.39698 4.39795 0.666016 9.00033 0.666016C13.6027 0.666016 17.3337 4.39698 17.3337 8.99935Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WebDisable;
