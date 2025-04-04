import type { CSSProperties } from "react";
import "./style.css";

interface IProps {
  delay?: number;
  color?: string;
  ratio?: string;
}

interface CustomCSS extends CSSProperties {
  "--delay": string;
}

const Spinner = ({ delay = 2, color = "#000", ratio = "12px" }: IProps) => {
  const style: CustomCSS = {
    width: ratio,
    height: ratio,
    color,
    "--delay": `${delay}s`,
  };

  return (
    <div
      className="translate-z-[0] z-[1000] absolute left-1/2 top-1/2 rounded-full overflow-hidden indent-[9999em] custom-spinner"
      style={style}
    />
  );
};

export default Spinner;
