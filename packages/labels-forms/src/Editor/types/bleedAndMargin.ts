import { CanvasDetails } from "./shared";

export type SafeAreaProps = {
  marginVisible: boolean;
  dimensions: Partial<CanvasDetails>;
  marginValue: number;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export type BleedAreaProps = {
  bleedVisible: boolean;
  dimensions: Partial<CanvasDetails>;
  bleedValue: number;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export type RadiusInputProps = {
  addonBefore: React.ReactNode;
  value: number;
  onChange: (value: number | null) => void;
};

export type ToggleSectionProps = {
  title: string;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
};
