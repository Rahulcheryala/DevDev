const WebComment = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C8.52412 17.5 7.1478 17.0737 5.98747 16.3375L2.5 17.5L3.66249 14.0125C2.9263 12.8522 2.5 11.4759 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
        stroke={color ? color : "#222222"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WebComment;
