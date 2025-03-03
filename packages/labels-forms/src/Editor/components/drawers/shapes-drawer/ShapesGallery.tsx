import React from "react";
import { shapes } from "./shapesList";

type Props = {
  onSubmit: (args: any) => void;
};
const ShapesGallery: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className={"flex flex-row space-x-4 flex-wrap items-center"}>
      {shapes.map((shape, index) => {
        return (
          <div
            onClick={() => onSubmit(shape)}
            key={`${shape.title}-${index}`}
            className={`p-3 font-semibold flex items-center cursor-pointer rounded-[8px]  border-2 border-[#E9E9EE] hover:bg-[rgba(0,_0,_0,_0.06)]`}
          >
            <img src={shape.src} />
          </div>
        );
      })}
    </div>
  );
};

export default ShapesGallery;
