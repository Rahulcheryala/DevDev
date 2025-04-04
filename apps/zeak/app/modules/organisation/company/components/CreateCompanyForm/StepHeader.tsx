import { useNavigate } from "@remix-run/react";
import { X } from "lucide-react";
import { FC } from "react";
import { path } from "~/utils/path";
import { useCompanyStore } from "../../utils/useCompanyStore";

interface StepHeaderProps {
  title: string;
}

export const StepHeader: FC<StepHeaderProps> = ({ title }) => {
  const { activeStep } = useCompanyStore();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div className="font-['Suisse_Int\'l'] text-[12px] font-medium leading-normal tracking-[0.2px] uppercase text-[#007AF5]">
        STEP {activeStep + 1} OF 4
      </div>
      <h2 className="font-['Suisse_Int\'l'] font-normal tracking-[0.2px] text-[26px] leading-[36px] text-[#0D0C22]">{title}</h2>
      <X
        className="w-6 h-6 cursor-pointer text-[##475467] font-normal"
        onClick={() => navigate(path.to.companySettings)}
      />
    </div>
  );
};
