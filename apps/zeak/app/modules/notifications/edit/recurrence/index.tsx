import { DatePicker, Select, TimePicker } from "~/components/Form";
import { endTimeTypes, notificationFrequencies } from "./business";
import type { SelectChangeEvent } from "~/components/Form/Select";
import type { NotificationRecurrenceForm } from "~/routes/x+/notifications+/_types";
import { NotificationRecurrence } from "~/routes/x+/notifications+/_types";
import { InfoCircleIcon, ClockFastForwardIcon } from "@zeak/icons";
import { Input, RadioGroup } from "@zeak/react";
import { Checkbox } from "antd";
import EndTypeItem from "./EndTypeItem";
import Layout from "./layout";

type Props = {
  selectedType: string;
  isIndefinite: boolean;
  notificationDetails: NotificationRecurrenceForm;
  onTextChange: (e: any) => void;
  onSelectChange: (option: SelectChangeEvent | null) => void;
  setIsIndefinite: (isIndefinite: boolean) => void;
  setEndType: (type: string) => void;
};

const NotificationRecurrenceSection = ({
  notificationDetails,
  selectedType,
  isIndefinite,
  onTextChange,
  onSelectChange,
  setIsIndefinite,
  setEndType,
}: Props) => {
  console.log("dasda");
  return (
    <div className="">
      <Layout
        title="Start"
        description="Manual (on-demand) notifications do not have a Start date. Fortimed and event-based notifications, you can select the relevant details."
      >
        <div className="grid grid-cols-1 xxl:grid-cols-2 gap-x-[60px] gap-y-10">
          <Select
            value={notificationDetails.recurrence}
            name="recurrence"
            label="Recurrence"
            options={notificationFrequencies}
            onChange={onSelectChange}
            onClick={console.log}
          />
          <div className="col-span-2 xxl:col-span-1">
            <div className="flex items-center xxl:pt-8">
              <Checkbox
                name="recurringJob"
                id="recurringJob"
                data-testid="notify"
                className="h-[18px] w-[18px] custom__checkbox !text-white mr-2"
                onChange={() => setIsIndefinite(!isIndefinite)}
              />

              <label
                htmlFor="recurringJob"
                className="font-light text-sm font-medium flex items-center"
              >
                Indefinitely Recurring Job{" "}
                <InfoCircleIcon size="18" className="ml-2" />
              </label>
            </div>
          </div>
          <div className="col-span-2 xxl:col-span-1">
            <DatePicker
              value={notificationDetails.startDate}
              onChange={onSelectChange}
              name="startDate"
              label="Start Date"
            />
          </div>
          <div className="col-span-2 xxl:col-span-1">
            <TimePicker
              onChange={(value) =>
                onSelectChange({ name: "startTime", value: value.toString() })
              }
              value={notificationDetails.startTime}
              name="startTime"
              label="Start Time"
            />
          </div>
        </div>
      </Layout>
      <Layout
        title="End"
        description="Manual (on-demand) notifications do not have a End date. Fortimed and event-based notifications, you can select the relevant details."
      >
        <div className="grid grid-cols-1 xxl:grid-cols-2 gap-x-[60px] gap-y-10">
          <div className="col-span-2">
            <RadioGroup className="grid grid-cols-1 xl:grid-cols-1 xxl:grid-cols-3 gap-10">
              {endTimeTypes.map((type, index) => (
                <EndTypeItem
                  {...type}
                  disabled={
                    type.disabled ||
                    isIndefinite ||
                    notificationDetails.recurrence ===
                      NotificationRecurrence.ONE_TIME
                  }
                  key={index}
                  selected={selectedType}
                  onChange={setEndType}
                />
              ))}
            </RadioGroup>
          </div>
          {selectedType === "date" && (
            <>
              <div className="col-span-2 xxl:col-span-1">
                <DatePicker
                  value={notificationDetails.endDate}
                  onChange={onSelectChange}
                  name="endDate"
                  label="End Date"
                />
              </div>
              <div className="col-span-2 xxl:col-span-1">
                <TimePicker
                  onChange={(value) =>
                    onSelectChange({ name: "endTime", value: value.toString() })
                  }
                  name="endTime"
                  label="End Time"
                  value={notificationDetails.endTime}
                />
              </div>
            </>
          )}
          {selectedType === "occurences" && (
            <div className="col-span-2 xxl:col-span-1">
              <label
                htmlFor="occurenceCount"
                className="block text-sm text-accent mb-3"
              >
                No. of Occurrences
              </label>
              <div className="relative">
                <Input
                  id="occurrences"
                  name="occurrences"
                  placeholder="Enter Occurrence"
                  className="h-[56px]"
                  onChange={onTextChange}
                />
                <ClockFastForwardIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default NotificationRecurrenceSection;
