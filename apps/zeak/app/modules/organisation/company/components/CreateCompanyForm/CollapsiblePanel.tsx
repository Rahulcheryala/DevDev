import { Button, cn, Label } from "@zeak/react";
import { ChevronDown, PencilLine } from "lucide-react";
import { useState } from "react";

export default function CollapsiblePanel({
  label,
  children,
  showEnabled = false,
  onEdit,
}: {
  label: string;
  children: React.ReactNode;
  showEnabled?: boolean;
  onEdit?: () => void;
}) {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between bg-[#E5EAF2] px-6 py-3 rounded-t-zeak",
          {
            "rounded-b-zeak": !isEnabled,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Label
            htmlFor={label}
            className="text-[#0D0C22] text-lg font-['Suisse Int\'l'] font-medium"
          >
            {label}
          </Label>
        </div>
        <div className="flex items-center gap-4">
          {onEdit && (
            <Button variant="ghost" size="md" onClick={onEdit} className="px-0">
              <PencilLine className="w-6 h-6 text-secondary" />
            </Button>
          )}
          {showEnabled && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsEnabled(!isEnabled)}
              className="px-0"
            >
              <ChevronDown
                className={cn("w-6 h-6 text-secondary", {
                  "-rotate-90": !isEnabled,
                })}
              />
            </Button>
          )}
        </div>
      </div>
      {isEnabled && (
        <div className="p-6 bg-[#F7F7F8] rounded-b-zeak">{children}</div>
      )}
    </>
  );
}
