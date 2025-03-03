import { useEffect } from "react";
import { identifyLayer } from "../utils/shared/LayerUtils";
import { ScenaElementLayer, ScenaElementLayerGroup } from "../types";

const useAutoScale = (
  selectedLayers: (ScenaElementLayer | ScenaElementLayerGroup)[],
  setIsAutoScaleEnabled: (value: boolean) => void,
  setFixRatio: (value: boolean) => void,
) => {
  useEffect(() => {
    if (selectedLayers && selectedLayers.length) {
      const layerType = identifyLayer(selectedLayers);
      let isAutoScaleEnabledValue;
      if (layerType === "text") {
        if (
          "children" in selectedLayers[0] &&
          (selectedLayers[0] as any)?.children?.length
        ) {
          isAutoScaleEnabledValue = (selectedLayers[0] as any)?.children[0]
            ?.metaData?.isAutoScaleEnabled;
        } else {
          isAutoScaleEnabledValue = (selectedLayers[0] as any)?.metaData
            ?.isAutoScaleEnabled;
        }
        setIsAutoScaleEnabled(isAutoScaleEnabledValue);
        setFixRatio(false);
      } else {
        setIsAutoScaleEnabled(false);
      }
    }
  }, [selectedLayers, setIsAutoScaleEnabled, setFixRatio]);
};

export default useAutoScale;
