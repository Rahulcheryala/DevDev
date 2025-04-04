import { X } from 'lucide-react';

const SignupHeader = () => {
    return (
        <header
            className="w-full h-[120px] px-[60px] py-[40px] flex items-center justify-between"
            style={{
                background: 'linear-gradient(90deg, #F2FF00 0%, #D000FF 58%, #03A9F4 96.5%)'
            }}
        >
            {/* Logo Section */}
            <a href="/">
                <span role="button" className="cursor-pointer w-[92px] h-[24px]">
                    <img src="/images/menu-label/logo.webp" alt="Logo" width={92} height={24} />
                </span>
            </a>

            {/* Right Section with Help Text and Close Button */}
            <div className="flex items-center gap-6">
                <a
                    href="/help"
                    className="text-[14px] font-normal leading-[20px] tracking-[0.2px] text-left underline text-[#101828] hover:opacity-80 transition-opacity"
                    style={{
                        textUnderlinePosition: 'from-font',
                        textDecorationSkipInk: 'none',
                    }}
                >
                    Need help?
                </a>
                <button
                    onClick={() => window.location.href = '/'}
                    className="border-none bg-transparent p-0 relative"
                    style={{
                        width: '24px',
                        height: '24px'
                    }}
                >
                    <X
                        className="absolute w-[18px] h-[18px] top-[3px] left-[3px] text-[#101828] hover:opacity-80 transition-opacity cursor-pointer"
                        strokeWidth={1.6}
                        aria-label="Close"
                    />
                </button>
            </div>
        </header>
    );
};

export default SignupHeader;