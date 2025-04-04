import React, { useState } from 'react'

const URLIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M17.917 7.50001L17.917 2.50001M17.917 2.50001H12.917M17.917 2.50001L10.417 10M8.75033 2.5H6.91699C5.51686 2.5 4.8168 2.5 4.28202 2.77248C3.81161 3.01217 3.42916 3.39462 3.18948 3.86502C2.91699 4.3998 2.91699 5.09987 2.91699 6.5V13.5C2.91699 14.9001 2.91699 15.6002 3.18948 16.135C3.42916 16.6054 3.81161 16.9878 4.28202 17.2275C4.8168 17.5 5.51686 17.5 6.91699 17.5H13.917C15.3171 17.5 16.0172 17.5 16.552 17.2275C17.0224 16.9878 17.4048 16.6054 17.6445 16.135C17.917 15.6002 17.917 14.9001 17.917 13.5V11.6667" stroke="#9BA2AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const HeartIcon = ({ active = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.99437 4.27985C8.32825 2.332 5.54987 1.80804 3.46233 3.59168C1.37478 5.37532 1.08089 8.35748 2.72025 10.467C4.08326 12.2209 8.20822 15.9201 9.56016 17.1174C9.71142 17.2513 9.78704 17.3183 9.87526 17.3446C9.95225 17.3676 10.0365 17.3676 10.1135 17.3446C10.2017 17.3183 10.2773 17.2513 10.4286 17.1174C11.7805 15.9201 15.9055 12.2209 17.2685 10.467C18.9079 8.35748 18.6498 5.35656 16.5264 3.59168C14.403 1.8268 11.6605 2.332 9.99437 4.27985Z"
            fill={active ? "#FF3126" : "none"}
            stroke={active ? "none" : "#475467"}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const DynamicsLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_3528_243704)">
            <mask id="mask0_3528_243704" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="41" height="40">
                <path d="M40.8333 0H0.833252V40H40.8333V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_3528_243704)">
                <mask id="mask1_3528_243704" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="5" y="0" width="30" height="40">
                    <path d="M35 12.9363C35 11.1754 33.893 9.6046 32.2347 9.01235L8.06046 0.378778C6.97509 -0.00886324 5.83325 0.795799 5.83325 1.94835V15.0755C5.83325 15.7798 6.27604 16.4081 6.93938 16.6451L17.7727 20.5141C18.8581 20.9017 19.9999 20.0971 19.9999 18.9445V11.407C19.9999 10.8248 20.5818 10.422 21.1268 10.6271L23.9675 11.6961C25.5914 12.3073 26.6666 13.8607 26.6666 15.5958V18.8782L14.4279 23.35C13.7705 23.5902 13.3333 24.2155 13.3333 24.9154V38.0332C13.3333 39.1909 14.4845 39.996 15.5719 39.5986L32.2633 33.4998C33.9067 32.8993 34.9999 31.336 34.9999 29.5863L35 12.9363Z" fill="white" />
                </mask>
                <g mask="url(#mask1_3528_243704)">
                    <path d="M5.83325 -0.416748L35 9.99983V24.3018C35 25.4543 33.8583 26.259 32.7729 25.8715L26.6666 23.6913V15.5933C26.6666 13.8574 25.5904 12.3034 23.9654 11.6928L21.1263 10.6261C20.5815 10.4214 19.9999 10.8242 19.9999 11.4062V21.3094L5.83325 16.2499V-0.416748Z" fill="url(#paint0_linear_3528_243704)" />
                    <g filter="url(#filter0_f_3528_243704)">
                        <path d="M34.9999 13.0825C34.9999 14.8323 33.9067 16.3987 32.2632 16.9992L13.3333 23.9159V40.5826L34.9999 32.6659V13.0825Z" fill="black" fillOpacity="0.24" />
                    </g>
                    <g filter="url(#filter1_f_3528_243704)">
                        <path d="M34.9999 13.7498C34.9999 15.4995 33.9067 17.0659 32.2632 17.6664L13.3333 24.5831V41.2498L34.9999 33.3331V13.7498Z" fill="black" fillOpacity="0.32" />
                    </g>
                    <path d="M34.9999 12.9165C34.9999 14.6663 33.9067 16.2326 32.2632 16.8331L13.3333 23.7499V40.4165L34.9999 32.4998V12.9165Z" fill="url(#paint1_linear_3528_243704)" />
                    <path opacity="0.5" d="M34.9999 12.9165C34.9999 14.6663 33.9067 16.2326 32.2632 16.8331L13.3333 23.7499V40.4165L34.9999 32.4998V12.9165Z" fill="url(#paint2_linear_3528_243704)" />
                    <path opacity="0.5" d="M26.667 18.8833L19.9966 21.3235L19.9966 31.0978C19.9966 31.68 20.5786 32.0828 21.1235 31.8776L23.9682 30.8069C25.592 30.1957 26.667 28.6423 26.667 26.9073V18.8833Z" fill="#B0ADFF" />
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_f_3528_243704" x="12.5333" y="12.2825" width="23.2667" height="29.1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.4" result="effect1_foregroundBlur_3528_243704" />
            </filter>
            <filter id="filter1_f_3528_243704" x="5.33325" y="5.74976" width="37.6667" height="43.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_3528_243704" />
            </filter>
            <linearGradient id="paint0_linear_3528_243704" x1="16.6854" y1="-0.416748" x2="24.441" y2="19.8846" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0B53CE" />
                <stop offset="1" stopColor="#7252AA" />
            </linearGradient>
            <linearGradient id="paint1_linear_3528_243704" x1="27.5573" y1="38.955" x2="27.5573" y2="14.7562" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2266E3" />
                <stop offset="1" stopColor="#AE7FE2" />
            </linearGradient>
            <linearGradient id="paint2_linear_3528_243704" x1="34.9999" y1="23.6607" x2="26.6984" y2="23.6607" gradientUnits="userSpaceOnUse">
                <stop stopColor="#94B9FF" />
                <stop offset="0.287843" stopColor="#94B9FF" stopOpacity="0.523646" />
                <stop offset="1" stopColor="#538FFF" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_3528_243704">
                <rect width="40" height="40" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

