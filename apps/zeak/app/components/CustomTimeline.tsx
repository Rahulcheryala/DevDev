import { motion } from "framer-motion";
import { Check, CheckCircle2, Circle, CrossIcon, X } from "lucide-react";
import { cn } from "@zeak/react";

interface CustomTimelineProps {
  steps: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
  onStepClick: (stepId: string) => void;
  currentStep: string;
}

export function CustomTimeline({
  steps,
  onStepClick,
  currentStep,
}: CustomTimelineProps) {
  return (
    <div className="w-full px-4 py-12">
      <div className="relative">
        {/* Horizontal connecting line */}
        <div className="absolute top-[28px] left-[calc(7px+28px)] right-0 h-[2px] bg-muted-foreground/30" />

        {/* Steps container */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center",
                  "bg-background transition-colors duration-200 cursor-pointer",
                  step.completed
                    ? "border-2 border-primary text-primary"
                    : currentStep === step.id
                      ? "border-2 border-primary"
                      : "border-2 border-muted-foreground/30 text-muted-foreground/50",
                )}
                onClick={() => onStepClick(step.id)}
              >
                {step.completed ? (
                  <Check className="w-7 h-7 text-green-500" />
                ) : (
                  <X className="w-7 h-7 text-red-500" />
                )}
              </motion.div>

              <div className="flex flex-col items-center text-center">
                <h2
                  className={cn(
                    "text-sm font-semibold mb-1",
                    currentStep === step.id
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {step.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
