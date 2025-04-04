import * as React from "react";
import LayersTab from "./tabs/LayersTab";

export type TabsProps = {
  tabs: string[];
};
export function Tabs({
  tabs,
}: TabsProps & { quillRef?: React.RefObject<any> | null }) {
  const TABS: Record<string, () => React.ReactElement> = {
    layers: () => (
      <div className="border-b border-solid py-1">
        <div className="flex flex-row justify-between items-center">
          <h2 className="m-0 text-current font-bold text-xs p-1">Layers</h2>
          <h2 className="text-2xl cursor-pointer">+</h2>
        </div>
        <LayersTab />
      </div>
    ),
  };

  return (
    <div
      className="relative w-full h-full overflow-auto z-10 px-1"
      style={{
        background: "var(--scena-editor-color-background-tool)",
        borderTop: "1px solid var(--scena-editor-color-divider)",
      }}
    >
      {tabs
        .filter((tab) => !["frame", "history"].includes(tab))
        .map((tab) => {
          const Element = TABS[tab](); // Call the function to get the component
          return <React.Fragment key={tab}>{Element}</React.Fragment>;
        })}
    </div>
  );
}
