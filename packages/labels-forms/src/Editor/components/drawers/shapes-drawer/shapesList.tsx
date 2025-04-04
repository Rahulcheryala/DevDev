import React, { CSSProperties } from "react";
import SquareSVG from "../../../assets/icons/drawer/square.svg";
import Circle from "../../../assets/icons/drawer/Circle.svg";
import { ScenaElementLayer } from "../../../types";

export const shapes = [
  {
    title: "square",
    type: "shape" as ScenaElementLayer["type"],
    src: SquareSVG,
    style: {
      position: "absolute",
    },
    jsx: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill={"#d6d4d9"}
      >
        <rect width="100" height="100" />
      </svg>
    ),
  },
  {
    title: "circle",
    type: "shape" as ScenaElementLayer["type"],
    src: Circle,
    style: {
      position: "absolute",
    },
    jsx: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 104 104"
        xmlns="http://www.w3.org/2000/svg"
        fill="#d6d4d9"
        preserveAspectRatio="none"
      >
        <circle cx="52" cy="52" r="50" />
      </svg>
    ),
  },

  // { title: 'diamond', src: DiamondSVG },
];

export const pageLayerConfig = (
  pagePositionY: number,
  style: CSSProperties,
) => ({
  title: "page",
  style: {
    position: "absolute",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    ...style,
  },
  jsx: (
    <svg
      style={{ fill: "#fff" }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect width="100" height="100" />
    </svg>
  ),
  type: "page" as ScenaElementLayer["type"],
});
