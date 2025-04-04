import React from "react";
import { RulerIcon } from "../../drawers/icons"; // Adjust the path as per your project structure
import { useEditor } from "../../../context/EditorContext";
import "../../../assets/styles/ruler-button.css";

type RulerButtonProps = {
  onClick: () => void;
};

const RulerButton: React.FC<RulerButtonProps> = ({ onClick }) => {
  const { selectedTool } = useEditor();

  return (
    <div
      className={`rulerIcon ${selectedTool ? "selected" : ""}`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "absolute",
        bottom: "90px",
        zIndex: 1,
        backgroundColor: "#000",
        padding: "8px",
        borderRadius: "10px",
      }}
    >
      <RulerIcon color={"#fff"} />
    </div>
  );
};

export default RulerButton;
