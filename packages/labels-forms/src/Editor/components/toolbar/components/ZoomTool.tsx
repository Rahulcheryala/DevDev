import React, { useState, useEffect } from "react";
import { ZoomMinus, ZoomPlus } from "../../drawers/icons";
import "../../../assets/styles/ruler-button.css";

type ZoomToolProps = {
  zoomLevel: number; // Expects zoom level as a fraction (e.g., 1 for 100%)
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomChange: (newZoom: number) => void;
};

const ZoomTool: React.FC<ZoomToolProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomChange,
}) => {
  const [inputValue, setInputValue] = useState(
    `${(zoomLevel * 100).toFixed(0)}%`,
  );

  useEffect(() => {
    setInputValue(`${(zoomLevel * 100).toFixed(0)}%`);
  }, [zoomLevel]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9%]/g, ""); // Allow only numbers and `%`
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    applyZoomChange();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      applyZoomChange();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      incrementZoom(0.01); // Increase by 1%
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      incrementZoom(-0.01); // Decrease by 1%
    }
  };

  const incrementZoom = (increment: number) => {
    const currentZoom = parseFloat(inputValue) / 100;
    const newZoom = Math.max(0.1, Math.min(5, currentZoom + increment));
    setInputValue(`${(newZoom * 100).toFixed(0)}%`);
    onZoomChange(newZoom);
  };

  const applyZoomChange = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue) && numericValue > 0) {
      const newZoom = Math.max(0.1, Math.min(5, numericValue / 100));
      onZoomChange(newZoom);
      setInputValue(`${(newZoom * 100).toFixed(0)}%`);
    } else {
      setInputValue(`${(zoomLevel * 100).toFixed(0)}%`);
    }
  };

  return (
    <div
      className="zoomIcon"
      style={{
        cursor: "pointer",
        bottom: "90px",
        zIndex: 1,
        backgroundColor: "#fff",
        padding: "0 10px",
        borderRadius: "10px",
        right: "38px",
        height: "32px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="mr-[10px]" onClick={onZoomOut}>
        <ZoomMinus color={"#101828"} />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          fontSize: "14px",
          textAlign: "center",
        }}
      />
      <div className="ml-[10px]" onClick={onZoomIn}>
        <ZoomPlus color={"#101828"} />
      </div>
    </div>
  );
};

export default ZoomTool;
