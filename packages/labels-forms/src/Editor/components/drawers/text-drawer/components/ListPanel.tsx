import React, { forwardRef, RefObject } from "react";
import ReactQuill from "react-quill";
import { QuillDefaultValueProps, TextType } from "../../../../types"; // Import types
import { OrderedList, UnorderedList } from "../../icons";
import { listType } from "../../../../consts/text";

interface ListPanelProps {
  quillDefaultValues: QuillDefaultValueProps;
  setQuillDefaultValues: React.Dispatch<
    React.SetStateAction<QuillDefaultValueProps>
  >;
  textFormatting: TextType;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  applyListFormat: (
    quillRef: RefObject<ReactQuill>,
    type: string,
    quillDefaultValues: QuillDefaultValueProps,
    setQuillDefaultValues: React.Dispatch<
      React.SetStateAction<QuillDefaultValueProps>
    >,
  ) => void;
}

const ListPanel = forwardRef<ReactQuill, ListPanelProps>(
  (
    {
      quillDefaultValues,
      setQuillDefaultValues,
      textFormatting,
      setTextFormatting,
      applyListFormat,
    },
    quillRef,
  ) => {
    const listOptions = [
      {
        type: listType.BULLET,
        Icon: UnorderedList,
        isActive: textFormatting.list === listType.BULLET,
      },
      {
        type: listType.ORDERED,
        Icon: OrderedList,
        isActive: textFormatting.list === listType.ORDERED,
      },
    ];

    return (
      <div className="flex flex-col items-center pb-[24px] pl-[24px] pr-[24px]">
        <div className="w-full flex items-center">
          <div className="w-[112px]">
            <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
              Style
            </p>
          </div>
          <div className="w-full ps-[30px]">
            <div className="bg-[rgb(244,_244,_244)] p-[2px] rounded-[10px] flex justify-between">
              {listOptions.map(({ type, Icon, isActive }) => (
                <button
                  key={type}
                  onClick={() => {
                    applyListFormat(
                      quillRef as RefObject<ReactQuill>,
                      type,
                      quillDefaultValues,
                      setQuillDefaultValues,
                    );
                    setTextFormatting(
                      "list",
                      textFormatting.list === type ? "" : type,
                    );
                  }}
                  className={`w-1/2 py-[8px] flex items-center justify-center px-[10px] rounded-[8px] ${
                    isActive ? "bg-[#19110B] text-white" : ""
                  }`}
                >
                  <Icon color={isActive ? "#FFFFFF" : undefined} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ListPanel.displayName = "ListPanel";

export default ListPanel;
