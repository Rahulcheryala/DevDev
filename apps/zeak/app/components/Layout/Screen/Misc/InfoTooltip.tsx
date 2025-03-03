import { InfoCircleIcon } from "@zeak/icons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@zeak/react";

type InfoTooltipProps = {
    title: string;
    subtext: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, subtext }: InfoTooltipProps): JSX.Element => {
    return (<Tooltip>
        <TooltipTrigger className="outline-none focus:ring ring-[hsl(var(--accent-primary-bright),_0.09)] rounded-full">
            <InfoCircleIcon size="20px" color="#9BA2AC" />
        </TooltipTrigger>
        <TooltipContent className="w-80 bg-black">
            <p className="text-orange-400 mb-1">{title}</p>
            <span className="text-white font-normal">{subtext}</span>
        </TooltipContent>
    </Tooltip>)
}

export default InfoTooltip;