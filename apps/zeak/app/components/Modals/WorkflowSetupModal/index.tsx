import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuLoader2 } from "react-icons/lu";
import { supabaseClient } from "@zeak/database/supabase/functions/lib/supabase";
import { IntegrationStep } from "../../WorkflowSetupModal/Steps/IntegrationStep";
import { FrequencyStep } from "./Steps/FrequencyStep";

interface WorkflowSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  initialStep?: "integration" | "frequency";
}

export function WorkflowSetupModal({
  isOpen,
  onClose,
  taskId,
  initialStep = "integration",
}: WorkflowSetupModalProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isCheckingIntegration, setIsCheckingIntegration] = useState(true);
  const [integrationStatus, setIntegrationStatus] = useState<{
    isIntegrated: boolean;
    message?: string;
  }>();
  const navigate = useNavigate();

  // Check integration status
  useEffect(() => {
    checkIntegrationStatus();

    // Subscribe to integration changes using the correct Supabase client
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
          checkIntegrationStatus();
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  const checkIntegrationStatus = async () => {
    setIsCheckingIntegration(true);
    try {
      const response = await fetch("/api/dynamics-integration-status");
      const status = await response.json();
      setIntegrationStatus(status);

      if (status.isIntegrated) {
        setCurrentStep("frequency");
      }
    } catch (error) {
      console.error("Error checking integration:", error);
    } finally {
      setIsCheckingIntegration(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-sm border-none">
        {/* ... rest of the JSX remains the same ... */}
      </DialogContent>
    </Dialog>
  );
}
