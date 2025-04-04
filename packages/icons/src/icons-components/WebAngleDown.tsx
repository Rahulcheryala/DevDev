const WebAngleDown = ({ stroke }: { stroke?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.833 6.66667L9.99968 12.5L4.16634 6.66667"
        stroke={stroke ? stroke : "#8A8A8F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WebAngleDown;
