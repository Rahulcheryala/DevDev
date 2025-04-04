import React, { forwardRef } from "react";
import { QRType } from "../../../../types";
import { QRCode } from "react-qrcode-logo";

type QRPreviewProps = {
  qrValues: QRType;
};

const QRPreview = forwardRef<any, QRPreviewProps>(({ qrValues }, ref) => {
  return (
    <div className="flex flex-col border-t border-stroke-secondary gap-2 px-[1em] py-[2em] shadow-sm">
      <p className="text-[14px] text-[#19110B]">Preview</p>
      <div
        style={{ opacity: qrValues.qrOpacity }}
        className="flex flex-row justify-center space-x-4 flex-wrap border-[1px] rounded-[5px]"
      >
        <QRCode
          ref={ref as any}
          value={qrValues.value}
          qrStyle={qrValues.qrStyle}
          bgColor={qrValues.bgColor}
          fgColor={qrValues.fgColor}
        />
      </div>
    </div>
  );
});

QRPreview.displayName = "QRPreview";

export default QRPreview;
