import { useState, useEffect } from "react";
import { Button, Input } from "@zeak/react";
import { motion } from "framer-motion";
import { LuLoader2, LuCheckCircle2, LuAlertCircle } from "react-icons/lu";
import { FaMicrosoft } from "react-icons/fa";
import { getSupabaseServiceRole } from "~/lib/supabase/client";

interface IntegrationStepProps {
  integrationStatus:
    | {
        isIntegrated: boolean;
        message?: string;
        integrationData?: {
          id: string;
          dynamicsBaseUrl: string;
          email: string;
        } | null;
      }
    | undefined;
  onComplete: (integrationId?: string) => void;
}

const MICROSOFT_BLUE = "#00a4ef"; // Microsoft's sky blue brand color

export function IntegrationStep({
  integrationStatus,
  onComplete,
}: IntegrationStepProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (integrationStatus?.isIntegrated) {
      onComplete();
    }

    if (integrationStatus?.integrationData?.dynamicsBaseUrl) {
      setBaseUrl(integrationStatus.integrationData.dynamicsBaseUrl);
    }
  }, [integrationStatus, onComplete]);

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const authWindow = window.open(
        `/auth/integrations/erp/dynamics/login?baseUrl=${encodeURIComponent(baseUrl)}&returnTo=${encodeURIComponent(window.location.href)}`,
        "Connect to Dynamics 365",
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`,
      );

      if (!authWindow) {
        throw new Error("Popup blocked. Please allow popups for this site.");
      }

      const handleMessage = async (event: MessageEvent) => {
        if (event.data?.type === "DYNAMICS_AUTH_SUCCESS") {
          window.removeEventListener("message", handleMessage);
          authWindow?.close();

          const response = await fetch("/api/dynamics-integration-status");
          const status = await response.json();

          if (status.isIntegrated && status.integrationData?.id) {
            onComplete(status.integrationData.id);
          } else {
            setError("Integration verification failed. Please try again.");
          }
        }
      };

      window.addEventListener("message", handleMessage);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to connect. Please try again.",
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const logoColor = baseUrl ? MICROSOFT_BLUE : "currentColor";

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
            baseUrl ? "bg-[#00a4ef]/10" : "bg-primary/5"
          } mb-4 transition-colors duration-200`}
        >
          <FaMicrosoft
            className={`w-7 h-7 transition-colors duration-200`}
            style={{ color: logoColor }}
          />
        </motion.div>
        <h2 className="text-xl font-semibold mb-2">
          Step 1: Connect to Dynamics 365
        </h2>
        <p className="text-sm text-muted-foreground">
          Connect your Dynamics 365 instance to enable automated sales order
          sync
        </p>
      </div>

      {(integrationStatus?.message || error) && !baseUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2 mb-6 text-sm"
        >
          <LuAlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{error || integrationStatus?.message}</p>
        </motion.div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="baseUrl" className="text-sm font-medium block mb-2">
            Instance URL
          </label>
          <Input
            id="baseUrl"
            type="url"
            placeholder="https://your-instance.operations.dynamics.com"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleConnect}
          disabled={!baseUrl || isConnecting}
          className="w-full h-11"
        >
          {isConnecting ? (
            <>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <FaMicrosoft className="mr-2 h-4 w-4" />
              Connect to Dynamics 365
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
