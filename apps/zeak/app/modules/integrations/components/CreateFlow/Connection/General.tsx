import { Dropdown, Label } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { safeReplace } from "../../../utils/utils";
import ConnectionForm from "./ConnectionForm";
import { RiArrowDownSLine } from "react-icons/ri";

export const General = () => {
  const {
    state: {
      selectedIntegration,
      connectionFlow,
      connectionForm,
      connectionErrors,
    },
  } = useUnifiedContext();

  if (!selectedIntegration) {
    return <div>No integration selected</div>;
  }

  return (
    <div className="w-full px-10 py-8">
      <div className="form-container flex flex-col gap-10">
        <ConnectionForm
          selectedIntegration={selectedIntegration}
          currentFlow={connectionFlow}
          connectionForm={connectionForm}
          errors={connectionErrors}
        />

        {/* Integration Settings Section */}
        <div className="rounded-lg bg-[#F7F7F8]">
          <div className="bg-[#E5EAF2] flex justify-between items-center rounded-t-lg px-5 py-4">
            <Label className="text-base font-medium">
              Integration Settings
            </Label>
            <RiArrowDownSLine className="text-textLink" size={24} />
          </div>

          <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-12">
              <Dropdown
                name="connectionType"
                label="Connection Type"
                placeholder="Select Connection Type"
                inputClasses="bg-white opacity-70 pointer-events-none"
                items={[
                  {
                    label: safeReplace(selectedIntegration?.connectionType),
                    value: selectedIntegration?.connectionType
                  },
                ]}
                value={selectedIntegration?.connectionType}
                dropdownClasses="h-10"
              />

              <Dropdown
                name="authType"
                label="Authentication"
                placeholder="Select Authentication Type"
                inputClasses="bg-white opacity-70 pointer-events-none"
                items={[
                  {
                    label: safeReplace(selectedIntegration?.authType),
                    value: selectedIntegration?.authType,
                  },
                ]}
                value={selectedIntegration?.authType}
                dropdownClasses="h-10"
              />
            </div>

            {/* Integration Category */}
            <div className="grid grid-cols-2 gap-12">
              <Dropdown
                name="integrationCategory"
                label="Integration Category"
                placeholder="Select Integration Category"
                inputClasses="bg-white opacity-70 pointer-events-none"
                items={[
                  {
                    label: safeReplace(selectedIntegration?.integrationCategory),
                    value: selectedIntegration?.integrationCategory,
                  },
                ]}
                value={selectedIntegration?.integrationCategory}
                dropdownClasses="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
