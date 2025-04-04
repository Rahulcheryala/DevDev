import React from "react";

interface TableSkinProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const TableSkin: React.FC<TableSkinProps> = ({ src, alt, onClick }) => (
  <div onClick={onClick} className="w-1/4 px-[4px] mb-[8px] cursor-pointer">
    <img src={src} alt={alt} className="w-full h-[48px]" />
  </div>
);

export default TableSkin;
