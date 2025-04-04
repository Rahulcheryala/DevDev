import DInfoCircleIcon from "../../micro-components/icons/DInfoCircleIcon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../../micro-components/ToolTIp";
import { cn } from "../../utils";

export interface InfoTooltipProps {
  title: string | React.ReactNode;
  subtext: string | React.ReactNode;
  className?: string;
  iconSize?: string;
  iconColor?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  title,
  subtext,
  className = "",
  iconSize = "20px",
  iconColor = "#9BA2AC",
}: InfoTooltipProps): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="outline-none focus:ring focus:ring-accent-primary-bright rounded-full">
          <DInfoCircleIcon size={iconSize} color={iconColor} />
        </TooltipTrigger>
        <TooltipContent className={cn("w-80 bg-black", className)}>
          <p className="text-orange-400 mb-1">{title}</p>
          <span className="text-white font-normal">{subtext}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
