import type { SVGProps } from 'react'

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
        <path d="M1 1.5H19M1 8.5H19" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const PinIcon = ({ isPinned, ...props }: SVGProps<SVGSVGElement> & { isPinned: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
        <path
            d="M8.54123 2.89505C8.73771 2.43659 8.83595 2.20737 8.9947 2.10324C9.13353 2.01218 9.30268 1.97961 9.4654 2.01259C9.65147 2.05031 9.82781 2.22666 10.1805 2.57935L13.4207 5.81956C13.7734 6.17225 13.9498 6.3486 13.9875 6.53466C14.0205 6.69738 13.9879 6.86653 13.8968 7.00536C13.7927 7.16411 13.5635 7.26235 13.105 7.45883L11.5336 8.13231C11.4669 8.16089 11.4336 8.17517 11.4023 8.19303C11.3745 8.20889 11.348 8.22684 11.323 8.24673C11.2948 8.26912 11.2691 8.29476 11.2179 8.34605L10.2345 9.32942C10.1543 9.40963 10.1142 9.44974 10.0823 9.49544C10.054 9.536 10.0306 9.57974 10.0125 9.62578C9.9922 9.67764 9.98108 9.73326 9.95883 9.8445L9.4971 12.1531C9.37711 12.7531 9.31712 13.0531 9.15895 13.1934C9.02116 13.3157 8.83676 13.3715 8.6543 13.3462C8.44485 13.3172 8.22853 13.1009 7.7959 12.6682L3.33185 8.20416C2.89921 7.77153 2.68289 7.55521 2.65386 7.34576C2.62856 7.1633 2.68439 6.9789 2.80665 6.84111C2.94699 6.68295 3.24697 6.62295 3.84693 6.50296L6.15556 6.04123C6.2668 6.01899 6.32242 6.00786 6.37428 5.98752C6.42032 5.96946 6.46407 5.94605 6.50463 5.91776C6.55032 5.88589 6.59043 5.84578 6.67064 5.76557L7.65401 4.7822C7.7053 4.73092 7.73094 4.70527 7.75333 4.67709C7.77322 4.65204 7.79117 4.62553 7.80703 4.59776C7.82489 4.5665 7.83918 4.53317 7.86775 4.46651L8.54123 2.89505Z"
            fill={isPinned ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M5.56385 10.4362L2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const DotIcon = ({ active, ...props }: SVGProps<SVGSVGElement> & { active: boolean }) => (
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="2" cy="2" r="2" fill="currentColor" fillOpacity={active ? "1" : "0.2"} />
    </svg>
)

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M15.8333 7.49998L10 13.3333L4.16668 7.49998" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
        <path d="M15 5.5L5 15.5M5 5.5L15 15.5" stroke="#9BA2AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)