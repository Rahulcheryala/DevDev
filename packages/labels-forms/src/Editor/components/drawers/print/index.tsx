import React, { useState } from "react";
import { useEditor } from "../../../context/EditorContext";
import "./print-styles/editor-print.css";
import TopBar from "./components/TopBar";
import ContentArea from "./components/ContentArea";
import { RightDrawer } from "./components/RightDrawer";
import { useDPI } from "../../../hooks/useDpi";
import { defaultPrintMargins } from "../../../consts";
import { setDefaultPrintMargins } from "../../../utils";

type EditorPrintProps = {
  onBackToDesigner: () => void;
  previewThumbnail: string;
};

const EditorPrint: React.FC<EditorPrintProps> = ({
  onBackToDesigner,
  previewThumbnail,
}) => {
  const { documentName } = useEditor();
  const [hGap, setHGap] = useState<number>(0.2);
  const [vGap, setVGap] = useState<number>(0.2);

  const dpi = useDPI();
  const { dimensions } = useEditor();
  const [boxMargin, setBoxMargin] = useState(
    setDefaultPrintMargins({
      unit: dimensions.unit, // Get unit from the unit manager
      dpi, // Use the dpi from useDPI hook
      margins: defaultPrintMargins,
    }),
  );

  return (
    <>
      <TopBar documentName={documentName} onBackToDesigner={onBackToDesigner} />
      <ContentArea
        hGap={hGap}
        vGap={vGap}
        boxMargin={boxMargin}
        previewThumbnail={previewThumbnail}
      />

      <RightDrawer
        hGap={hGap}
        vGap={vGap}
        setHGap={setHGap}
        setVGap={setVGap}
        boxMargin={boxMargin}
        setBoxMargin={setBoxMargin}
      />
    </>
  );
};

export default EditorPrint;
