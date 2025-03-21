const FlowIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.7 5.8H9.96064C11.789 5.8 12.7032 5.8 13.0502 6.12837C13.3502 6.41222 13.4831 6.83037 13.4021 7.23533C13.3084 7.70381 12.5621 8.23171 11.0694 9.28752L8.63063 11.0125C7.13794 12.0683 6.39159 12.5962 6.2979 13.0647C6.21691 13.4696 6.34985 13.8878 6.64982 14.1716C6.99684 14.5 7.91101 14.5 9.73936 14.5H10.3M7.6 5.8C7.6 6.79411 6.79411 7.6 5.8 7.6C4.80589 7.6 4 6.79411 4 5.8C4 4.80589 4.80589 4 5.8 4C6.79411 4 7.6 4.80589 7.6 5.8ZM16 14.2C16 15.1941 15.1941 16 14.2 16C13.2059 16 12.4 15.1941 12.4 14.2C12.4 13.2059 13.2059 12.4 14.2 12.4C15.1941 12.4 16 13.2059 16 14.2Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FlowIcon;
