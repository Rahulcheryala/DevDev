import { XIcon } from "lucide-react";
import React from "react";

interface ToasterProps {
  content: string;
  icon?: React.ReactNode;
  variant?: 'warning' | 'success' | 'error' | 'info';
  title?: string;
  onClose?: () => void;
  className?: string;
}

const variantStyles = {
  warning: {
    bg: 'bg-[#f7d653]',
    text: 'text-[#F18F01]',
  },
  success: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  error: {
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
  info: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
};

const Toaster: React.FC<ToasterProps> = ({
  content,
  icon,
  variant = 'warning',
  title = 'Note:',
  onClose,
  className = '',
}) => {
  const styles = variantStyles[variant];

  return (
    <div className={`rounded-[12px] p-6 flex justify-between items-center ${styles.bg} w-full ${className}`}>
      <div className="flex gap-4">
        {icon}
        <div className="w-full">
          <h2 className={`${styles.text} font-['Suisse Int\'l'] text-[14px] font-semibold leading-[20px] tracking-[0.2px] text-[#F18F01]`}>{title}</h2>
          <span className="font-['Suisse Int\'l'] text-[14px] font-normal leading-[22px] tracking-[0.2px] text-[#475467]">{content}</span>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 hover:opacity-70 transition-opacity">
          <XIcon className="w-4 h-4 text-[#A05A00]" />
        </button>
      )}
    </div>
  );
};

export default Toaster;