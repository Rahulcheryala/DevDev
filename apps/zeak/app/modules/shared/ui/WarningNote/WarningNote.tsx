import { IconButton } from "@zeak/react";
import { IoCloseSharp } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";

type WarningNoteProps = {
  message: string;
  closeHandle: (e: any) => void;
};

const WarningNote = (props: WarningNoteProps) => {
  const { message, closeHandle } = props;
  return (
    <div
      className="flex justify-between shadow-sm items-start px-4 py-[18px] rounded-xl relative"
      style={{ backgroundColor: "#FFFAE5" }}
    >
      <IconButton
        aria-label={"closeMessage"}
        variant="ghost"
        className="absolute text-accent-accentYellow top-[50%] -translate-y-[50%] right-1 p-0 "
        icon={<IoCloseSharp />}
        onClick={closeHandle}
      />
      <div className="pl-[40px] flex">
        <GoQuestion
          size={24}
          className="absolute left-4 top-[50%] -translate-y-[50%] text-accent-accentYellow"
        />
        <div>
          <h3 className="text-sm text-accent-accentYellow me-2">Note:</h3>
          <p className="text-accent-dark text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default WarningNote;
