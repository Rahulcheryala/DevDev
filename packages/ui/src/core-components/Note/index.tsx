import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { cn } from "../../utils";

export type NoteType = "info" | "warning" | "question";

export interface NoteProps {
  title?: string;
  content: string | React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  type?: NoteType;
  maxLines?: number;
  className?: string;
  collapseOnDismiss?: boolean;
}

/**
 * Note component for displaying informational messages that can be dismissed
 */
const Note: React.FC<NoteProps> = ({
  title = "NOTE",
  content,
  dismissible = true,
  onDismiss,
  type = "question",
  maxLines = 0,
  className,
  collapseOnDismiss = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Handle dismiss action
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Handle expand action
  const handleExpand = () => {
    setIsVisible(true);
  };

  // Define styling based on type
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return {
          containerClasses: "bg-blue-50 border-blue-200",
          iconClasses: "text-blue-500",
          titleClasses: "text-blue-600",
          textClasses: "text-blue-700",
          buttonClasses: "bg-blue-100 hover:bg-blue-200",
          icon: <IoInformationCircleOutline className="text-[20px]" />,
        };
      case "warning":
        return {
          containerClasses: "bg-amber-50 border-amber-200",
          iconClasses: "text-amber-500",
          titleClasses: "text-amber-600",
          textClasses: "text-amber-700",
          buttonClasses: "bg-amber-100 hover:bg-amber-200",
          icon: <BsExclamationTriangle className="text-[20px]" />,
        };
      case "question":
        return {
          containerClasses: "bg-accent-yellowLight",
          iconClasses: "text-accent-accentYellow",
          titleClasses: "text-accent-accentYellow",
          textClasses: "text-secondary",
          buttonClasses: "bg-accent-yellowLight hover:bg-amber-200",
          icon: <BsQuestionCircle className="text-[20px]" />,
        };
      default:
        return {
          containerClasses: "bg-accent-yellowLight",
          iconClasses: "text-accent-accentYellow",
          titleClasses: "text-accent-accentYellow",
          textClasses: "text-secondary",
          buttonClasses: "bg-accent-yellowLight hover:bg-amber-200",
          icon: <BsQuestionCircle className="text-[20px]" />,
        };
    }
  };

  const styles = getTypeStyles();

  // Early return if not visible and not using collapsible mode
  if (!isVisible) {
    if (!collapseOnDismiss) {
      return null;
    }

    // Render collapsed button when collapseOnDismiss is true
    return (
      <button
        className={cn(
          "p-2 rounded-full transition-all duration-200 shadow-sm",
          styles.buttonClasses
        )}
        onClick={handleExpand}
        aria-label={`Expand ${title} note`}
        title={title}
      >
        <div className={styles.iconClasses}>
          {styles.icon}
        </div>
      </button>
    );
  }

  // Render different versions based on maxLines
  const renderContent = () => {
    // If content is a React node, just render it
    if (React.isValidElement(content)) {
      return <div className={styles.textClasses}>{content}</div>;
    }

    // String content with optional truncation
    if (typeof content === "string" && maxLines > 0) {
      return (
        <p className={cn(styles.textClasses, "text-sm")}>
          {showMore
            ? content
            : `${content
              .split(/\s+/)
              .slice(0, maxLines * 10)
              .join(" ")}...`}
          <span
            className="text-accent-primary cursor-pointer ml-1"
            onClick={() => setShowMore(!showMore)}
          >
            <span className="text-accent-primary ml-1 text-sec">
              {showMore ? "SHOW LESS" : "MORE"}
            </span>
          </span>
        </p>
      );
    }

    // Regular string content with no truncation
    return <p className={cn(styles.textClasses, "text-sm")}>{content}</p>;
  };

  return (
    <div
      className={cn(
        "note-container py-3 px-6 rounded-md flex gap-6 items-start",
        styles.containerClasses,
        className
      )}
    >
      <div className={cn("flex-shrink-0 mt-1", styles.iconClasses)}>
        {styles.icon}
      </div>

      <div className="flex-1">
        <p className={cn("text-sm uppercase font-medium", styles.titleClasses)}>
          {title}
        </p>
        {renderContent()}
      </div>

      {dismissible && (
        <div className="flex-shrink-0 self-center">
          <IoCloseOutline
            className={cn("text-[24px] cursor-pointer", styles.iconClasses)}
            onClick={handleDismiss}
          />
        </div>
      )}
    </div>
  );
};

export default Note;
