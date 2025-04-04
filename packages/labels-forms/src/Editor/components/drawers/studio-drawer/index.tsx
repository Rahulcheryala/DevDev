import React, { useState } from "react";
import {
  useStoreState,
  useStoreStateSetValue,
  useStoreStateValue,
} from "@scena/react-store";
import {
  $bleedValue,
  $bleedVisible,
  $canvasProperties,
  $marginValue,
  $marginValueInPixels,
  $marginVisible,
  $unitManager,
} from "../../../stores/stores";
import { CornerRightDown } from "../../icons/CornerRightDown";
import { CornerLeftDown } from "../../icons/CornerLeftDown";
import { CornerRightUp } from "../../icons/CornerRightUp";
import { CornerLeftUp } from "../../icons/CornerLeftUp";
import { useEditor } from "../../../context/EditorContext";
import ToggleButton from "./components/ToggleButton";
import BleedArea from "./components/BleedArea";
import SafeArea from "./components/SafeArea";
import { RadiusInput } from "./components/RadiusInput";
import { CanvasProperties } from "../../../types";

const StudioControls = () => {
  const [marginVisible, setMarginVisible] = useStoreState($marginVisible);
  const [bleedVisible, setBleedVisible] = useStoreState($bleedVisible);
  const [marginValue, setMarginValue] = useStoreState($marginValue);
  const setMarginInPixels = useStoreStateSetValue($marginValueInPixels);
  const [bleedValue, setBleedValue] = useStoreState($bleedValue);
  const [canvasProperties, setCanvasProperties] =
    useStoreState($canvasProperties);
  const { setDimensions, dimensions } = useEditor();
  const unitManager = useStoreStateValue($unitManager);
  const [previousBleedValue, setPreviousBleedValue] = useState<number>(0);

  const handleBleed = (value: number) => {
    if (value < 0) {
      setBleedValue(0);
    } else {
      const adjustment = (value - previousBleedValue) * 2;
      adjustBleed(adjustment);
      setPreviousBleedValue(value);
      setBleedValue(value);
    }
  };

  const adjustBleed = (value: number) => {
    setDimensions((prevDimensions) => {
      return {
        ...prevDimensions,
        width: prevDimensions.width + value,
        height: prevDimensions.height + value,
      };
    });
  };

  const handleMargin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const margin = Number(e.target.value);
    const marginInPixels = unitManager.convertToPixels(margin, dimensions.unit);
    setMarginValue(margin);
    setMarginInPixels(marginInPixels.valueInPixels);
  };

  const handleRadiusChange =
    (key: keyof CanvasProperties) => (value: number | null) => {
      if (!value) return;
      setCanvasProperties({
        ...canvasProperties,
        [key]: value && value < 0 ? 0 : value?.toString() + "px" || "0px",
      });
    };
  return (
    <div className="h-[calc(100vh_-_10em)] overflow-auto custom-scrollbar border-r border-[rgb(233,_233,_238)">
      <div className={"flex flex-col gap-2 py-[2em]"}>
        <div className="border-b border-solid pb-6 px-4">
          <ToggleButton
            onChange={(value) => setMarginVisible(value)}
            value={marginVisible}
          >
            Enable margin
          </ToggleButton>

          <SafeArea
            marginVisible={marginVisible}
            dimensions={dimensions}
            marginValue={marginValue}
            onChange={(e) => handleMargin(e)}
          />
        </div>
        <div className="border-b border-solid py-6 px-4">
          <ToggleButton
            onChange={(value) => setBleedVisible(value)}
            value={bleedVisible}
          >
            Enable bleed
          </ToggleButton>

          <BleedArea
            bleedVisible={bleedVisible}
            dimensions={dimensions}
            bleedValue={bleedValue}
            onChange={(e) => handleBleed(Number(e.target.value))}
          />
        </div>

        <div className={`flex flex-col w-full gap-2 mb-[15px] pt-6 pb-4] px-4`}>
          <div className={"text-[14px] font-[400] font-suisseIntl "}>
            Rounding
          </div>
          <div className={"flex gap-2"}>
            <RadiusInput
              addonBefore={<CornerLeftUp />}
              value={parseFloat(
                canvasProperties.borderTopLeftRadius.split("px")[0],
              )}
              onChange={handleRadiusChange("borderTopLeftRadius")}
            />

            <RadiusInput
              addonBefore={<CornerRightUp />}
              value={parseFloat(
                canvasProperties.borderTopRightRadius.split("px")[0],
              )}
              onChange={handleRadiusChange("borderTopRightRadius")}
            />
          </div>
          <div className={"flex gap-2"}>
            <RadiusInput
              addonBefore={<CornerLeftDown />}
              value={parseFloat(
                canvasProperties.borderBottomLeftRadius.split("px")[0],
              )}
              onChange={handleRadiusChange("borderBottomLeftRadius")}
            />

            <RadiusInput
              addonBefore={<CornerRightDown />}
              value={parseFloat(
                canvasProperties.borderBottomRightRadius.split("px")[0],
              )}
              onChange={handleRadiusChange("borderBottomRightRadius")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioControls;
