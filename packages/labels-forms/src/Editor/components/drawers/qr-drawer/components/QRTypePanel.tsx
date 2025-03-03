import React from "react";
import { Select } from "antd";
import { qrTypeEnums } from "../../../../utils/config";
import { drawerButtonValues, qrValuesMap } from "../../../../consts";
import { SelectArrowDown } from "../../../icons/SelectArrowDown";
import DrawerButton from "../../../shared/DrawerButton";
import { QRType } from "../../../../types";

type QRTypePanelProps = {
  qrValues: QRType;
  handleQrValues: (key: string, value: number | string) => void;
};

const QRTypePanel: React.FC<QRTypePanelProps> = ({
  qrValues,
  handleQrValues,
}) => {
  const qrTypeOptions = [
    {
      value: qrTypeEnums.values.SQUARES,
      label: qrTypeEnums.label.CLASSY,
    },
    {
      value: qrTypeEnums.values.FLUID,
      label: qrTypeEnums.label.ROUNDED,
    },
    {
      value: qrTypeEnums.values.DOTS,
      label: qrTypeEnums.label.DOTS,
    },
  ];

  return (
    <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
      <p className="text-sm leading[20px] text-accent-primary font-suisseIntl mr-auto mb-[20px]">
        Type
      </p>
      <div>
        <Select
          defaultValue={qrTypeEnums.label.CLASSY}
          value={qrValues.qrStyle || qrTypeEnums.label.CLASSY}
          style={{ height: 40, width: "100%", fontSize: 26 }}
          onChange={(e) => handleQrValues(qrValuesMap.QR_STYLE, e)}
          popupClassName="text-sm text-[#19110B]"
          options={qrTypeOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          suffixIcon={<SelectArrowDown />}
          className="ant-custom-select"
        />

        <DrawerButton
          label={drawerButtonValues.AUTOMATIC_DATA}
          // logic to be added later
          onClick={() => {}}
        />
      </div>
      <div className="relative flex items-center justify-center">
        <div className="h-[1px] bg-stroke-primary absolute top-1/2 left-0 w-full -translate-y-1/2 mt-[2px]"></div>
        <span
          className="text-center text-[#908F8D] text-sm leading-[20px] 
        font-suisseIntl px-[15px] bg-[#ffffff] relative z-10"
        >
          or enter manually
        </span>
      </div>
    </div>
  );
};

export default QRTypePanel;
