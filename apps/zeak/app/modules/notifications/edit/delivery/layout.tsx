import { Toggle } from "@zeak/react";
import type { PropsWithChildren } from "react";
import type { SelectChangeEvent } from "~/components/Form/Select";
import PreviewModal from "./components/PreviewModal";
import type { NotificationDeliveryForm } from "~/routes/x+/notifications+/_types";

type Props = {
  value: string;
  label: string;
  notificationDetails: NotificationDeliveryForm;
  disabled?: boolean;
  onSelectChange: (option: SelectChangeEvent | null) => void;
};

const Layout = ({
  label,
  notificationDetails,
  disabled,
  children,
  value,
  onSelectChange,
}: PropsWithChildren<Props>) => {
  const enabled = notificationDetails[value as never] === "1";
  return (
    <div className="p-6 rounded-md border border-stroke bg-accent-gray mb-10 last:mb-0">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <Toggle
            label={label}
            isDisabled={disabled}
            onChange={() => {
              console.log("changed..");
              onSelectChange({ name: value, value: enabled ? "0" : "1" });
            }}
            isOn={enabled}
          />
          <PreviewModal
            notificationDetails={notificationDetails}
            enabled={enabled}
          />
        </div>
        {enabled && <>{children}</>}
      </div>
    </div>
  );
};

export default Layout;
