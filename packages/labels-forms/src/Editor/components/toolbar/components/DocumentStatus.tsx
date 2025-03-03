import React from "react";
import { documentSaveStatus, statusTextColor } from "../../../consts/toolbar";

type DocumentStatusProps = {
  savedStatus: string;
  savedCloudIcon: string;
  uploadCloudIcon: string;
  uploadFailedCloudIcon: string;
  offlineCloudIcon: string;
};

const DocumentStatus: React.FC<DocumentStatusProps> = ({
  savedStatus,
  savedCloudIcon,
  uploadCloudIcon,
  uploadFailedCloudIcon,
  offlineCloudIcon,
}) => {
  const statusMap: {
    [key: string]: { icon: string; text: string; textColor?: string };
  } = {
    saved: {
      icon: savedCloudIcon,
      text: documentSaveStatus.SAVED,
      textColor: statusTextColor.GRAY,
    },
    uploading: {
      icon: uploadCloudIcon,
      text: documentSaveStatus.UPLOADING,
      textColor: statusTextColor.GRAY,
    },
    upload_failed: {
      icon: uploadFailedCloudIcon,
      text: documentSaveStatus.UPLOAD_FAILED,
      textColor: statusTextColor.RED,
    },
    offline: {
      icon: offlineCloudIcon,
      text: documentSaveStatus.OFFLINE,
      textColor: statusTextColor.ORANGE,
    },
  };

  const { icon, text, textColor } = statusMap[savedStatus] || {
    icon: savedCloudIcon,
    text: documentSaveStatus.SAVED,
    textColor: statusTextColor.GRAY,
  };

  return (
    <div className="cursor-pointer">
      <div className="flex flex-row items-center space-x-2">
        <img src={icon} width="24px" height="24px" />
        <div className={`text-[12px] font-normal`} style={{ color: textColor }}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default DocumentStatus;
