import { FaCheck } from "react-icons/fa6";

type StepperItemProps = {
  stepItem: {
    id: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
    label: string;
  };
  listLength: number;
  index: number;
};

const StepperItem = (props: StepperItemProps) => {
  const { stepItem, index, listLength } = props;
  return (
    <>
      <div className="flex items-center flex-col">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center outline-dashed outline-[1px] mb-2 ${
            stepItem.isActive
              ? "outline-accent-primary"
              : stepItem.isCompleted
                ? "outline-accent-green"
                : "outline-stroke"
          }`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full flex items-center justify-center border border-[1px] ${
              stepItem.isActive
                ? "border-accent bg-accent-dark text-card"
                : stepItem.isCompleted
                  ? "border-accent-green bg-accent-green text-card"
                  : "border-stroke bg-table text-tertiary"
            }`}
          >
            {stepItem.isCompleted ? (
              <FaCheck className="text-card" />
            ) : (
              stepItem.label
            )}
          </div>
        </div>
        <span
          className={`${
            stepItem.isActive
              ? "text-accent-dark"
              : stepItem.isCompleted
                ? "text-accent-dark"
                : "text-tertiary"
          }`}
        >
          {stepItem.title}
        </span>
      </div>
      {index !== listLength - 1 && (
        <div className="flex-1 h-[1px] bg-tertiary mx-2">
          {(stepItem.isActive || stepItem.isCompleted) && (
            <div
              className={`${
                stepItem.isCompleted
                  ? "w-full bg-accent-green"
                  : "w-1/2 bg-accent-primary"
              } h-full`}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default StepperItem;
