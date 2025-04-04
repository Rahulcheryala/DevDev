export default function Auditor() {
    return (
        <div className="flex items-stretch self-stretch rounded-xl">
            {/* Left Section */}
            <div className="w-[400px] p-6 bg-[#D5E0ED] rounded-l-xl flex items-center">
                <h2 className="text-[28px] font-medium text-[#677281]">Audit</h2>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-white rounded-r-xl">
                <div className="flex items-center justify-between p-6 h-full">
                    <div className="flex items-center gap-24">
                        {/* Created By */}
                        <div>
                            <span className="block text-[14px] font-semibold leading-5 tracking-[0.2px] text-[#677281] uppercase mb-1">Created By</span>
                            <span className="block text-[16px] font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">Ryan Pazos</span>
                        </div>

                        {/* Created Date */}
                        <div>
                            <span className="block text-[14px] font-semibold leading-5 tracking-[0.2px] text-[#677281] uppercase mb-1">Created Date</span>
                            <div className="flex items-center">
                                <span className="text-[16px] font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">08</span>
                                <span className="text-[16px] font-light leading-6 tracking-[0.2px] text-[#0D0C22]">/</span>
                                <span className="text-[16px] font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">19</span>
                                <span className="text-[16px] font-light leading-6 tracking-[0.2px] text-[#0D0C22]">/</span>
                                <span className="text-[16px] font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">2024</span>
                                <span className="text-[16px] font-light leading-6 tracking-[0.2px] text-[#0D0C22]">,</span>
                                <span className="ml-1 text-[16px] font-light leading-6 tracking-[0.2px] text-[#475467]">02:33</span>
                                <span className="text-[16px] font-light leading-6 tracking-[0.2px] text-[#9BA2AC]">PM</span>
                                <span className="mx-1 text-[16px] font-light leading-6 tracking-[0.2px] text-[#007AF5]">|</span>
                                <span className="text-[16px] font-light leading-6 tracking-[0.2px] text-[#9BA2AC]">CST</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-[#475467] hover:text-[#101828]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#475467" />
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="#475467" />
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="#475467" />
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="p-2 text-[#475467] hover:text-[#101828]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8 4L16 12L8 20" stroke="#677281" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}