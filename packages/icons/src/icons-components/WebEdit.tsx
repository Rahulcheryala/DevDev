const WebEdit = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3884 3.38422C13.9289 2.87193 14.8156 2.87193 15.356 3.38422C15.8813 3.88214 15.8813 4.67779 15.356 5.17571L7.04446 13.0544L4.44613 13.6701L5.08238 11.2577L13.3884 3.38422Z"
        stroke="#141527"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-2-inside-1_1824_599580" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.4375 16.6276H16.5625H3.4375Z"
        />
      </mask>
      <path
        d="M3.4375 16.1276C3.16136 16.1276 2.9375 16.3515 2.9375 16.6276C2.9375 16.9037 3.16136 17.1276 3.4375 17.1276V16.1276ZM16.5625 17.1276C16.8386 17.1276 17.0625 16.9037 17.0625 16.6276C17.0625 16.3515 16.8386 16.1276 16.5625 16.1276V17.1276ZM3.4375 17.1276H16.5625V16.1276H3.4375V17.1276Z"
        fill="#141527"
        mask="url(#path-2-inside-1_1824_599580)"
      />
    </svg>
  );
};
export default WebEdit;
