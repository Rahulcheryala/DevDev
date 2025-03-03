const WebMenuVerticalDots = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16602 15.0013C9.16602 14.5411 9.53911 14.168 9.99935 14.168C10.4596 14.168 10.8327 14.5411 10.8327 15.0013C10.8327 15.4615 10.4596 15.8346 9.99935 15.8346C9.53911 15.8346 9.16602 15.4615 9.16602 15.0013Z"
        fill={color ? color : "#5E626D"}
        stroke={color ? color : "#5E626D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16602 10.0013C9.16602 9.54106 9.53911 9.16797 9.99935 9.16797C10.4596 9.16797 10.8327 9.54106 10.8327 10.0013C10.8327 10.4615 10.4596 10.8346 9.99935 10.8346C9.53911 10.8346 9.16602 10.4615 9.16602 10.0013Z"
        fill={color ? color : "#5E626D"}
        stroke={color ? color : "#5E626D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16602 5.0013C9.16602 4.54106 9.53911 4.16797 9.99935 4.16797C10.4596 4.16797 10.8327 4.54106 10.8327 5.0013C10.8327 5.46154 10.4596 5.83464 9.99935 5.83464C9.53911 5.83464 9.16602 5.46154 9.16602 5.0013Z"
        fill={color ? color : "#5E626D"}
        stroke={color ? color : "#5E626D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default WebMenuVerticalDots;
