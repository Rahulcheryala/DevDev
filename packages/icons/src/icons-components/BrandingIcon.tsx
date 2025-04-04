const BrandingIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.23467 15.3372L11.2479 4.09176C11.3109 3.85641 11.1713 3.6145 10.9359 3.55143L6.15365 2.27003C5.91829 2.20696 5.67638 2.34663 5.61332 2.58198L2.60011 13.8274C2.18319 15.3834 3.10656 16.9827 4.6625 17.3996C6.21844 17.8165 7.81776 16.8932 8.23467 15.3372Z"
        stroke={color ? color : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.41699 17.4996L17.0591 17.4996C17.3028 17.4996 17.5003 17.3021 17.5003 17.0584V12.1074"
        stroke="#141527"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.41699 14.666H5.41866V14.6677H5.41699V14.666Z"
        stroke="#141527"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.65039 17.226L17.2018 12.3058C17.4226 12.2028 17.5181 11.9403 17.4152 11.7195L15.3228 7.23237C15.2198 7.01155 14.9573 6.91601 14.7365 7.01898L10.0254 9.21581"
        stroke="#141527"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BrandingIcon;
