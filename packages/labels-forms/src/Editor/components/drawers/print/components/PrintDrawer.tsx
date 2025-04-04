import React, { useEffect, useRef } from "react";
import CustomCheckbox from "../../elements/custom-checkbox";
import { MoveHorizontal, MoveVertical, PrintIcon } from "../../icons";

import { MarginTop, MarginBottom, MarginLeft, MarginRight } from "../../icons";
import { dimensionUnits } from "../../../../consts";
import CustomNumericInput from "../../elements/CustomNumericInput";
import PrintSection from "./PrintSection";
import {
  $actionManager,
  $isLabelRollSelected,
  $isLabelSheetSelected,
  $labelPosition,
  $printPageRef,
  $unitManager,
} from "../../../../stores/stores";
import { useStoreState, useStoreStateValue } from "@scena/react-store";
import { useEditor } from "../../../../context/EditorContext";
import { convertHtmlToImage } from "../../../../utils/utils";
import { jsPDF } from "jspdf";
import { checkLabelPositions } from "../../../../utils";
import { PrintProps } from "../../../../types";

const PrintDrawer = (props: PrintProps) => {
  const [isLabelRollSelected, setIsLabelRollSelected] =
    useStoreState($isLabelRollSelected);
  const [isLabelSheetSelected, setIsLabelSheetSelected] = useStoreState(
    $isLabelSheetSelected,
  );
  const printPageRef = useStoreStateValue($printPageRef);
  const { dimensions, documentName } = useEditor();
  // const [selectedLabels, setSelectedLabels] = useStoreState($selectedLabels);
  const [labelPosition, setLabelPosition] = useStoreState($labelPosition);
  const actionManager = useStoreStateValue($actionManager);
  const originalPositions = useRef<{
    [key: string]: { top: number; left: number };
  }>({});
  const unitManager = useStoreStateValue($unitManager);

  useEffect(() => {
    const onUpdate = (e: { [key: string]: any }) => {
      initializeLabelPosition(e.selectedElements);
    };
    actionManager.on("selectedLabels", onUpdate);

    return () => {
      actionManager.off("selectedLabels", onUpdate);
    };
  }, []);

  const removeCss = () => {
    if (printPageRef && printPageRef.current) {
      printPageRef.current.style.transform = `scale(1)`;
    }
  };

  const initializeLabelPosition = (labels: HTMLImageElement[]) => {
    if (labels.length) {
      const { allSameTop, allSameLeft, firstTop, firstLeft } =
        checkLabelPositions(labels);

      const newOriginalPositions: {
        [key: string]: { top: number; left: number };
      } = {};
      labels.forEach((label) => {
        const uniqueId = label.getAttribute("data-unique-id");
        newOriginalPositions[uniqueId as string] = {
          top: Number(label.style.top.replace("px", "")),
          left: Number(label.style.left.replace("px", "")),
        };
      });
      originalPositions.current = newOriginalPositions;

      setLabelPosition({
        ...labelPosition,
        top: allSameTop ? getLabelPos(firstTop) : 0,
        left: allSameLeft ? getLabelPos(firstLeft) : 0,
      });
    }
  };

  const getLabelPos = (pos: number): number => {
    return Number(
      unitManager.convertToInches(pos, dimensionUnits.PX).toFixed(1),
    );
  };

  const handlePrint = async () => {
    removeCss();
    const thumbnail = await convertHtmlToImage(
      isLabelRollSelected ? "roll-page" : "label-page",
    );
    if (printPageRef.current) {
      printPageRef.current.style.transform = `scale(0.2)`;
    }
    await downloadPdfFromBase64(thumbnail as string);
  };

  const downloadPdfFromBase64 = async (base64String: string) => {
    if (isLabelRollSelected) {
      // A4 size in mm (210mm x 297mm)
      const PAGE_WIDTH_MM = dimensions.width * 25.4; // A4 width in mm
      const PAGE_HEIGHT_MM = dimensions.height * 25.4; // A4 height in mm

      const pdf = new jsPDF({
        orientation: "landscape", // or 'portrait' if needed
        unit: "mm",
        format: [PAGE_WIDTH_MM, PAGE_HEIGHT_MM],
      });

      // Add the image to the PDF with the same size as A4
      pdf.addImage(base64String, "PNG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);

      // Save the PDF
      pdf.save(`${documentName}.pdf`);
    } else {
      // A4 size in mm (210mm x 297mm)
      const PAGE_WIDTH_MM = 210; // A4 width in mm
      const PAGE_HEIGHT_MM = 297; // A4 height in mm

      const pdf = new jsPDF({
        orientation: "portrait", // or 'portrait' if needed
        unit: "mm",
        format: "a4",
      });

      // Add the image to the PDF with the same size as A4
      pdf.addImage(base64String, "PNG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);

      // Save the PDF
      pdf.save(`${documentName}.pdf`);
    }
  };
  return (
    <div className="h-[calc(100vh_-_15em)] overflow-auto custom-scrollbar border-r border-[rgb(233,_233,_238)]">
      <div className={"flex flex-col gap-2 px-[1em] py-[2em] w-full h-full"}>
        <span className="text-[14px] leading-[18px] mb-[12px]">
          Print design
        </span>
        <div className="mb-[12px] flex flex-col space-y-2">
          <div className="flex flex-row items-center  flex-wrap">
            <div className="h-auto relative mr-[8px] top-[4px]">
              <CustomCheckbox
                checked={isLabelRollSelected}
                onChange={() => {
                  setIsLabelRollSelected(!isLabelRollSelected);
                  setIsLabelSheetSelected(false);
                }}
              />
            </div>
            <p className="flex text-sm items-center flex-wrap mt-2">
              Label roll
            </p>
          </div>
          <div className="flex flex-row items-center  flex-wrap">
            <div className="h-auto relative mr-[8px] top-[4px]">
              <CustomCheckbox
                checked={isLabelSheetSelected}
                onChange={() => {
                  setIsLabelSheetSelected(!isLabelSheetSelected);
                  setIsLabelRollSelected(false);
                }}
              />
            </div>
            <p className="flex text-sm items-center flex-wrap mt-2">
              Label sheet
            </p>
          </div>
        </div>
        {isLabelSheetSelected && (
          <>
            <PrintSection heading={"Page Margins"}>
              <div className="flex flex-row mx-[-8px]">
                <CustomNumericInput
                  icon={<MarginTop />}
                  onChange={(num: number) =>
                    props.setBoxMargin({
                      ...props.boxMargin,
                      top: num,
                    })
                  }
                  step={0.1}
                  min={0}
                  max={Infinity}
                  value={props.boxMargin.top}
                  unit={dimensions.unit}
                />

                <CustomNumericInput
                  icon={<MarginRight />}
                  onChange={(num: number) =>
                    props.setBoxMargin({
                      ...props.boxMargin,
                      right: num,
                    })
                  }
                  step={0.1}
                  min={0}
                  max={Infinity}
                  value={props.boxMargin.right}
                  unit={dimensions.unit}
                />
              </div>
              <div className="flex flex-row  mx-[-8px] ">
                <CustomNumericInput
                  icon={<MarginBottom />}
                  onChange={(num: number) =>
                    props.setBoxMargin({
                      ...props.boxMargin,
                      bottom: num,
                    })
                  }
                  step={0.1}
                  min={0}
                  max={Infinity}
                  value={props.boxMargin.bottom}
                  unit={dimensions.unit}
                />

                <CustomNumericInput
                  icon={<MarginLeft />}
                  onChange={(num: number) =>
                    props.setBoxMargin({
                      ...props.boxMargin,
                      left: num,
                    })
                  }
                  step={0.1}
                  min={0}
                  max={Infinity}
                  value={props.boxMargin.left}
                  unit={dimensions.unit}
                />
              </div>
            </PrintSection>

            <PrintSection heading="Gap between labels">
              <div className="flex flex-row mx-[-8px]">
                <CustomNumericInput
                  icon={<MoveVertical color="#8A8A8F" />}
                  min={0}
                  onChange={(num) => {
                    props.setVGap(Number(num || 0));
                  }}
                  step={0.1}
                  max={Infinity}
                  unit={dimensions.unit}
                  value={props.vGap}
                />

                <CustomNumericInput
                  icon={<MoveHorizontal />}
                  min={0}
                  onChange={(num) => {
                    props.setHGap(Number(num || 0));
                  }}
                  step={0.1}
                  max={Infinity}
                  unit={dimensions.unit}
                  value={props.hGap}
                />
              </div>
            </PrintSection>
          </>
        )}

        <button
          onClick={handlePrint}
          className={`absolute bottom-4 w-[19em]   border  cursor-pointer bg-[#19110B] text-white border-[##E9E9EE] rounded-full grid place-content-center  text-[16px] text-[#19110B]`}
        >
          <div className="flex flex-row space-x-2 items-center p-[12px]">
            <div>
              <PrintIcon />
            </div>
            <div>Download</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PrintDrawer;
