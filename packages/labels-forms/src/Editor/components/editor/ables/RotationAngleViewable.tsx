import React from "react";
import { MoveableManagerInterface } from "react-moveable";

import { LayersContext } from "../../../context/LayersContext";

export type DeleteButtonViewableProps = {
  deleteButtonViewable?: boolean;
};

export const RotationAngleViewable = {
  name: "rotationAngleViewable",
  props: ["rotationAngleViewable"],
  render(moveable: MoveableManagerInterface) {
    const rect = moveable.getRect();
    const zoom = moveable.props.zoom;

    const RotationAngle = moveable.useCSS(
      "div",
      `
        {
            position: absolute;
            left: 45px;
            top: -70px;
            will-change: transform;
            transform-origin: 0px 0px;
            width: 24px;
            height: 24px;
            opacity: 0.9;
            border-radius: 4px;
            font-size:12px;
        }
   
  
        `,
    );
    return (
      <LayersContext.Consumer key="delete-button-viewer">
        {(context) => {
          if (!context) {
            return null;
          }

          const { selectedLayerRotationAngle } = context;
          return (
            <RotationAngle
              style={{
                left: `${rect.width / 2}px`,
                top: `${rect.height + 55}px`,
                transform: `translate(-20%, ${20 * zoom!}px) scale(${zoom})`,
              }}
            >
              {selectedLayerRotationAngle + "°"}
            </RotationAngle>
          );
        }}
      </LayersContext.Consumer>
    );
  },
} as const;
