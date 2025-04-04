import React from "react";
import { ZoomMinus, ZoomPlus } from "../../drawers/icons"; // Adjust the path as per your project structure
import "../../../assets/styles/ruler-button.css";

type RulerButtonProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const ZoomButton: React.FC<RulerButtonProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div
      className={`zoomIcon`}
      style={{
        cursor: "pointer",
        position: "absolute",
        bottom: "90px",
        zIndex: 1,
        backgroundColor: "#fff",
        padding: "8px",
        borderRadius: "10px",
        right: "38px",
        height: "88px",
        width: "40px",
        boxShadow: "0px 9px 28px 8px #0000000D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div onClick={onZoomIn}>
        <ZoomPlus color={"#101828"} />
      </div>
      <hr
        style={{
          color: "#000",
          backgroundColor: "#000",

          width: "100%",
          zIndex: "1000",
        }}
      />
      <div onClick={onZoomOut}>
        <ZoomMinus color={"#101828"} />
      </div>
    </div>
  );
};

export default ZoomButton;
