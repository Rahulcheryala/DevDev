import React, { useRef, forwardRef } from "react";
import Favourite from "../../icons/Favourite";
import StatusDropdown from "./StatusDropdown";
import { defaultDocumentName } from "../../../consts/toolbar";
import { EditorManagerInstance } from "../../../types";

type DocumentInfoPanelProps = {
  favourite: boolean;
  handleFavourite: () => void;
  documentName: string;
  setDocumentName: (name: string) => void;
  handleLabelValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputWidth: string | number;
  status: string;
  statusClasses: string;
  statusDropdownClass: string;
  handlestatus: (status: string) => void;
};

const DocumentInfoPanel = forwardRef<
  EditorManagerInstance | undefined,
  DocumentInfoPanelProps
>(
  (
    {
      favourite,
      handleFavourite,
      documentName,
      setDocumentName,
      handleLabelValue,
      inputWidth,
      status,
      statusClasses,
      statusDropdownClass,
      handlestatus,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div className="flex flex-row">
        <div className="flex flex-row items-center space-x-2 mr-4">
          <div onClick={handleFavourite} className="cursor-pointer">
            <Favourite favourite={favourite} />
          </div>

          <input
            ref={inputRef}
            maxLength={40}
            value={documentName ? documentName : ""}
            onChange={handleLabelValue}
            onBlur={() => {
              if (!documentName) {
                (
                  ref as React.MutableRefObject<
                    EditorManagerInstance | undefined
                  >
                )?.current?.onLabelNameChange(defaultDocumentName);
                setDocumentName(defaultDocumentName);
              } else {
                (
                  ref as React.MutableRefObject<
                    EditorManagerInstance | undefined
                  >
                )?.current?.onLabelNameChange(documentName);
              }
            }}
            className="outline-none transition-all font-suisseIntl-300"
            style={{
              width: inputWidth,
              textAlign: "center",
            }}
          />

          <div
            onClick={() => inputRef.current?.focus()}
            className="cursor-pointer"
          ></div>
        </div>

        <StatusDropdown
          status={status}
          statusClasses={statusClasses}
          statusDropdownClass={statusDropdownClass}
          handlestatus={handlestatus}
        />
      </div>
    );
  },
);

DocumentInfoPanel.displayName = "DocumentInfoPanel";

export default DocumentInfoPanel;
