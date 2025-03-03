const WebCloud = ({ color }: { color?: string }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_83135)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 19C21.7091 19 23.5 17.2091 23.5 15C23.5 12.7909 21.7091 11 19.5 11C19.4764 11 19.4528 11.0002 19.4292 11.0006C18.9442 7.60802 16.0267 5 12.5 5C9.70335 5 7.28975 6.64004 6.1685 9.01082C3.56162 9.18144 1.5 11.35 1.5 14C1.5 16.7614 3.73858 19 6.5 19H19.5Z"
          stroke="#04A777"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 11L11.5 15L9.5 13"
          stroke="#04A777"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_83135">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WebCloud;
