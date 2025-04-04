import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "../../../../context/EditorContext";
import { useStoreStateSetValue, useStoreStateValue } from "@scena/react-store";
import {
  $actionManager,
  $printPageRef,
  $unitManager,
} from "../../../../stores/stores";

const LabelRoll = () => {
  const { dimensions, previewThumbnail } = useEditor();
  const [labelDimensionInPixels, setLabelDimensionInPixel] = useState<{
    width: number;
    height: number;
  }>();
  const unitManager = useStoreStateValue($unitManager);
  const actionManager = useStoreStateValue($actionManager);
  const setPrintRef = useStoreStateSetValue($printPageRef);
  const pageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      // Ref to be sent inside react-print library for printing
      setPrintRef(pageRef);

      actionManager.act("labelRoll.getRef", {
        ref: pageRef,
      });
    }
  }, [pageRef]);

  useEffect(() => {
    if (dimensions) {
      const widthInPixels = unitManager.convertToPixels(
        dimensions.width,
      ).valueInPixels;
      const heightInPixels = unitManager.convertToPixels(
        dimensions.height,
      ).valueInPixels;

      setLabelDimensionInPixel({
        width: widthInPixels,
        height: heightInPixels,
      });
    }
  }, [dimensions, unitManager]);

  return (
    <div
      className="roll-page"
      style={{
        width: labelDimensionInPixels?.width,
        height: labelDimensionInPixels?.height,
      }}
    >
      <img
        src={previewThumbnail}
        alt={"label-roll"}
        ref={pageRef}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default LabelRoll;
