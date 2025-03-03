const HelpIconHover = ({
    size,
    className,
}: {
    size?: string;
    className?: string;
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M0 4.8C0 3.11984 0 2.27976 0.32698 1.63803C0.614601 1.07354 1.07354 0.614601 1.63803 0.32698C2.27976 0 3.11984 0 4.8 0H13.2C14.8802 0 15.7202 0 16.362 0.32698C16.9265 0.614601 17.3854 1.07354 17.673 1.63803C18 2.27976 18 3.11984 18 4.8V10.2C18 11.8802 18 12.7202 17.673 13.362C17.3854 13.9265 16.9265 14.3854 16.362 14.673C15.7202 15 14.8802 15 13.2 15H6.68375C6.0597 15 5.74767 15 5.44921 15.0613C5.18443 15.1156 4.9282 15.2055 4.68749 15.3285C4.41617 15.4671 4.17252 15.662 3.68521 16.0518L1.29976 17.9602C0.88367 18.2931 0.675627 18.4595 0.50054 18.4597C0.348269 18.4599 0.204223 18.3906 0.109229 18.2716C0 18.1348 0 17.8684 0 17.3355V4.8Z" fill="url(#paint0_angular_14422_259)" />
            <defs>
                <radialGradient id="paint0_angular_14422_259" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 7.5) rotate(126.027) scale(13.6015 13.2628)">
                    <stop stop-color="#007AF5" />
                    <stop offset="1" stop-color="#00C7BE" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default HelpIconHover;
