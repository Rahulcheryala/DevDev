import { useState, useEffect } from "react";
import { Button } from "@zeak/react";
import { motion } from "framer-motion";
import { LuClock, LuLoader2 } from "react-icons/lu";
import { path } from "~/utils/path";

interface FrequencyStepProps {
  onComplete: () => void;
  savedConfig?: {
    exists: boolean;
    isActive: boolean;
    cron: string;
  };
}

export function FrequencyStep({ onComplete, savedConfig }: FrequencyStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("savedConfig", savedConfig);
  const parseCronToUnit = (cron: string): "minutes" | "hours" | "days" => {
    const parts = cron.split(" ");
    if (parts[0] === "0" && parts[1].startsWith("*/")) return "hours";
    if (parts[1] === "*" && parts[0].startsWith("*/")) return "minutes";
    return "days";
  };

  const parseCronToValue = (cron: string): number => {
    const parts = cron.split(" ");
    if (parts[0] === "0" && parts[1].startsWith("*/")) {
      return parseInt(parts[1].split("/")[1]);
    }
    if (parts[1] === "*" && parts[0].startsWith("*/")) {
      return parseInt(parts[0].split("/")[1]);
    }
    return parseInt(parts[2].split("/")[1]);
  };

  const initialUnit = savedConfig?.exists
    ? parseCronToUnit(savedConfig.cron)
    : "minutes";
  const initialValue = savedConfig?.exists
    ? parseCronToValue(savedConfig.cron)
    : 1;

  const [selectedUnit, setSelectedUnit] = useState<
    "minutes" | "hours" | "days"
  >(initialUnit);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useEffect(() => {
    const maxValues = {
      minutes: 60,
      hours: 24,
      days: 7,
    };

    if (selectedValue > maxValues[selectedUnit]) {
      setSelectedValue(1);
    }
  }, [selectedUnit]);

  const timeOptions = {
    minutes: Array.from({ length: 60 }, (_, i) => i + 1),
    hours: Array.from({ length: 24 }, (_, i) => i + 1),
    days: Array.from({ length: 7 }, (_, i) => i + 1),
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        path.to.api.salesOrderFetchCreateUserStory3,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interval: {
              value: selectedValue,
              unit: selectedUnit,
            },
          }),
        },
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create schedule");
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set frequency");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 mb-4"
        >
          <LuClock className="w-7 h-7 text-primary" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-2">
          Step 2: Set Sync Frequency
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose how often you want to sync sales orders
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center gap-3">
            {(["minutes", "hours", "days"] as const).map((unit) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedUnit === unit
                      ? "bg-primary text-white"
                      : "bg-primary/5 text-primary hover:bg-primary/10"
                  }`}
              >
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-4 relative">
              <div className="relative w-[100px]">
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(Number(e.target.value))}
                  className="w-full text-xl font-medium bg-transparent border-none focus:ring-0 text-center appearance-none cursor-pointer pr-8"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                  }}
                >
                  {timeOptions[selectedUnit].map((value) => (
                    <option key={value} value={value} className="text-base">
                      {value}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <svg
                    className="h-4 w-4 text-[#00a4ef]"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <span className="text-lg text-muted-foreground min-w-[60px]">
                {selectedValue === 1 ? selectedUnit.slice(0, -1) : selectedUnit}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-11"
        >
          {isSubmitting ? (
            <>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up schedule...
            </>
          ) : (
            "Confirm Schedule"
          )}
        </Button>
      </div>
    </div>
  );
}
