const StopIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 3.125H5C3.96447 3.125 3.125 3.96447 3.125 5V15C3.125 16.0355 3.96447 16.875 5 16.875H15C16.0355 16.875 16.875 16.0355 16.875 15V5C16.875 3.96447 16.0355 3.125 15 3.125ZM5 1.875C3.27411 1.875 1.875 3.27411 1.875 5V15C1.875 16.7259 3.27411 18.125 5 18.125H15C16.7259 18.125 18.125 16.7259 18.125 15V5C18.125 3.27411 16.7259 1.875 15 1.875H5Z"
        fill="#8A8A8F"
      />
    </svg>
  );
};

export default StopIcon;
