import Steps from "./Steps";
import TopSection from "./TopSection";
export default function CreateCompanySidebar() {
  return (
    <div className="flex flex-col xl:min-w-[384px] xl:w-[384px] 2xl:min-w-[506px] 2xl:w-[506px]  rounded-zeak">
      <TopSection />
      <Steps />
    </div>
  );
}
