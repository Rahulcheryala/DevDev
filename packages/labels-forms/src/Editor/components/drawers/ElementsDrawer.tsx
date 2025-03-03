import React, { useEffect } from "react";
import { useLayers } from "../../context/LayersContext";
import { useStoreStateValue } from "@scena/react-store";
import {
  $actionManager,
  $editor,
  $layerManager,
  $selectedLayers,
} from "../../stores/stores";
import { ScenaElementLayer } from "../../types";
import { createLayer } from "../managers/LayerManager";
import { RectInfo } from "react-moveable";
import { pictograms } from "../../utils/config";
import useAutoScale from "../../hooks/useAutoScale";

const ElementsDrawer = () => {
  const actionManager = useStoreStateValue($actionManager);
  const { setSelectedLayerRotationAngle } = useLayers();
  const layerManager = useStoreStateValue($layerManager);
  const editorRef = useStoreStateValue($editor);

  const selectedLayers = useStoreStateValue($selectedLayers);
  const { setIsAutoScaleEnabled, setFixRatio } = useLayers();

  //setting the isAutoScaleEnabled value on selecting text layer
  useAutoScale(selectedLayers, setIsAutoScaleEnabled, setFixRatio);
  useEffect(() => {
    const onUpdate = (e: { rect: RectInfo }) => {
      const rect = e.rect;
      setSelectedLayerRotationAngle(parseFloat(rect.rotation.toFixed(1)));
    };
    actionManager.on("get.rect", onUpdate);

    return () => {
      actionManager.off("get.rect", onUpdate);
    };
  }, []);

  const createPictogram = async (imageSrc: any, imageId: string) => {
    const layers: ScenaElementLayer[] = [
      createLayer({
        id: imageId,
        type: "image",
        title: "pictogram",
        style: {
          position: "absolute",
          width: "60px",
          height: "60px",
        },
        jsx: <img src={imageSrc} />,
      }),
    ];

    await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
    await editorRef.current!.setSelectedLayers(layers);
  };

  return (
    <div className="h-[calc(100vh_-_10em)] overflow-auto custom-scrollbar border-r border-[rgb(233,_233,_238)">
      {/* Preview Barcode section */}
      <div className={"flex flex-col gap-2 px-[1em] py-[2em] shadow-sm "}>
        <p className={"text-[14px] text-[#19110B] mb-[25px]"}>Pictograms</p>

        <div
          className={`overflow-y-scroll  custom-scrollbar grid grid-cols-3  space-x-4`}
        >
          {pictograms.map((image) => {
            return (
              <div
                key={image.id}
                onClick={() => createPictogram(image.src, image.id)}
                className={` flex flex-col  border-r p-2 justify-center items-center cursor-pointer`}
              >
                <div>
                  <img src={image.src} width={"60px"} height={"60px"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ElementsDrawer;
