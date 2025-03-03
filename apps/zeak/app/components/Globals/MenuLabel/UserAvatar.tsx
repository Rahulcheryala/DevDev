import { Avatar, AvatarFallback } from "~/components/Common/Components";

export const UserAvatar = () => (
    <Avatar className="bg-[#66D4CF] h-10 w-10 p-2 gap-2">
        <AvatarFallback className="text-[14px] font-weight-450 line-height-20 letter-spacing-0.5">
            YO
        </AvatarFallback>
    </Avatar>
) 