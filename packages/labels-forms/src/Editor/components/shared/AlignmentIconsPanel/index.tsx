import React from "react";
import IconButton from "./IconButton";
import {
  QrAlignLeftIcon,
  QrAlignRightIcon,
  QrAlignBottomIcon,
  QrAlignVerticalIcon,
  QrAlignTopIcon,
  QrAlignHorizontalIcon,
} from "../../drawers/icons";

const index: React.FC = () => {
  const icons = [
    { icon: <QrAlignLeftIcon color="#ffffff" />, isActive: true },
    { icon: <QrAlignRightIcon /> },
    { icon: <QrAlignBottomIcon /> },
    { icon: <QrAlignVerticalIcon /> },
    { icon: <QrAlignTopIcon /> },
    { icon: <QrAlignHorizontalIcon /> },
  ];

  return (
    <div className="pt-[24px] pb-[10px] px-[20px] border-stroke-secondary">
      <div className="flex flex-row flex-wrap mx-[-7px]">
        {icons.map((iconItem, index) => (
          <IconButton
            key={index}
            icon={iconItem.icon}
            isActive={iconItem.isActive || false}
          />
        ))}
      </div>
    </div>
  );
};

export default index;
