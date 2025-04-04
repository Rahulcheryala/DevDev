const WebArrowCircleLeft = ({ color }: { color?: string }) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6665 7.33333C1.6665 7.33333 3.33732 5.05685 4.6947 3.69854C6.05208 2.34022 7.92783 1.5 9.99984 1.5C14.142 1.5 17.4998 4.85786 17.4998 9C17.4998 13.1421 14.142 16.5 9.99984 16.5C6.58059 16.5 3.69576 14.2119 2.79298 11.0833M1.6665 7.33333V2.33333M1.6665 7.33333H6.6665"
        stroke={color ? color : "#8A8A8F"}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WebArrowCircleLeft;
