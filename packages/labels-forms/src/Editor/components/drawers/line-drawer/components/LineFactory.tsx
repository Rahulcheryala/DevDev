import React from "react";
import { Lines, LineProps } from "../../../../types";
import {
  renderArrow,
  renderDoubleArrow,
  renderLine,
} from "../../../../utils/line";

export const lineFactory = (
  type: Lines,
  props: LineProps,
): JSX.Element | undefined => {
  // Map of shape types to corresponding render functions
  const shapesMap: Record<
    Lines,
    (props: LineProps) => React.ReactElement<SVGElement, string>
  > = {
    line: renderLine,
    arrow: renderArrow,
    doubleArrow: renderDoubleArrow,
  };

  // Return the corresponding SVG or undefined if type is not found
  return shapesMap[type] ? shapesMap[type](props) : undefined;
};
