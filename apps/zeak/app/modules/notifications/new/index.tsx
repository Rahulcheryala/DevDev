import { Select, ClearableInput } from "~/components/Form";
import type { NotificationType } from "./business";

import {
  notificationColorList,
  notificationPriorityList,
  notificationPurposeList,
  notificationTypeList,
} from "./business";
import NotificationTriggerType from "./NotificationTriggerType";
import type { SelectChangeEvent } from "~/components/Form/Select";
import type { NotificationCreateForm } from "~/routes/x+/notifications+/_types";

type Props = {
  onTextChange: (e: any) => void;
  onSelectChange: (option: SelectChangeEvent | null) => void;
  notificationDetails: NotificationCreateForm;
};

const CreateNotificationSection = ({
  onSelectChange,
  onTextChange,
  notificationDetails,
}: Props) => {
  const handleTypeChange = (type: NotificationType) => {
    onSelectChange({ name: "type", value: type, label: "" });
  };
  return (
    <div className="grid grid-cols-2 md:grid-col-3 gap-x-10 gap-y-[60px]">
      <ClearableInput
        id="name"
        name="name"
        placeholder="Enter Notification Name"
        label={
          <>
            Notification Name
            <span className="text-accent-red inline-block ml-1">*</span>
          </>
        }
        onChange={onTextChange}
        value={notificationDetails.name}
      />
      <div className="relative">
        <ClearableInput
          id="description"
          name="description"
          placeholder="Enter Description"
          hideClose={true}
          label="Description"
          onChange={onTextChange}
          value={notificationDetails.description}
        />
      </div>
      <Select
        value={notificationDetails.purpose}
        name="purpose"
        label="Purpose"
        defaultValue=""
        options={notificationPurposeList}
        onChange={onSelectChange}
      />
      <Select
        value={notificationDetails.priority}
        name="priority"
        label="Priority"
        defaultValue=""
        options={notificationPriorityList}
        onChange={onSelectChange}
      />
      <Select
        value={notificationDetails.color}
        name="color"
        label="Color"
        defaultValue=""
        options={notificationColorList}
        onChange={onSelectChange}
      />
      <div className="col-span-2">
        <label className="text-[14px] inline-block leading-[20px] text-accent mb-6">
          Notification Trigger Type
          <span className="text-accent-red inline-block ml-1">*</span>
        </label>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
          {notificationTypeList.map((type, index) => (
            <NotificationTriggerType
              {...type}
              selected={notificationDetails.type as NotificationType}
              onChange={handleTypeChange}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateNotificationSection;
