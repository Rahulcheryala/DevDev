import React, { useState, useEffect } from "react";
import { useLayers } from "../../context/LayersContext";
import { useStoreStateValue } from "@scena/react-store";
import { $actionManager } from "../../stores/stores";
import { Select } from "antd";
import { SelectArrowDown } from "../icons/SelectArrowDown";

import { RectInfo } from "react-moveable";

import CustomCheckbox from "./elements/custom-checkbox";
import { Download } from "./icons";
import { jsPDF } from "jspdf";
import { useEditor } from "../../context/EditorContext";
import { exportLabelOptions } from "../../utils/config";
import { convertHtmlToImage } from "../../utils/utils";

const Export = () => {
  const actionManager = useStoreStateValue($actionManager);
  const [exportValue, setExportValue] = useState<any>({
    style: "",
    data: "",
    value: "www.xcelpros.com",
  });
  const { setSelectedLayerRotationAngle } = useLayers();

  const { dimensions, documentName } = useEditor();
  const [toggleDownoadSetting, setToggleDownloadSetting] =
    useState<boolean>(false);

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

  const downloadPdfFromBase64 = async (base64String: string) => {
    const PAGE_WIDTH_MM = dimensions.width * 25.4; // A4 width in mm
    const PAGE_HEIGHT_MM = dimensions.height * 25.4; // A4 height in mm

    const pdf = new jsPDF({
      orientation: "landscape", // or 'portrait' if needed
      unit: "mm",
      format: [PAGE_WIDTH_MM, PAGE_HEIGHT_MM],
    });

    pdf.addImage(base64String, "PNG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);

    // Save the PDF
    pdf.save(`${documentName}.pdf`);
  };

  const handleDownload = async () => {
    const thumbnail = await convertHtmlToImage("scena-viewport");
    if (thumbnail) {
      downloadPdfFromBase64(thumbnail);
    }
  };

  return (
    <div className="h-[calc(100vh_-_10em)] overflow-auto custom-scrollbar border-r border-[rgb(233,_233,_238)">
      <div className={"flex flex-col gap-2 px-[1em] py-[2em]"}>
        <p className={"text-[14px] text-[#19110B]"}>Format</p>
        <div className="flex fle-row space-x-4 flex-wrap">
          <Select
            defaultValue={"PDF"}
            style={{ height: 40, minWidth: 136, width: "100%" }}
            onChange={(e) => {
              setExportValue({
                ...exportValue,
                style: e,
              });
            }}
            options={exportLabelOptions}
            suffixIcon={<SelectArrowDown />}
          />
        </div>

        <div className="flex items-center mb-[24px]">
          <div className="h-auto relative mr-[8px] top-[4px]">
            <CustomCheckbox
              checked={toggleDownoadSetting}
              onChange={() => setToggleDownloadSetting((prev) => !prev)}
            />
          </div>
          <p className="flex items-center flex-wrap mt-2">
            Save download settings
          </p>
        </div>

        <div
          onClick={handleDownload}
          className={`w-full border cursor-pointer border-[##E9E9EE] rounded-full grid place-content-center p-[12px] text-[16px] text-[#19110B]`}
        >
          <div className="flex flex-row space-x-2 items-center">
            <div>
              <Download />
            </div>
            <div>Download</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;
