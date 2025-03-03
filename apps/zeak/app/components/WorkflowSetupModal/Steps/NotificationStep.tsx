import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LuBell, LuLoader2, LuAlertCircle, LuX, LuMail } from "react-icons/lu";
import { Button, Textarea, MultiSelect } from "@zeak/react";
import { useCtxVariables } from "~/hooks/useCtxVariables";
import { sendEmail, createHtmlEmail } from "~/utils/emailHelper";
import { toast } from "sonner";
import { path } from "~/utils/path";
import {
  NotificationType,
  NotificationPurpose,
  NotificationPriority,
  NotificationColor,
} from "~/routes/x+/notifications+/_types"; // Import the enums

interface NotificationStepProps {
  onComplete: () => void;
  integrationId: string;
  savedConfig?: {
    isConfigured: boolean;
    notificationId: string;
    webContent: string;
    emailConfig: any;
  };
}

interface EmailBadge {
  email: string;
  isValid: boolean;
}

export function NotificationStep({
  onComplete,
  integrationId,
  savedConfig,
}: NotificationStepProps) {
  const [message, setMessage] = useState(
    savedConfig?.webContent ||
      "Congratulations! ${{user.firstName}}, $count{{SalesOrdersStaging}} have been grabbed from the connected ${{integrations.integrationName}} instance of type ${{integrations.integrationType}} and replicated into Zeak",
  );
  const [recipients, setRecipients] = useState<string[]>(
    savedConfig?.emailConfig?.recipients || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { variables, isLoading: isLoadingVars } = useCtxVariables();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredVariables, setFilteredVariables] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailBadges, setEmailBadges] = useState<EmailBadge[]>(
    savedConfig?.isConfigured ? [] : [], // You'll need to fetch recipients if needed
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Only use current recipients state, not combining with savedConfig
      const validRecipients = recipients.filter((email) => isValidEmail(email));

      const requestBody = {
        name: "Sales Order Sync Notification",
        description: "Notification for sales order sync automation",
        purpose: NotificationPurpose.SYSTEM_ALERTS,
        type: NotificationType.EVENT,
        priority: NotificationPriority.HIGH,
        color: NotificationColor.GREEN.toLowerCase(),
        webContent: message,
        isWebDelivery: "1",
        isEmailDelivery: "1",
        isSMSDelivery: "0",
        audience: "all",
        companyIdStr: JSON.stringify([]),
        recipients: validRecipients,
        integrationId,
        notificationId: savedConfig?.notificationId, // Include this to update existing notification
        recurrence: null,
        startDateTime: null,
        endDateTime: null,
        occurences: null,
        emailConfig: {
          recipients: validRecipients,
        },
      };

      const response = await fetch(path.to.api.notificationCreate, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Create Response:", data);

      // Check for the correct response format
      if (!response.ok || !data.notificationId) {
        throw new Error("Failed to save notification");
      }

      // Update recipients state with the saved recipients
      setRecipients(validRecipients);

      // After successful save, try to get preview
      try {
        const previewResponse = await fetch(path.to.api.notificationTrigger, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            notificationId: data.notificationId,
            preview: true,
          }),
        });

        if (!previewResponse.ok) {
          throw new Error(`Preview failed: ${previewResponse.statusText}`);
        }

        const previewData = await previewResponse.json();

        if (!previewData.success) {
          throw new Error(previewData.error || "Failed to generate preview");
        }

        // Show preview toast with resolved content
        toast.custom(
          (t) => (
            <div className="bg-background border p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-2">Preview Notification</h3>
              <p>{previewData.resolvedContent || message}</p>
            </div>
          ),
          {
            duration: 5000,
          },
        );

        onComplete();
      } catch (previewErr) {
        console.error("Preview error:", previewErr);
        // Show success toast but indicate preview is not available
        toast.success("Notification saved successfully", {
          description: "Preview not available at this time",
        });
        onComplete();
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to save notification",
      );

      toast.error("Failed to save notification settings", {
        description:
          err instanceof Error
            ? err.message
            : "Failed to save notification settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value.slice(0, 320));

    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPosition);
    const match = textBeforeCursor.match(/\$\{\{([^}]*)$/);

    if (match) {
      const searchTerm = match[1].toLowerCase().trim();
      const matches = variables.filter((v) =>
        v.toLowerCase().includes(searchTerm),
      );
      setFilteredVariables(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleVariableSelect = (variable: string) => {
    if (textareaRef.current) {
      const cursorPosition = textareaRef.current.selectionStart;
      const textBeforeCursor = message.slice(0, cursorPosition);
      const textAfterCursor = message.slice(cursorPosition);

      const lastOpenBrace = textBeforeCursor.lastIndexOf("${{");
      if (lastOpenBrace >= 0) {
        const newText =
          textBeforeCursor.slice(0, lastOpenBrace) +
          `\$\{\{${variable}}}` +
          textAfterCursor;

        setMessage(newText);

        const newCursorPosition = lastOpenBrace + variable.length + 4;
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
              newCursorPosition,
              newCursorPosition,
            );
          }
        }, 0);
      }
    }
    setShowDropdown(false);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleEmailInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newEmail = emailInput.trim();

      if (
        newEmail &&
        isValidEmail(newEmail) &&
        !recipients.includes(newEmail)
      ) {
        setRecipients([...recipients, newEmail]);
        setEmailInput("");
      }
    }
  };

  const removeEmailBadge = (indexToRemove: number) => {
    setRecipients((prevRecipients) =>
      prevRecipients.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleEmailWrapperClick = () => {
    emailInputRef.current?.focus();
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 mb-4"
        >
          <LuBell className="w-7 h-7 text-primary" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-2">
          Step 4: Customize Notifications
        </h2>
        <p className="text-sm text-muted-foreground">
          Set up notifications for when sales orders are synced
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium block mb-2">
            Notification Message
            <span className="text-xs text-muted-foreground ml-2">
              ({320 - message.length} characters remaining)
            </span>
          </label>
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              className="h-32"
              placeholder="Enter notification message..."
            />
            {showDropdown && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                {filteredVariables.length > 0 ? (
                  filteredVariables.map((variable) => (
                    <li
                      key={variable}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleVariableSelect(variable)}
                    >
                      {variable}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No matching variables found
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium block">
            Email Recipients
            <span className="text-xs text-muted-foreground ml-2">
              Press comma or enter after each email
            </span>
          </label>
          <div
            className={`min-h-[2.5rem] p-2 border rounded-md bg-background flex flex-wrap gap-2 cursor-text ${
              isInputFocused ? "ring-2 ring-primary/20 border-primary" : ""
            }`}
            onClick={handleEmailWrapperClick}
          >
            {recipients.map((badge, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                  isValidEmail(badge)
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                <LuMail className="w-3 h-3" />
                {badge}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEmailBadge(index);
                  }}
                  className="hover:bg-primary/10 rounded-full p-0.5"
                >
                  <LuX className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              ref={emailInputRef}
              type="text"
              value={emailInput}
              onChange={handleEmailInputChange}
              onKeyDown={handleEmailInputKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="flex-1 min-w-[200px] bg-transparent outline-none text-sm"
              placeholder={
                recipients.length === 0 ? "Enter email addresses..." : ""
              }
            />
          </div>
          {emailInput && !isValidEmail(emailInput) && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <LuAlertCircle className="w-3 h-3" />
              Please enter a valid email address
            </p>
          )}
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
          onClick={handleSave}
          disabled={isLoading || message.length === 0}
          className="w-full"
        >
          {isLoading ? (
            <>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Notification Settings"
          )}
        </Button>
      </div>
    </div>
  );
}
