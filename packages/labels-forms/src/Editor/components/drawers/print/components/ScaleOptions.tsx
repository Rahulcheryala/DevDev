import React, { memo, useEffect, useRef, useState } from "react";
import { ExpandIcon } from "../../icons";
import { useEditor } from "../../../../context/EditorContext";
import { toolBarItems } from "../../../../consts";
import { useStoreState, useStoreStateValue } from "@scena/react-store";
import {
  $actionManager,
  $toggleFullScreen,
  $isLabelRollSelected,
} from "../../../../stores/stores";

const ScaleOptions = () => {
  const { selectedTool, setSelectedTool } = useEditor();
  const [toggleFullScreen, setToggleFullScreen] =
    useStoreState($toggleFullScreen);
  const [scale, setScale] = useState<number>(0.2);
  const actionManager = useStoreStateValue($actionManager);
  const pageRef = useRef<HTMLDivElement>();
  const [isScaleTriggered, setIsScaleTriggered] = useState<boolean>(false);

  const isLabelRollSelected = useStoreStateValue($isLabelRollSelected);

  useEffect(() => {
    if (pageRef && pageRef.current) {
      if (isLabelRollSelected) {
        pageRef.current.style.transform = `scale(${scale})`;
      } else {
        if (isScaleTriggered) {
          const translateX = scale * 50;
          const translateY = scale * 600;

          pageRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }
      }
    }
  }, [scale, pageRef, pageRef.current]);

  const increaseScale = () => {
    setIsScaleTriggered(true);
    setScale((prev) => prev + 0.1);
  };

  const decreaseScale = () => {
    setIsScaleTriggered(true);
    setScale((prev) => Math.max(0.05, prev - 0.1));
  };

  const handleFullScreen = () => {
    setSelectedTool("");
    setToggleFullScreen(!toggleFullScreen);
  };

  useEffect(() => {
    const onUpdate = (event: { [key: string]: any }) => {
      const { ref, isLabelSheetSelected } = event;
      pageRef.current = ref.current;

      if (pageRef.current) {
        const newScale = isLabelSheetSelected ? 0.2 : 0.8;
        pageRef.current.style.transform = `scale(${newScale})`;
        setScale(newScale);
      }
    };

    actionManager.on("labelRoll.getRef", onUpdate);

    return () => {
      actionManager.off("labelRoll.getRef", onUpdate);
    };
  }, []);

  return (
    <>
      {
        <div
          className={`
        absolute bottom-[100px] 
        ${
          selectedTool === toolBarItems.PRINT ? "right-[380px]" : "right-[50px]"
        } 
        flex flex-col space-y-4`}
        >
          <div
            className={`
          bg-white 
          height-[100px] p-2 
          rounded-[5px] 
          drop-shadow-md 
          grid place-content-center`}
          >
            <button
              onClick={increaseScale}
              className="h-full p-1  border-b text-xl grid place-content-center cursor-pointer"
            >
              +
            </button>
            <button
              onClick={decreaseScale}
              className="p-1 h-full  text-xl grid place-content-center cursor-pointer"
            >
              -
            </button>
          </div>
          <div className="bg-white height-[100px] p-1 rounded-[5px] drop-shadow-md">
            <div
              onClick={handleFullScreen}
              className="h-1/2 p-2 text-xl grid place-content-center cursor-pointer"
            >
              <ExpandIcon />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default memo(ScaleOptions);
