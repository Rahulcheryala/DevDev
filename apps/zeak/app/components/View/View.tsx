import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@zeak/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useState } from "react";
import { ListView, ShareView, UpsertView } from "./components";
import type { Views } from "~/modules/view";

interface ViewProps {
  tableName: string;
}

const View = ({ tableName }: ViewProps) => {
  const [isListViewMode, setIsListViewMode] = useState(true);
  const [isUpsertMode, setIsUpsertMode] = useState(true);
  const [selectedView, setSelectedView] = useState<Views | null>(null);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
          <Button
            variant="secondary"
            className="py-[10px] px-4 min-w-[162px] text-sm bg-white hover:bg-white h-10 text-left justify-between text-secondary"
          >
            Table views {isListViewMode ? <LuChevronDown /> : <LuChevronUp />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[600px]">
          {isListViewMode ? (
            <ListView
              tableName={tableName}
              setIsListViewMode={setIsListViewMode}
              setIsUpsertMode={setIsUpsertMode}
              selectView={selectedView}
              setSelectView={setSelectedView}
            />
          ) : (
            <>
              {isUpsertMode ? (
                <UpsertView
                  tableName={tableName}
                  setIsListViewMode={setIsListViewMode}
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
                />
              ) : (
                <ShareView
                  tableName={tableName}
                  setIsUpsertMode={setIsUpsertMode}
                  setIsListViewMode={setIsListViewMode}
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
                />
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default View;
