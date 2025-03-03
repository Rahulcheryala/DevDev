import React, { forwardRef } from "react";
import { GuidesManager } from "../../GuidesManager";
import Guides from "@scena/react-guides";

// Define the props type
type GuidesProps = {
  showGuides: boolean;
  horizontalGuidesRef: React.RefObject<Guides>;
  verticalGuidesRef: React.RefObject<Guides>;
};

// Use forwardRef to accept refs and pass them down
const DisplayGuides = forwardRef<HTMLDivElement, GuidesProps>(
  ({ showGuides, horizontalGuidesRef, verticalGuidesRef }, ref) => {
    return (
      <div ref={ref}>
        {/* Rulers */}
        {showGuides && (
          <GuidesManager ref={horizontalGuidesRef} type="horizontal" />
        )}
        {showGuides && (
          <GuidesManager ref={verticalGuidesRef} type="vertical" />
        )}
      </div>
    );
  },
);

DisplayGuides.displayName = "DisplayGuides";

export default DisplayGuides;
