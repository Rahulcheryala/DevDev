import React from "react";
import { LineProps } from "../types";

export const updateLineProperties = (
  lineElement: SVGElement | null,
  property: string,
  value: string | number,
) => {
  if (!lineElement) return;

  const newWidth = Number(value);
  const svgElements = lineElement.querySelectorAll("line, polygon, rect, path");

  // Define a map of property handlers
  const propertyHandlers: Record<string, (element: Element) => void> = {
    stroke: (element) => {
      if (element.tagName === "polygon") {
        element.setAttribute("fill", value.toString());
      } else {
        element.setAttribute("stroke", value.toString());
      }
    },
    "stroke-width": (element) => {
      element.setAttribute("stroke-width", value.toString());
    },
    "line-style": (element) => {
      if (element.tagName === "line") {
        const dashArrayMap: Record<string, string | null> = {
          dashed: "5, 5",
          dotted: "1, 5",
          solid: null, // Solid means no dash
        };
        const dashArray = dashArrayMap[value.toString()];
        if (dashArray) {
          element.setAttribute("stroke-dasharray", dashArray);
        } else {
          element.removeAttribute("stroke-dasharray");
        }
      }
    },
    width: (element) => {
      if (element.tagName === "line") {
        element.setAttribute("x2", `${newWidth}`);
      }

      if (element.tagName === "polygon") {
        const points = element.getAttribute("points");
        if (points) {
          const pointsArray = points
            .split(" ")
            .map((point) => point.split(",").map(Number));

          const arrowBaseX = newWidth;

          // Modify the points for the right arrowhead
          const updatedPoints = pointsArray
            .map(([x, y], index) => {
              if (index === 0 || index === 2) {
                return `${arrowBaseX},${y}`;
              } else if (index === 1) {
                return `${arrowBaseX + 10},${y}`;
              }
              return `${x},${y}`;
            })
            .join(" ");

          element.setAttribute("points", updatedPoints);
        }
      }
    },
  };

  // Iterate through the elements and apply the appropriate handler
  svgElements.forEach((element) => {
    const handler = propertyHandlers[property];
    if (handler) {
      handler(element);
    }
  });
};

// Calculate strokeDashArray based on strokeType
const getStrokeDashArray = (strokeType?: string) => {
  return strokeType === "dashed"
    ? "5, 5"
    : strokeType === "dotted"
      ? "1, 5"
      : undefined; // Solid is default (no dasharray)
};

// Function to render a line
export const renderLine = (props: LineProps) => (
  <svg width={props.width} height={props.height}>
    <line
      x1="0"
      y1={props.height / 2}
      x2={props.width}
      y2={props.height / 2}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      strokeDasharray={getStrokeDashArray(props.strokeType)}
    />
  </svg>
);

// Function to render an arrow
export const renderArrow = (props: LineProps) => (
  <svg width={props.width + 10} height={props.height}>
    {/* Line */}
    <line
      x1="0"
      y1={props.height / 2}
      x2={props.width}
      y2={props.height / 2}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      strokeDasharray={getStrokeDashArray(props.strokeType)}
    />
    {/* Arrowhead */}
    <polygon
      points={`${props.width},0 ${props.width + 10},${props.height / 2} ${
        props.width
      },${props.height}`}
      fill={props.stroke}
    />
  </svg>
);

// Function to render a double arrow
export const renderDoubleArrow = (props: LineProps) => (
  <svg width={props.width + 20} height={props.height}>
    {/* Left arrowhead */}
    <polygon
      points={`10,0 0,${props.height / 2} 10,${props.height}`}
      fill={props.stroke}
    />
    {/* Line */}
    <line
      x1="10"
      y1={props.height / 2}
      x2={props.width + 10}
      y2={props.height / 2}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      strokeDasharray={getStrokeDashArray(props.strokeType)}
    />
    {/* Right arrowhead */}
    <polygon
      points={`${props.width + 10},0 ${props.width + 20},${props.height / 2} ${
        props.width + 10
      },${props.height}`}
      fill={props.stroke}
    />
  </svg>
);
