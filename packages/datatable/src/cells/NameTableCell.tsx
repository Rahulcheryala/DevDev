import React from "react";
import { cn } from "../utils/cn";
import { Link } from "@remix-run/react";

export const NameTableCell = ({
    name,
    className,
    link = "#",
    icon,
}: {
    name: string;
    className?: string;
    link?: string;
    icon?: React.ReactNode;
}) => {
    return <Link to={link}>
        <div className={cn("flex py-4 pr-6 pl-2 items-center gap-4", className)}>
            <div >
                {icon}
            </div>
            <div className="overflow-ellipsis text-[14px] font-medium text-[#007AF5]">{name}</div>
        </div>
    </Link>;
};

