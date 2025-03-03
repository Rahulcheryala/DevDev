import React from "react";
import IconButton from "./IconButton";
import PreviewButton from "./PreviewButton";

type DocumentActionsPanelProps = {
  handleCommentClick: () => void;
  handlePrintLabel: () => void;
  handlePreview: () => void;
  chatIcon: string;
  shareIcon: string;
  printIcon: string;
  playIcon: string;
};

const DocumentActionsPanel: React.FC<DocumentActionsPanelProps> = ({
  handleCommentClick,
  handlePrintLabel,
  handlePreview,
  chatIcon,
  shareIcon,
  printIcon,
  playIcon,
}) => {
  const iconButtons = [
    {
      icon: chatIcon,
      width: "40px",
      height: "40px",
      onClick: handleCommentClick,
    },
    {
      icon: shareIcon,
      width: "20px",
      height: "20px",
    },
    {
      icon: printIcon,
      width: "20px",
      height: "20px",
      onClick: handlePrintLabel,
    },
  ];

  return (
    <div className="flex flex-row space-x-4 items-center">
      {iconButtons.map(({ icon, width, height, onClick }, index) => (
        <IconButton
          key={index}
          icon={icon}
          width={width}
          height={height}
          onClick={onClick}
        />
      ))}
      <PreviewButton icon={playIcon} onClick={handlePreview} />
    </div>
  );
};

export default DocumentActionsPanel;
