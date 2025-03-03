import React, { FC } from "react";
import { BleedAreaProps } from "../../../../types";
import Bleed from "./Bleed";

const BleedArea: FC<BleedAreaProps> = ({
  bleedVisible,
  dimensions,
  bleedValue,
  onChange,
}) => (
  <>
    <p className="text-[12px] font-thin text-[#5E626D] mt-2">
      Make sure that your background extends to fill the bleed to avoid your
      Business Cards having white edges when trimmed.
    </p>
    {bleedVisible && (
      <Bleed
        dimensions={dimensions}
        bleedValue={bleedValue}
        onChange={onChange}
      />
    )}
  </>
);

export default BleedArea;
