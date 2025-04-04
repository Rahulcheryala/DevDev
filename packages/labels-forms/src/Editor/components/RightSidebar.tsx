import React, { useState } from "react";
import {
  BrandingIcon,
  ControlsIcon,
  DashboardIcon,
  DataIcon,
  ElementsNewIcon,
  ProjectsIcon,
  TemplatesIcon,
  UploadsIcon,
  Brush,
} from "./drawers/icons";
import { rightSidebar } from "../consts";
import { useEditor } from "../context/EditorContext";
import { useStoreStateValue } from "@scena/react-store";
import { $editor } from "../stores/stores";

const RightSidebar = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { setSelectedTool, selectedTool } = useEditor();
  const isSelectedTool = selectedTool === rightSidebar.ELEMENTS;
  const editorRef = useStoreStateValue($editor);

  const sidebarItems = [
    {
      icon: (isActive: boolean) => <DashboardIcon isActive={isActive} />,
      title: "Dashboard",
      action: () => {
        editorRef.current?.onDashboardClick();
      },
    },
    {
      icon: () => <TemplatesIcon />,
      title: "Templates",
      action: () => {
        editorRef.current?.onTemplatesClick();
      },
    },
    {
      icon: (isActive: boolean) => <ElementsNewIcon isActive={isActive} />,
      title: "Elements",
      action: () => {
        setSelectedTool(!isSelectedTool ? rightSidebar.ELEMENTS : "");
        editorRef.current?.onElementsClick();
      },
    },
    {
      icon: () => <BrandingIcon />,
      title: "Branding",
      action: () => null,
    },
    {
      icon: () => <UploadsIcon />,
      title: "Uploads",
      action: () => {
        editorRef.current?.onUploadsClick();
      },
    },
    {
      icon: () => <ProjectsIcon />,
      title: "Projects",
      action: () => {
        editorRef.current?.onProjectsClick();
      },
    },
    {
      icon: () => <DataIcon />,
      title: "Data",
      action: () => {
        editorRef.current?.onDataClick();
      },
    },
    {
      icon: (isActive: boolean) => <Brush isActive={isActive} />,
      title: "Designer",
      action: () => null,
    },
    {
      icon: () => <ControlsIcon />,
      title: "Controls",
      action: () => {
        editorRef.current?.onControlsClick();
      },
    },
  ];
  return (
    <div
      className=" w-[90px] fixed right-0 top-[120px] flex border-l border-t border-gray-100
       h-[calc(100vh_-_176px)] bg-white"
    >
      <div
        className="w-full h-full custom-scrollbar overflow-x-hidden 
        overflow-y-auto border-l border-[rgb(233,_233,_238)"
      >
        <ul className="elements-menu w-full h-full">
          {sidebarItems.map((items, index) => {
            const isActive = selectedItemIndex === index;
            return (
              <li
                onClick={() => {
                  setSelectedItemIndex(index);
                  items.action();
                }}
                key={index}
                className={`w-full py-[10px] hover:bg-[#f0f0f0] 
                    cursor-pointer ${isActive && "active"}`}
              >
                <div className="text-center">
                  <span className="block w-[24px] h-[24px] mx-[auto]">
                    {items.icon(isActive)}
                  </span>
                  <span className="block text-[10px] leading[16px] mt-[2px]">
                    {items.title}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
