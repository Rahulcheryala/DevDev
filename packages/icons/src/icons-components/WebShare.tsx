const WebShare = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.15833 10.2596L11.85 13.5763M11.8417 4.4263L6.15833 7.74297M16.5 3.16797C16.5 4.54868 15.3807 5.66797 14 5.66797C12.6193 5.66797 11.5 4.54868 11.5 3.16797C11.5 1.78726 12.6193 0.667969 14 0.667969C15.3807 0.667969 16.5 1.78726 16.5 3.16797ZM6.5 9.0013C6.5 10.382 5.38071 11.5013 4 11.5013C2.61929 11.5013 1.5 10.382 1.5 9.0013C1.5 7.62059 2.61929 6.5013 4 6.5013C5.38071 6.5013 6.5 7.62059 6.5 9.0013ZM16.5 14.8346C16.5 16.2153 15.3807 17.3346 14 17.3346C12.6193 17.3346 11.5 16.2153 11.5 14.8346C11.5 13.4539 12.6193 12.3346 14 12.3346C15.3807 12.3346 16.5 13.4539 16.5 14.8346Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default WebShare;