interface CustomCardProps {
    /** Logo component to display */
    logo?: React.ReactNode;
    /** URL for the external link */
    url?: string;
    /** Title of the card */
    title?: string;
    /** Subtitle/category text */
    subtitle?: string;
    /** Description text */
    description?: string;
    /** Number of connections */
    connections?: number | 'NA';
    /** Last updated timestamp */
    lastUpdated?: {
        date: string;
        time: string;
        timezone: string;
    };
    /** Custom action button text */
    actionButtonText?: string;
    /** Handler for action button click */
    onActionClick?: () => void;
    /** Handler for favorite toggle */
    onFavoriteToggle?: (isFavorite: boolean) => void;
    /** Initial favorite state */
    defaultFavorite?: boolean;
}

export default function CustomCard({
    logo = <DynamicsLogo />,
    url = '#',
    title = 'Microsoft Dynamics 365',
    subtitle = 'ERP',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    connections = 'NA',
    lastUpdated = {
        date: '01/31/2024',
        time: '02:33 PM',
        timezone: 'CST'
    },
    actionButtonText = 'Add Connection',
    onActionClick = () => { },
    onFavoriteToggle,
    defaultFavorite = false,
}: CustomCardProps) {
    const [isFavorite, setIsFavorite] = useState(defaultFavorite);

    const handleFavoriteClick = () => {
        const newState = !isFavorite;
        setIsFavorite(newState);
        onFavoriteToggle?.(newState);
    };

    return (
        <div className="flex max-w-[376px] p-6 flex-col items-start gap-8 flex-1 rounded-xl bg-white">
            <div className="space-y-4 w-full">
                <div className="flex items-start justify-between">
                    <div className="rounded-full bg-black/[0.04] p-2">
                        {logo}
                    </div>
                    <a href={url} className="flex items-center gap-1 text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#9BA2AC]">
                        URL <URLIcon />
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-normal leading-[24px] tracking-[0.2px] text-[#475467] overflow-hidden text-ellipsis">
                        {title}
                    </h2>
                    <span className="text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#9BA2AC] px-2 py-1 rounded-lg border border-[rgba(228,231,236,0.50)]">
                        {subtitle}
                    </span>
                </div>
                <p className="text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#9BA2AC] overflow-hidden text-ellipsis">
                    {description}
                </p>
            </div>

            <div className="space-y-8 w-full">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-[14px] font-[450] leading-[24px] tracking-[0.2px] text-[#677281]">
                            Connections
                        </span>
                        <span className="text-[14px] font-[450] leading-[24px] tracking-[0.2px] text-[#677281]">
                            Last Updated
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[14px] font-[450] leading-[24px] tracking-[0.2px] text-[#9BA2AC]">
                            {connections}
                        </span>
                        <span className="text-[14px] font-[450] leading-[24px] tracking-[0.2px]">
                            <span className="text-[#9BA2AC]">{lastUpdated.date}, </span>
                            <span className="text-[#9BA2AC] font-[300]">{lastUpdated.time} | {lastUpdated.timezone}</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={onActionClick}
                        className="flex px-4 py-[10px] justify-center items-center gap-[6px] rounded-xl bg-[#0D0844] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-white"
                    >
                        {actionButtonText}
                    </button>
                    <button
                        onClick={handleFavoriteClick}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <HeartIcon active={isFavorite} />
                    </button>
                </div>
            </div>
        </div>
    )
}