export const Badge = ({ status = 'Active' }: { status: string }) => {
    return (
        <span className="flex h-8 px-3 py-1 justify-center items-center gap-2 bg-white text-[#007D1B] rounded-xl font-['Suisse_Int'l'] text-sm font-medium leading-[18px] tracking-[0.2px] capitalize ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1.5" y="1.5" width="9" height="9" rx="4.5" stroke="#31DE4B" strokeWidth="3" />
                <circle cx="6" cy="6" r="3.75" fill="#31DE4B" stroke="white" strokeWidth="1.5" />
            </svg>
            {status}
        </span>
    )
}

export default Badge;