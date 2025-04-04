import React from 'react';

interface UserCircleIconProps {
    className?: string;
}

const UserCircleIcon: React.FC<UserCircleIconProps> = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="#9BA2AC" strokeWidth="1.5" />
            <path d="M14.6825 15C14.6825 14.2247 14.6825 13.837 14.5868 13.5216C14.3713 12.8114 13.8156 12.2556 13.1053 12.0401C12.7899 11.9444 12.4022 11.9444 11.6269 11.9444H8.84915C8.07384 11.9444 7.68618 11.9444 7.37074 12.0401C6.66051 12.2556 6.10473 12.8114 5.88928 13.5216C5.79359 13.837 5.79359 14.2247 5.79359 15M12.738 7.5C12.738 8.88071 11.6188 10 10.238 10C8.85733 10 7.73804 8.88071 7.73804 7.5C7.73804 6.11929 8.85733 5 10.238 5C11.6188 5 12.738 6.11929 12.738 7.5Z" stroke="#9BA2AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default UserCircleIcon;