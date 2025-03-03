import { useState, useEffect } from "react";
import { Modal, ModalContent } from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuLoader2 } from "react-icons/lu";
import { getSupabase } from "~/lib/supabase";
import { IntegrationStep } from "./Steps/IntegrationStep";
import { FrequencyStep } from "./Steps/FrequencyStep";
import { DataMappingStep } from "./Steps/DataMappingStep";
import { NotificationStep } from "./Steps/NotificationStep";
import { path } from "~/utils/path";

interface WorkflowSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  integrationId?: string;
  initialStep?: "integration" | "frequency" | "mapping" | "notification";
  isManualNavigation: boolean;
}

export function WorkflowSetupModal({
  isOpen,
  onClose,
  taskId,
  integrationId,
  initialStep = "integration",
  isManualNavigation,
}: WorkflowSetupModalProps) {
  const [currentStep, setCurrentStep] = useState<
    "integration" | "frequency" | "mapping" | "notification"
  >(initialStep);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const supabaseClient = getSupabase();
  const [integrationStatus, setIntegrationStatus] = useState<{
    isIntegrated: boolean;
    message?: string;
    integrationId?: string;
  }>();
  const navigate = useNavigate();
  const [stepConfigs, setStepConfigs] = useState<{
    mapping?: { hasMappings: boolean; mappings: any[] };
    frequency?: { exists: boolean; isActive: boolean; cron: string };
    notification?: {
      isConfigured: boolean;
      notificationId: string;
      webContent: string;
      emailConfig: any;
    };
  }>({});
  const [stepKey, setStepKey] = useState(0);

  useEffect(() => {
    if (integrationId) {
      setIntegrationStatus((prev) => ({
        ...prev,
        isIntegrated: true,
        integrationId,
      }));
    }
  }, [integrationId]);

  // Add this effect to update currentStep when initialStep changes
  useEffect(() => {
    if (isManualNavigation) {
      setCurrentStep(initialStep);
      loadStepConfiguration(initialStep);
      setIsCheckingStatus(false);
    } else if (isOpen) {
      checkStatus();
    }
  }, [initialStep, isManualNavigation, isOpen]);

  // Modify the checkStatus useEffect
  useEffect(() => {
    if (!isManualNavigation && isOpen) {
      checkStatus();
    }

    const channel = supabaseClient
      .channel("integration-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "integrations",
        },
        () => {
          if (!isManualNavigation) {
            checkStatus();
          }
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [isManualNavigation, isOpen]);

  // Load saved configurations when step changes
  useEffect(() => {
    if (isManualNavigation && integrationId) {
      loadStepConfiguration(currentStep);
    }
  }, [currentStep, integrationId, isManualNavigation]);

  const loadStepConfiguration = async (step: string) => {
    setIsCheckingStatus(true);
    try {
      switch (step) {
        case "mapping":
          const mappingResponse = await fetch(
            `/api/check-column-mapping?integrationId=${integrationId}`,
          );
          const mappingData = await mappingResponse.json();
          setStepConfigs((prev) => ({ ...prev, mapping: mappingData }));
          break;

        case "frequency":
          const scheduleResponse = await fetch(
            path.to.api.checkScheduleStatus("fetch-sales-orders-us3"),
          );
          const scheduleData = await scheduleResponse.json();
          console.log("scheduleData", scheduleData);
          setStepConfigs((prev) => ({ ...prev, frequency: scheduleData }));
          break;

        case "notification":
          const notificationResponse = await fetch(
            "/api/check-notification-setup",
            {
              method: "POST",
              body: JSON.stringify({ name: "Sales Order Sync Notification" }),
            },
          );
          const notificationData = await notificationResponse.json();

          // Ensure we're setting the complete notification config with fresh data
          const config = {
            isConfigured: notificationData.isConfigured,
            notificationId: notificationData.notificationId,
            webContent: notificationData.webContent,
            emailConfig: {
              recipients: notificationData.emailConfig?.recipients || [],
            },
          };

          setStepConfigs((prev) => ({
            ...prev,
            notification: config,
          }));

          // Force a refresh of the NotificationStep by updating its key
          setStepKey((prev) => prev + 1);
          break;
      }
    } catch (error) {
      console.error(`Error loading ${step} configuration:`, error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const checkStatus = async () => {
    if (isManualNavigation) {
      setIsCheckingStatus(false);
      return;
    }

    setIsCheckingStatus(true);
    try {
      // Get the workflow configuration status
      const statusResponse = await fetch("/api/workflow-configuration-status");
      const status = await statusResponse.json();

      // Update integration status
      if (status.steps.integration) {
        const integrationResponse = await fetch(
          "/api/dynamics-integration-status",
        );
        const integrationData = await integrationResponse.json();
        setIntegrationStatus(integrationData);
      }

      // Set current step based on the next incomplete step
      if (status.nextStep) {
        setCurrentStep(status.nextStep);
        // Load configuration for the next step
        await loadStepConfiguration(status.nextStep);
      } else {
        setCurrentStep("integration");
      }
    } catch (error) {
      console.error("Error checking status:", error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="w-full max-w-2xl backdrop-blur-sm border-none">
        <AnimatePresence mode="wait">
          {isCheckingStatus ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <LuLoader2 className="w-8 h-8 animate-spin text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {currentStep === "integration" ? (
                <IntegrationStep
                  integrationStatus={integrationStatus}
                  onComplete={() => setCurrentStep("frequency")}
                />
              ) : currentStep === "frequency" ? (
                <FrequencyStep
                  onComplete={() => setCurrentStep("mapping")}
                  savedConfig={stepConfigs.frequency}
                />
              ) : currentStep === "mapping" ? (
                <DataMappingStep
                  onComplete={() => setCurrentStep("notification")}
                  integrationStatus={integrationStatus}
                  savedConfig={stepConfigs.mapping}
                />
              ) : (
                <NotificationStep
                  key={stepKey}
                  onComplete={onClose}
                  integrationId={integrationStatus?.integrationId || ""}
                  savedConfig={stepConfigs.notification}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
}
