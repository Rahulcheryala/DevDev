const CopyLink = ({ color, size }: { color?: string; size?: number }) => {
  return (
    <svg
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.17188 14.8287L14.8287 9.17188"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.05063 11.2969L5.63642 12.7111C4.07432 14.2732 4.07432 16.8058 5.63642 18.3679C7.19851 19.93 9.73117 19.93 11.2933 18.3679L12.7075 16.9537"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.293 7.04672L12.7072 5.63251C14.2693 4.07041 16.8019 4.07041 18.364 5.63251C19.9261 7.19461 19.9261 9.72727 18.364 11.2894L16.9498 12.7036"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyLink;
