import React, { useRef } from "react";
import DUploadIcon from "../../micro-components/icons/DUploadIcon";
import Image from "../../micro-components/Image";
import Label from "../../micro-components/Label-cpy";

export interface AvatarUploadProps {
  imageUrl?: string;
  altText: string;
  labelText?: string;
  descriptionText?: string;
  maxSizeMB?: number;
  acceptedFileTypes?: string;
  onFileSelect: (file: File) => void;
  uploadButtonText?: string;
  UploadIcon?: React.ReactNode;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  imageUrl,
  altText,
  labelText = "Profile Picture",
  descriptionText = "PNG, JPEG, SVG (Max 2MB)",
  maxSizeMB = 2,
  acceptedFileTypes = "image/png, image/jpg, image/jpeg, image/svg",
  onFileSelect,
  uploadButtonText = "Upload",
  UploadIcon,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagePickerHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (convert MB to bytes)
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB`); // TODO(vamsi): Replace with a toast or a error message
      return;
    }

    onFileSelect(file);
  };

  return (
    <div className="profile-container flex gap-x-8 items-center">
      <Image
        className="h-[100px] w-[100px] object-cover rounded-full text-2xl drop-shadow-lg"
        src={imageUrl}
        alt={altText}
      />

      <div className="img-selector flex flex-col">
        <Label htmlFor="avatar-upload" className="text-sm text-secondary">
          {labelText}
        </Label>
        <span className="text-sm text-secondary">{descriptionText}</span>
        <button
          className="flex gap-2 items-center mt-2"
          onClick={imagePickerHandler}
        >
          {UploadIcon ? UploadIcon : <DUploadIcon color="#9BA2AC" size="20" />}
          <span className="text-text-tertiary">{uploadButtonText}</span>
        </button>
        <input
          id="avatar-upload"
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
