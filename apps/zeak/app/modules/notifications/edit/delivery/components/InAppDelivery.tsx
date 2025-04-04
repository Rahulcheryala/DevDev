import { Select } from "~/components/Form";
import { postions } from "../business";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  QuillEditor,
} from "@zeak/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { PiBracketsCurly } from "react-icons/pi";
import type { NotificationDeliveryForm } from "~/routes/x+/notifications+/_types";
import type { SelectChangeEvent } from "~/components/Form/Select";

type Props = {
  notificationDetails: NotificationDeliveryForm;
  onSelectChange: (option: SelectChangeEvent | null) => void;
};

const InAppDelivery = ({ notificationDetails, onSelectChange }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-y-10 gap-x-[60px]">
      <div>
        <Select
          value=""
          name="templateId"
          placeholder="Select an Template"
          label="Event Type"
          disabled
          options={[]}
        />
      </div>
      <div>
        <Select
          placeholder="Select an display position"
          name="webConfigPosition"
          label="Position"
          options={postions}
          onChange={onSelectChange}
          value={notificationDetails.webConfigPosition}
        />
      </div>
      <div className="col-span-2">
        <div className="has-variable-dropdown">
          <QuillEditor
            value={notificationDetails.webContent}
            onChange={(value) =>
              onSelectChange({ name: "webContent", value: value })
            }
          />
          <div className="variable-dropdown">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                <Button
                  variant="secondary"
                  className="py-2 px-3 text-sm bg-white hover:bg-white text-accent-primary h-auto text-left justify-between text-secondary"
                >
                  <PiBracketsCurly className="text-accent-primary" />
                  <span className="text-accent-primary mx-2">
                    Variable
                  </span>{" "}
                  {true ? (
                    <LuChevronDown className="text-accent-primary" />
                  ) : (
                    <LuChevronUp className="text-accent-primary" />
                  )}
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAppDelivery;
