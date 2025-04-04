import { BuildingIcon5, UserIcon1, WorkFlowIcon } from "@zeak/icons";
import { NotificationAudience } from "~/routes/x+/notifications+/_types";

type Props = {
  audience: NotificationAudience;
  onChange: (audience: NotificationAudience) => void;
  selected: NotificationAudience;
  label: string;
  description: string;
};

const AudienceItem = ({
  audience,
  onChange,
  selected,
  label,
  description,
}: Props) => {
  return (
    <div
      className={`py-6 border bg-white relative rounded-md ${
        audience === selected
          ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)]"
          : "border-stroke-primary"
      }`}
    >
      {audience === NotificationAudience.All ? (
        <UserIcon1
          size="40"
          className="absolute top-1/2 left-10 -translate-y-1/2"
        />
      ) : null}
      {audience === NotificationAudience.NONE ? (
        <WorkFlowIcon
          size="40"
          className="absolute top-1/2 left-10 -translate-y-1/2"
        />
      ) : null}
      {audience === NotificationAudience.CUSTOMIZED ? (
        <BuildingIcon5
          size="40"
          className="absolute top-1/2 left-10 -translate-y-1/2"
        />
      ) : null}

      <div className="pl-[120px] pr-[104px]">
        <h4 className="text-lg text-accent-dark font-medium">{label}</h4>
        <p className="text-sm text-secondary-tertiary mt-2">{description}</p>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <input
          className="peer absolute hidden"
          type="radio"
          name="audience"
          id={audience}
          checked={audience === selected}
          onChange={() => onChange(audience)}
          disabled={audience === NotificationAudience.CUSTOMIZED}
        />
        <label className="pl-10 inline-block" htmlFor={audience}>
          {audience === selected ? (
            <span className="inline-block w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
            </span>
          ) : (
            <span className="inline-block w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
          )}
        </label>
      </div>
    </div>
  );
};

export default AudienceItem;
