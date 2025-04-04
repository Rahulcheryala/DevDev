import { useNavigate } from "@remix-run/react";
import { MenubarComponent } from "@zeak/react";

import { breadcrumbs } from "../../constants";

interface CompanyMenubarProps {
    title?: string;
    icon?: React.ReactNode;
}

export default function CompanyMenubar({ title = "Companies", icon }: CompanyMenubarProps) {
    const navigate = useNavigate();

    return <MenubarComponent
        breadcrumbs={breadcrumbs}
        onGoBack={() => navigate(-1)}
        onEdit={() => console.log('Edit clicked')}
        onMore={() => console.log('More clicked')}
        onClose={() => navigate(-1)}
        showEdit={true}
        showMore={true}
        showClose={true}
        className="custom-menubar h-auto"
    >
        <div className="flex items-center gap-2">
            <span className="font-['Suisse_Int\\'l'] text-[36px] font-[450] leading-[36px] tracking-[0.2px] text-[#0D0C22] hover:text-[#0D0C22]">{title}</span>
            {icon || <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 8L12 16L4 8" stroke="#0D0C22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
        </div>
    </MenubarComponent>;
}
