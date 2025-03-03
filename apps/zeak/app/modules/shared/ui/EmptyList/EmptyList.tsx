import { Button } from "@zeak/react";
import { FaPlus } from "react-icons/fa6";
import { EmptyListOriginOptions } from "../../types";

type EmptyListProps = {
  title: string;
  ctaText: string;
  origin?: EmptyListOriginOptions;
  ctaHandle: (e: any) => void;
};

const EmptyList = (props: EmptyListProps) => {
  const { title, ctaText, origin, ctaHandle } = props;
  return (
    <div
      className={`${
        origin === EmptyListOriginOptions.FontManagerUpload
          ? "h-[calc(100vh_-_500px)]"
          : "py-[200px]"
      } px-10 flex flex-col justify-center items-center"`}
    >
      <h3 className="text-tertiary mb-10 text-center">{title}</h3>
      <Button
        variant="secondary"
        onClick={ctaHandle}
        className="border border-dashed border-tertiary p-6 rounded-sm h-[88px] bg-table hover:text-card hover:border-solid font-normal"
      >
        <FaPlus className="mr-4" />
        {ctaText}
      </Button>
    </div>
  );
};

export default EmptyList;
