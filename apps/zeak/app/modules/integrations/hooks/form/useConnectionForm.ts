import { useCallback, useEffect } from "react";
import { z } from "zod";
import { useUnifiedContext } from "../../context";
import { fetchConnectionsList, fetchIntegrationConnections } from "../../utils/api.utils";
import { ConnectionFlow } from "../../context";
import { Option } from "@zeak/ui";
import { ConnectionEnvType, ExecutionFrequency, ConnectionStatus } from "@prisma/client";
import { IConnectionModel } from "../../models/connection.model";

// Define the Zod schema for validation
export const connectionGeneralInfoSchema = z.object({
  connectionName: z.string().min(3, "Connection name must be at least 3 characters long"),
  connectionCode: z.string().min(8, "Connection code must be at least 8 characters long"),
  connectionDescription: z.string(),
  isEnabled: z.boolean(),
  environmentURL: z.string().min(1, "Environment URL is required"),
});

export const connectionScheduleSchema = z.object({
  maxRetries: z.number().min(1, "Maximum number of retries is required"),
  retryDelay: z.number().min(1, "Retry delay is required"),
});

/**
 * Custom hook to handle connection form operations
 * Provides functions for form changes, validation, and utilities
 */
export const useConnectionForm = () => {
  const {
    state: { selectedConnection, connectionFlow, connectionForm, selectedIntegration },
    dispatch,
  } = useUnifiedContext();

  // Initialize form with selectedConnection when in edit mode
  useEffect(() => {
    if (connectionFlow === "edit" && selectedConnection) {
      // Only initialize if the form doesn't match the selected connection
      // or doesn't have key required values
      const shouldInitialize =
        !connectionForm?.connectionName ||
        connectionForm.connectionName !== selectedConnection.connectionName ||
        !connectionForm?.connectionCode ||
        connectionForm.connectionCode !== selectedConnection.connectionCode;

      if (shouldInitialize) {
        console.log(
          "Initializing form with selected connection:",
          selectedConnection.connectionName
        );

        // First reset the form to clear any old values
        dispatch({ type: "RESET_CONNECTION_FORM" });

        // Then initialize with all relevant values from selectedConnection
        const formValues = {
          integrationId: selectedConnection.integrationId,
          connectionName: selectedConnection.connectionName,
          connectionCode: selectedConnection.connectionCode,
          connectionDescription: selectedConnection.connectionDescription,
          isEnabled: selectedConnection.isEnabled,
          connectionDetails: {
            environmentType: selectedConnection.connectionDetails.environmentType,
            environmentURL: selectedConnection.connectionDetails.environmentURL,
            maxRetries: selectedConnection.connectionDetails.maxRetries,
            timeout: selectedConnection.connectionDetails.timeout,
            retryDelay: selectedConnection.connectionDetails.retryDelay,
          },
          executionFrequency: selectedConnection.executionFrequency,
          connectionStatus: selectedConnection.connectionStatus,
          companies: selectedConnection.companyIds,
        };

        console.log("formValues", formValues);

        // Update the connection form
        dispatch({
          type: "UPDATE_CONNECTION_FORM",
          payload: formValues,
        });

        console.log("Form initialized with selected connection data");
      } else {
        console.log(
          "Form already matches selected connection, skipping initialization"
        );
      }
    }
  }, [
    selectedConnection?.id,
    connectionFlow,
    dispatch,
    connectionForm?.connectionName,
    connectionForm?.connectionCode,
  ]);

  // Handle form field changes
  const handleChange = useCallback(
    (name: string, value: string | number | boolean) => {
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
        // Convert string numbers to actual numbers
        if (
          ["maxRetries", "retryDelay"].includes(name) &&
          typeof value === "string"
        ) {
          value = Number(value);
        }

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
        // Handle top-level properties

        dispatch({
          type: "UPDATE_CONNECTION_FORM",
          payload: { [name]: value },
          setFormDirty: true,
        });
      }
    },
    [dispatch, connectionForm.connectionDetails]
  );

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      if (name === "environmentType") {
        dispatch({
          type: "UPDATE_CONNECTION_FORM",
          payload: {
            connectionDetails: {
              ...connectionForm.connectionDetails,
              [name]: value as ConnectionEnvType,
            },
          },
          setFormDirty: true,
        });
      }  else if (name === "connectionStatus") {
        dispatch({
          type: "UPDATE_CONNECTION_FORM",
          payload: { [name]: value as ConnectionStatus },
          setFormDirty: true,
        });
      } else if (name === "executionFrequency") {
        dispatch({
          type: "UPDATE_CONNECTION_FORM",
          payload: { [name]: value as ExecutionFrequency },
          setFormDirty: true,
        });
      } else {
        dispatch({
          type: "UPDATE_CONNECTION_FORM",
          payload: { [name]: value },
          setFormDirty: true,
        });
      }
    },
    [dispatch, connectionForm.connectionDetails]
  );

  const handleMultiSelectChange = useCallback(
    (name: string, value: Option[]) => {
      const companyIds = value.map((option) => option.value);
      dispatch({
        type: "UPDATE_CONNECTION_FORM",
        payload: { [name]: companyIds },
        setFormDirty: true,
      });
    },
    [dispatch]
  );

  const generateCode = useCallback(() => {
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
  }, []);

  // Check if a connection name already exists
  const checkDuplicacy = useCallback(
    async (value: string) => {
      try {
        if (
          connectionFlow === "edit" &&
          selectedConnection?.connectionName === value
        ) {
          return false;
        }

        const response = await fetchIntegrationConnections(selectedIntegration?.id!);
        const duplicateConnection = response.find((connection: IConnectionModel) => connection.connectionName === value);

        if (duplicateConnection) {
          dispatch({
            type: "UPDATE_CONNECTION_ERROR",
            payload: {
              connectionName: "Connection with this name already exists",
            },
          });
          return true;
        } else {
          dispatch({
            type: "UPDATE_CONNECTION_ERROR",
            payload: { connectionName: null },
          });
        }
        return false;
      } catch (error) {
        console.error("Error checking duplicacy:", error);
        return false;
      }
    },
    [dispatch, connectionFlow, selectedConnection]
  );

  // Validate general form fields on blur
  const handleGeneralInfoBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      try {
        // Special handling for nested connectionDetails properties
        if (
          [
            "environmentType",
            "environmentURL",
          ].includes(name)
        ) {
          // Create a temporary object with just the property we're validating
          const tempObj = { [name]: value };
          (connectionGeneralInfoSchema as any)
            .pick({ [name]: true })
            .parse(tempObj);
        } else {
          // Validate the field against schema
          (connectionGeneralInfoSchema as any)
            .pick({ [name]: true })
            .parse({ [name]: value });
        }

        // Special handling for connection name
        if (name === "connectionName") {
          const isDuplicate = await checkDuplicacy(value);
          if (isDuplicate) return;

          // Generate code for new connections
          if (connectionFlow === "create") {
            const code = generateCode();
            dispatch({
              type: "UPDATE_CONNECTION_FORM",
              payload: { connectionCode: code },
            });
          }
        }

        // Clear any errors for this field
        dispatch({
          type: "UPDATE_CONNECTION_ERROR",
          payload: { [name]: null },
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          dispatch({
            type: "UPDATE_CONNECTION_ERROR",
            payload: { [name]: error.errors[0].message },
          });
        }
      }
    },
    [checkDuplicacy, dispatch, generateCode, connectionFlow]
  );

  // Validate schedule fields on blur
  const handleScheduleBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      try {
        // For nested connectionDetails properties
        if (
          [
            "maxRetries",
            "retryDelay",
          ].includes(name)
        ) {
          // Create a temporary object with just the property we're validating
          const tempObj = { [name]: Number(value) };
          (connectionScheduleSchema as any)
            .pick({ [name]: true })
            .parse(tempObj);
        } else {
          // Validate the field against schema
          (connectionScheduleSchema as any)
            .pick({ [name]: true })
            .parse({ [name]: value });
        }

        // Clear any errors for this field
        dispatch({
          type: "UPDATE_CONNECTION_ERROR",
          payload: { [name]: null },
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          dispatch({
            type: "UPDATE_CONNECTION_ERROR",
            payload: { [name]: error.errors[0].message },
          });
        }
      }
    },
    [dispatch]
  );


  return {
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleGeneralInfoBlur,
    handleScheduleBlur,
    generateCode,
    checkDuplicacy,
  };
}; 