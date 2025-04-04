const WebPencil = ({ color }: { color?: string }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8884 3.38422C14.4289 2.87193 15.3156 2.87193 15.856 3.38422C16.3813 3.88214 16.3813 4.67779 15.856 5.17571L7.54446 13.0544L4.94612 13.6701L5.58238 11.2577L13.8884 3.38422Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-2-inside-1_1_100853" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.125 16.6276H14.875Z"
        />
      </mask>
      <path
        d="M6.125 16.1276C5.84886 16.1276 5.625 16.3515 5.625 16.6276C5.625 16.9037 5.84886 17.1276 6.125 17.1276V16.1276ZM14.875 17.1276C15.1511 17.1276 15.375 16.9037 15.375 16.6276C15.375 16.3515 15.1511 16.1276 14.875 16.1276V17.1276ZM6.125 17.1276H14.875V16.1276H6.125V17.1276Z"
        fill="#19110B"
        mask="url(#path-2-inside-1_1_100853)"
      />
    </svg>
  );
};

export default WebPencil;
