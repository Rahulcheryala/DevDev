export type SheetDimensions = {
  width: number;
  height: number;
};

export type PrintSectionProps = {
  heading: string;
  children: React.ReactNode;
};

export type PrintProps = {
  setHGap: React.Dispatch<React.SetStateAction<number>>;
  setVGap: React.Dispatch<React.SetStateAction<number>>;
  boxMargin: LabelPosition;
  setBoxMargin: React.Dispatch<
    React.SetStateAction<{
      top: number;
      bottom: number;
      left: number;
      right: number;
    }>
  >;
  hGap?: number;
  vGap?: number;
};

export type DefaultPrintMargins = {
  unit: string;
  dpi: number;
  margins: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
};

export type LabelPosition = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
