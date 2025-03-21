const FileUploadIcon = ({ color, size }: { color?: string; size?: number }) => {
  return (
    <svg
      width={size ? size : 20}
      height={size ? size : 20}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 13V14C17.5 15.4001 17.5 16.1002 17.2275 16.635C16.9878 17.1054 16.6054 17.4878 16.135 17.7275C15.6002 18 14.9001 18 13.5 18H6.5C5.09987 18 4.3998 18 3.86502 17.7275C3.39462 17.4878 3.01217 17.1054 2.77248 16.635C2.5 16.1002 2.5 15.4001 2.5 14V13M14.1667 7.16667L10 3M10 3L5.83333 7.16667M10 3V13"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileUploadIcon;
