import React, { FC } from "react";
import { SafeAreaProps } from "../../../../types";
import Margin from "./Margin";

const SafeArea: FC<SafeAreaProps> = ({
  marginVisible,
  dimensions,
  marginValue,
  onChange,
}) => (
  <>
    <p className="text-[12px] font-thin text-[#5E626D] mt-2">
      Make sure any important parts of your design such as text and logos are
      inside of the safe area, otherwise they may be cut off.
    </p>
    {marginVisible && (
      <Margin
        dimensions={dimensions}
        marginValue={marginValue}
        onChange={onChange}
      />
    )}
  </>
);

export default SafeArea;
