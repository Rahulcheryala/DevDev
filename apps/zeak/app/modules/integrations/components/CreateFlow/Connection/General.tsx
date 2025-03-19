import { useState } from "react";
import { z } from "zod";
import { useUnifiedContext } from "~/modules/integrations/context";
import { fetchConnectionsList } from "~/modules/integrations/utils/api.utils";
import ConnectionForm from "./ConnectionForm";
import { Input, Label } from "@zeak/react";
import { RiArrowDownSLine } from "react-icons/ri";

// Define the Zod schema for validation
export const connectionGeneralInfoSchema = z.object({
  connectionName: z.string().min(1, "Connection name is required"),
  connectionCode: z.string().min(1, "Connection code is required"),
  connectionDescription: z
    .string()
    .min(1, "Connection description is required"),
  isEnabled: z.boolean(),
  environmentType: z.string().min(1, "Environment type is required"),
  environmentURL: z.string().min(1, "Environment URL is required"),
  maxRetries: z.number().min(1, "Max retries is required"),
  timeout: z.number().min(1, "Timeout is required"),
  retryDelay: z.number().min(1, "Retry delay is required"),
  executionFrequency: z.string().min(1, "Execution frequency is required"),
  connectionStatus: z.string().min(1, "Connection status is required"),
  companies: z.array(z.string()).min(1, "At least one company is required"),
});

export const General = () => {
  const { state, dispatch } = useUnifiedContext();
  const { connectionForm, selectedIntegration, connectionFlow } = state;
  // const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>(
    connectionForm.connectionStatus || "Online"
  );

  if (!selectedIntegration) {
    return <div>No integration selected</div>;
  }

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8;
    const timestamp = new Date().getTime().toString().slice(-4);
    let result = "";
    for (let i = 0; i < length / 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    result += timestamp;
    return result;
  };

  const checkDuplicacy = async (value: string) => {
    try {
      if (
        connectionFlow === "edit" &&
        selectedIntegration?.integrationName === value
      ) {
        return false;
      }
      const response = await fetchConnectionsList({ connectionName: value });
      // TODO(vamsi): check for only connections of a specific integration rather than all connections
      if (response.data.length > 0) {
        dispatch!({
          type: "SET_CONNECTION_ERROR",
          payload: {
            name: "connectionName Error",
            message: "Connection with this name already exists",
          },
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking duplicacy:", error);
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested connectionDetails properties
    if (
      [
        "environmentType",
        "environmentURL",
        "maxRetries",
        "timeout",
        "retryDelay",
      ].includes(name)
    ) {
      dispatch({
        type: "UPDATE_CONNECTION_FORM",
        payload: {
          connectionDetails: {
            ...connectionForm.connectionDetails,
            [name]: value,
          },
        },
        setFormDirty: true,
      });
    } else {
      dispatch({
        type: "UPDATE_CONNECTION_FORM",
        payload: { [name]: value },
        setFormDirty: true,
      });
    }
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    try {
      (connectionGeneralInfoSchema as any)
        .pick({ [name]: true })
        .parse({ [name]: value });
      if (name === "connectionName") {
        const isDuplicate = await checkDuplicacy(value);
        if (isDuplicate) return;
        if (connectionFlow === "create") {
          const code = generateCode();
          dispatch({
            type: "UPDATE_CONNECTION_FORM",
            payload: { connectionCode: code },
          });
        }
      }
      dispatch({ type: "UPDATE_CONNECTION_ERROR", payload: { [name]: null } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({
          type: "UPDATE_CONNECTION_ERROR",
          payload: { [name]: error.errors[0].message },
        });
      }
    }
  };

  return (
    <div className="w-full px-10 py-8">
      <div className="form-container flex flex-col gap-10">
        <ConnectionForm
          dispatch={dispatch}
          connectionForm={connectionForm}
          connectionErrors={state.connectionErrors}
          selectedIntegration={selectedIntegration}
          handleChange={handleChange}
          handleBlur={handleBlur}
          currentFlow={connectionFlow}
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
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="connectionType"
                  className="text-sm text-textLink"
                >
                  Connection Type
                </Label>
                <Input
                  id="connectionType"
                  name="connectionType"
                  type="text"
                  placeholder="Enter Connection Type"
                  className="border-0 bg-white"
                  value={selectedIntegration?.connectionType}
                  isDisabled
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="authentication"
                  className="text-sm text-textLink"
                >
                  Authentication
                </Label>
                <Input
                  id="authentication"
                  name="authentication"
                  type="text"
                  placeholder="Enter Authentication Type"
                  className="border-0 bg-white"
                  value={selectedIntegration?.authType?.replace(/_/g, " ")}
                  isDisabled
                />
              </div>
            </div>

            {/* Integration Category */}
            <div className="grid grid-cols-2 gap-12">
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="integrationCategory"
                  className="text-sm text-textLink"
                >
                  Integration Category
                </Label>
                <Input
                  id="integrationCategory"
                  name="integrationCategory"
                  type="text"
                  min={1}
                  placeholder="Enter integration category"
                  className="border-0 bg-white"
                  value={selectedIntegration?.integrationCategory?.replace(
                    /_/g,
                    " "
                  )}
                  isDisabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
