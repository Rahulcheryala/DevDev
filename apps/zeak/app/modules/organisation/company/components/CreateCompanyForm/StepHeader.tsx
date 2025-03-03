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
    <div className="2xl:px-[60px] px-10 py-6 bg-white rounded-t-zeak  flex justify-between items-center">
      <div className="text-[12px] font-medium tracking-[0px] uppercase text-[#007AF5]">
        STEP {activeStep + 1} OF 4
      </div>
      <h2 className="text-[26px]  leading-[36px] text-[#0D0C22]">{title}</h2>
      <X
        className="w-6 h-6 cursor-pointer text-secondary"
        onClick={() => navigate(path.to.companySettings)}
      />
    </div>
  );
};
