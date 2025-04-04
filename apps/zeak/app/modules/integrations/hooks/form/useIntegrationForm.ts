import { useCallback, useEffect } from "react";
import { z } from "zod";
import { useUnifiedContext } from "../../context";
import { fetchIntegrationsList } from "../../utils/api.utils";
import { IntegrationFlow } from "../../context";
import { Option } from "@zeak/ui";
import { ApplicationName, AuthType, ConnectionType, IntegrationCategory, Status } from "@prisma/client";

// Define the Zod schema for validation
export const integrationGeneralInfoSchema = z.object({
  integrationName: z.string().min(3, "Integration name must be at least 3 characters long"),
  integrationCode: z.string().min(8, "Integration code must be at least 8 characters long"),
  description: z.string(),
  connectionLimit: z.number().min(1, "Connection limit is required"),
});

export const schedulePoliciesSchema = z.object({
  maxRetries: z.number().min(1, "Maximum number of retries is required"),
  retryDelay: z.number().min(1, "Retry delay is required"),
  timeout: z.string().min(1, "Timeout is required"),
});

/**
 * Custom hook to handle integration form operations
 * Provides functions for form changes, validation, and utilities
 */
export const useIntegrationForm = () => {
  const {
    state: { selectedIntegration, integrationFlow, integrationForm },
    dispatch,
  } = useUnifiedContext();

  // Initialize form with selectedIntegration when in edit mode
  useEffect(() => {
    if (integrationFlow === "edit" && selectedIntegration) {
      // Only initialize if the form doesn't match the selected integration
      // or doesn't have key required values
      const shouldInitialize =
        !integrationForm?.integrationName ||
        integrationForm.integrationName !== selectedIntegration.integrationName ||
        !integrationForm?.integrationCode ||
        integrationForm.integrationCode !== selectedIntegration.integrationCode;

      if (shouldInitialize) {
        // First reset the form to clear any old values
        dispatch({ type: "RESET_INTEGRATION_FORM" });
        // console.log("selectedIntegration", selectedIntegration);

        // Then initialize with all relevant values from selectedIntegration
        const formValues = {
          integrationName: selectedIntegration.integrationName,
          integrationCode: selectedIntegration.integrationCode,
          description: selectedIntegration.description,
          // Important: Keep applicationName in its original form (with underscores)
          // This is what Prisma expects
          applicationName: selectedIntegration.applicationName,
          integrationCategory: selectedIntegration.integrationCategory,
          connectionType: selectedIntegration.connectionType,
          authType: selectedIntegration.authType,
          connectionLimit: selectedIntegration.connectionLimit,
          companyIds: selectedIntegration.companyIds,
          logo: selectedIntegration.logo,
          status: selectedIntegration.status,
          // Add any other fields that should be copied
        };

        // Update with all values from selectedIntegration
        Object.entries(formValues).forEach(([key, value]) => {
          if (value !== undefined) {
            dispatch({
              type: "UPDATE_INTEGRATION_FORM",
              payload: { [key]: value },
            });
          }
        });

        // console.log("Form initialized with selected integration data");
      } else {
        console.log(
          "Form already matches selected integration, skipping initialization"
        );
      }
    }
  }, [
    selectedIntegration?.id,
    integrationFlow,
    dispatch,
    integrationForm?.integrationName,
  ]);

  // Handle form field changes
  const handleChange = useCallback(
    (name: string, value: string | number) => {
      if (
        name === "connectionLimit" ||
        name === "maxRetries" ||
        name === "retryDelay"
      ) {
        value = Number(value);
      }

      dispatch({
        type: "UPDATE_INTEGRATION_FORM",
        payload: { [name]: value },
        setFormDirty: true,
      });
    },
    [dispatch]
  );

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      if (name === "applicationName") {
        dispatch({
          type: "UPDATE_INTEGRATION_FORM",
          payload: { [name]: value as ApplicationName },
        });
      } else if (name === "integrationCategory") {
        dispatch({
          type: "UPDATE_INTEGRATION_FORM",
          payload: { [name]: value as IntegrationCategory },
        });
      } else if (name === "connectionType") {
        dispatch({
          type: "UPDATE_INTEGRATION_FORM",
          payload: { [name]: value as ConnectionType },
        });
      } else if (name === "authType") {
        dispatch({
          type: "UPDATE_INTEGRATION_FORM",
          payload: { [name]: value as AuthType },
        });
      } else if (name === "status") {
        dispatch({
          type: "UPDATE_INTEGRATION_FORM",
          payload: { [name]: value as Status },
        });
      }
      dispatch({
        type: "UPDATE_INTEGRATION_FORM",
        payload: { [name]: value },
      });
    },
    [dispatch]
  );

  const handleMultiSelectChange = useCallback(
    (name: string, value: Option[]) => {
      const companyIds = value.map((option) => option.value);
      dispatch({
        type: "UPDATE_INTEGRATION_FORM",
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

  // Check if an integration name already exists
  const checkDuplicacy = useCallback(
    async (value: string) => {
      try {
        if (
          integrationFlow === "edit" &&
          selectedIntegration?.integrationName === value
        ) {
          return false;
        }

        const response = await fetchIntegrationsList({
          integrationName: value,
          deletedAt: null,
        });

        if (response.data.length > 0) {
          dispatch({
            type: "UPDATE_INTEGRATION_ERROR",
            payload: {
              integrationName: "Integration with this name already exists",
            },
          });
          return true;
        } else {
          dispatch({
            type: "UPDATE_INTEGRATION_ERROR",
            payload: {
              integrationName: null,
            },
          });
        }
        return false;
      } catch (error) {
        console.error("Error checking duplicacy:", error);
        return false;
      }
    },
    [dispatch, integrationFlow, selectedIntegration]
  );

  // Validate form fields on blur
  const handleGeneralInfoBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      try {
        // Convert numeric fields to numbers before validation
        if (name === "connectionLimit") {
          const numericValue = Number(value);
          // Validate the field against schema
          (integrationGeneralInfoSchema as any)
            .pick({ [name]: true })
            .parse({ [name]: numericValue });
        } else {
          // Validate the field against schema
          (integrationGeneralInfoSchema as any)
            .pick({ [name]: true })
            .parse({ [name]: value });
        }

        // Special handling for integration name
        if (name === "integrationName") {
          const isDuplicate = await checkDuplicacy(value);
          if (isDuplicate) return;

          // Generate code for new integrations
          if (integrationFlow === "create") {
            const code = generateCode();
            dispatch({
              type: "UPDATE_INTEGRATION_FORM",
              payload: { integrationCode: code },
            });
          }
        }

        // Clear any errors for this field
        dispatch({
          type: "UPDATE_INTEGRATION_ERROR",
          payload: { [name]: null },
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          dispatch({
            type: "UPDATE_INTEGRATION_ERROR",
            payload: { [name]: error.errors[0].message },
          });
        }
      }
    },
    [checkDuplicacy, dispatch, generateCode, integrationFlow]
  );

  const handleSchedulePoliciesBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      try {
        if (name === "maxRetries" || name === "retryDelay") {
          const numericValue = Number(value);
          // Validate the field against schema
          (schedulePoliciesSchema as any)
            .pick({ [name]: true })
            .parse({ [name]: numericValue });
        } else {
          // Validate the field against schema
          (schedulePoliciesSchema as any)
            .pick({ [name]: true })
            .parse({ [name]: value });
        }

        // Clear any errors for this field
        dispatch({
          type: "UPDATE_INTEGRATION_ERROR",
          payload: { [name]: null },
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          dispatch({
            type: "UPDATE_INTEGRATION_ERROR",
            payload: { [name]: error.errors[0].message },
          });
        }
      }
    },
    [dispatch]
  );

  // Handle file upload for logo
  const handleFileChange = useCallback(
    (file: File) => {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        dispatch({
          type: "UPDATE_INTEGRATION_FORM",
          payload: { logo: imageUrl },
          setFormDirty: true,
        });
      }
    },
    [dispatch]
  );

  return {
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleGeneralInfoBlur,
    handleSchedulePoliciesBlur,
    handleFileChange,
    generateCode,
    checkDuplicacy,
  };
};
