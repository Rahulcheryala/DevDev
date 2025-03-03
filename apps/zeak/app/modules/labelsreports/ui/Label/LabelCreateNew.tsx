import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@zeak/react";
import { BsArrows, BsArrowsVertical } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { useState } from "react";

type CreateNewProps = {
  isOpen?: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
};

const LabelCreateNew = ({ isOpen, onCancel, onSubmit }: CreateNewProps) => {
  const [value, setValue] = useState("Pixels");
  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New Design</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="flex">
            <div className="w-[calc(100%_-_350px)]"></div>
            <div className="w-[350px] border-l border-border">
              <div className="p-[24px] border-b border-border">
                <h6 className="text-sm leading-[20px] tracking-wider text-accent mb-[12px]">
                  File name
                </h6>
                <Input placeholder="Design name" size={"sm"} />
              </div>
              <div className="p-[24px] border-b border-border">
                <h6 className="text-sm leading-[20px] tracking-wider text-accent mb-[12px]">
                  Size
                </h6>
                <div className="flex items-center space-x-4">
                  <div className="relative border rounded-[10px] flex items-center px-[12px] py-[7px]">
                    <span className="w-[16px] mr-[8px]">
                      <BsArrows size={16} />
                    </span>
                    <Input
                      size={"sm"}
                      className="w-full h-[24px] outline-none px-[8px] border-0 border-l border-border rounded-none"
                    />
                    <div className="w-[16px] flex justify-center items-center flex-col">
                      <button
                        type="button"
                        className="w-[16px] h-[12px] flex items-center justify-center"
                      >
                        <MdKeyboardArrowUp
                          size={16}
                          className="text-tertiary"
                        />
                      </button>
                      <button
                        type="button"
                        className="w-[16px] h-[12px] flex items-center justify-center"
                      >
                        <MdKeyboardArrowDown
                          size={16}
                          className="text-tertiary"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="relative border rounded-[10px] flex items-center px-[12px] py-[7px]">
                    <span className="w-[16px] mr-[8px]">
                      <BsArrowsVertical size={16} />
                    </span>
                    <Input
                      size={"sm"}
                      className="w-full h-[24px] outline-none px-[8px] border-0 border-l border-border rounded-none"
                    />
                    <div className="w-[16px] flex justify-center items-center flex-col">
                      <button
                        type="button"
                        className="w-[16px] h-[12px] flex items-center justify-center"
                      >
                        <MdKeyboardArrowUp
                          size={16}
                          className="text-tertiary"
                        />
                      </button>
                      <button
                        type="button"
                        className="w-[16px] h-[12px] flex items-center justify-center"
                      >
                        <MdKeyboardArrowDown
                          size={16}
                          className="text-tertiary"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="relative border rounded-[10px] flex items-center w-[96px] h-[40px] justify-center">
                    <FiLock size={18} className="text-accent" />
                  </div>
                </div>
              </div>
              <div className="p-[24px] border-b border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-[calc(100%_-_96px)]">
                    <h6 className="text-sm leading-[20px] tracking-wider text-accent mb-[12px]">
                      Measure
                    </h6>
                    <Select value={value} onValueChange={setValue}>
                      <SelectTrigger className="w-full h-[40px] px-[16px] py-[14px] text-accent text-sm">
                        <div className="flex items-center">{value}</div>
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Pixels">Pixels</SelectItem>
                        <SelectItem value="xcelpros2">Xcelpros2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[96px]">
                    <h6 className="text-sm leading-[20px] tracking-wider text-accent mb-[12px]">
                      Orientation
                    </h6>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`relative border rounded-[10px] border-stroke flex items-center w-[85px] h-[40px] justify-center`}
                      >
                        <FiLock
                          size={18}
                          className={`${false ? "text-white" : "text-accent"}`}
                        />
                      </div>
                      <div
                        className={`relative border rounded-[10px] border-stroke flex items-center w-[85px] h-[40px] justify-center ${
                          true ? "bg-accent" : "bg-white"
                        }`}
                      >
                        <FiLock
                          size={18}
                          className={`${true ? "text-white" : "text-accent"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-[24px] border-b border-border">
                <h6 className="text-sm leading-[20px] tracking-wider text-accent mb-[12px]">
                  Margin
                </h6>
                <div className="flex flex-wrap items-center mx-[-8px]">
                  <div className="w-1/2 px-[8px] mb-[12px]">
                    <div className="relative border rounded-[10px] flex items-center px-[12px] py-[7px]">
                      <span className="w-[16px] mr-[8px]">
                        <BsArrows size={16} />
                      </span>
                      <Input
                        size={"sm"}
                        className="w-full h-[24px] outline-none px-[8px] border-0 border-l border-border rounded-none"
                      />
                      <div className="w-[16px] flex justify-center items-center flex-col">
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowUp
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowDown
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-[8px] mb-[12px]">
                    <div className="relative border rounded-[10px] flex items-center px-[12px] py-[7px]">
                      <span className="w-[16px] mr-[8px]">
                        <BsArrowsVertical size={16} />
                      </span>
                      <Input
                        size={"sm"}
                        className="w-full h-[24px] outline-none px-[8px] border-0 border-l border-border rounded-none"
                      />
                      <div className="w-[16px] flex justify-center items-center flex-col">
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowUp
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowDown
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-[8px] mb-[12px]">
                    <div className="relative border rounded-[10px] flex items-center px-[12px] py-[7px]">
                      <span className="w-[16px] mr-[8px]">
                        <BsArrows size={16} />
                      </span>
                      <Input
                        size={"sm"}
                        className="w-full h-[24px] outline-none px-[8px] border-0 border-l border-border rounded-none"
                      />
                      <div className="w-[16px] flex justify-center items-center flex-col">
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowUp
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowDown
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-[8px] mb-[12px]">
                    <div className="relative border rounded-[10px] flex items-center px-[12px] py-[7px]">
                      <span className="w-[16px] mr-[8px]">
                        <BsArrowsVertical size={16} />
                      </span>
                      <Input
                        size={"sm"}
                        className="w-full h-[24px] outline-none px-[8px] border-0 border-l border-border rounded-none"
                      />
                      <div className="w-[16px] flex justify-center items-center flex-col">
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowUp
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                        <button
                          type="button"
                          className="w-[16px] h-[12px] flex items-center justify-center"
                        >
                          <MdKeyboardArrowDown
                            size={16}
                            className="text-tertiary"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LabelCreateNew;
