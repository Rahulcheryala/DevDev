import { CheckIcon } from "@zeak/icons";

type CreationWizardItemProps = {
  stepItem: any;
};

const CreationWizardItem = ({ stepItem }: CreationWizardItemProps) => {
  return (
    <>
      <div
        key={stepItem.id}
        className={`relative before:absolute before:content-[''] before:w-[2px] before:h-[calc(100%_-_56px)] ${
          stepItem.isActive
            ? "before:bg-accent-primaryDark"
            : stepItem.isCompleted
              ? "before:bg-accent-darkGreen"
              : "before:bg-tertiary"
        } before:top-[56px] before:left-5 last:before:content-none`}
      >
        <div className="absolute">
          <span
            className={`p-[5px] w-10 h-10 border-[2px] inline-block border rounded-full ${
              stepItem.isActive
                ? "border-accent-primaryDark border-solid"
                : stepItem.isCompleted
                  ? "border-accent-darkGreen border-solid"
                  : "border-tertiary border-dashed"
            }`}
          >
            <span
              className={`w-full h-full flex items-center justify-center text-sm text-white rounded-full ${
                stepItem.isActive
                  ? "bg-primary-bright"
                  : stepItem.isCompleted
                    ? "bg-accent-brightGreen"
                    : "bg-tertiary"
              }`}
            >
              {stepItem.isCompleted ? (
                <CheckIcon color="#ffffff" size="18" />
              ) : (
                stepItem.label
              )}
            </span>
          </span>
        </div>
        <div className="pl-[64px]">
          <h5
            className={`font-semibold mb-1 ${
              stepItem.isActive || stepItem.isCompleted
                ? "text-accent-dark"
                : "text-tertiary"
            }`}
          >
            {stepItem.title}
          </h5>
          <p
            className={`text-sm ${
              stepItem.isActive || stepItem.isCompleted
                ? "text-accent-dark"
                : "text-tertiary"
            }`}
          >
            {stepItem.subTitle}
          </p>
        </div>
      </div>
    </>
  );
};
// );

export default CreationWizardItem;
