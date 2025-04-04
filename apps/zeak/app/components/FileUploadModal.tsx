import { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { Button, Modal } from "@zeak/react";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { type FilePondFile, FileStatus } from "filepond";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onError?: (e: any) => void;
  onWarning?: (e: any) => void;
  onSubmit: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: string;
  maxFiles?: number;
  allowMultiple?: boolean;
  labelFileTypeNotAllowed?: string;
  fileValidateTypeLabelExpectedTypes?: string;
  fileValidateTypeLabelExpectedTypesMap?: { [key: string]: string };
  labelIdle?: string;
};

const FileUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  onError,
  onWarning,
  acceptedFileTypes = [],
  maxFileSize = "2MB",
  maxFiles = 10,
  allowMultiple = true,
  labelFileTypeNotAllowed = "File is of invalid type",
  fileValidateTypeLabelExpectedTypes,
  fileValidateTypeLabelExpectedTypesMap,
  labelIdle,
}: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const isApiCallInProgress = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      setFiles([]);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      isApiCallInProgress.current = false;
      setFiles([]);
    }
  }, [isOpen]);

  const handleUpdateFiles = (fileItems: Array<FilePondFile>) => {
    if (!fileItems?.length) {
      setFiles([]);
      return null;
    }
    if (fileItems.every((file) => file.status === FileStatus.IDLE)) {
      setFiles(fileItems.map((fileItem) => fileItem.file as File));
      return null;
    }
  };

  const handleSubmit = () => {
    if (isApiCallInProgress.current) return; // Prevents multiple calls
    isApiCallInProgress.current = true;
    onSubmit(files);
    setFiles([]);
    onClose();
    isApiCallInProgress.current = false;
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg w-[600px]">
          <div className="relative">
            <h2 className={`text-xl font-semibold mb-10`}>Upload Fonts</h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className={`absolute top-[50%] translate-y-[-50%] p-0 right-0`}
            >
              <IoCloseOutline className="text-dark" size={32} />
            </Button>
          </div>
          {files.length > maxFiles && (
            <span className="text-accent-red text-sm mb-2 flex items-start">
              <IoIosInformationCircle size={20} className="mr-3" />
              Max 10 files can be uploaded at once
            </span>
          )}
          <div
            className={`${
              files.length > 0 ? "" : "min-h-400"
            } custom-filepond-wrap  border border-dashed rounded-lg mb-6 bg-stroke-primary max-h-[calc(100vh_-_500px)] overflow-y-auto`}
          >
            <FilePond
              files={files}
              onupdatefiles={handleUpdateFiles}
              allowMultiple={allowMultiple}
              maxFiles={maxFiles}
              maxFileSize={maxFileSize}
              acceptedFileTypes={acceptedFileTypes}
              labelFileTypeNotAllowed={labelFileTypeNotAllowed}
              fileValidateTypeLabelExpectedTypes={
                fileValidateTypeLabelExpectedTypes
              }
              fileValidateTypeLabelExpectedTypesMap={
                fileValidateTypeLabelExpectedTypesMap
              }
              onerror={onError}
              onwarning={onWarning}
              labelIdle={labelIdle}
            />
          </div>
          <div className="flex justify-between pt-6">
            <Button
              onClick={onClose}
              variant="ghost"
              className="rounded-sm font-normal min-w-[160px] h-[56px] p-[16px] text-secondary tracking-wider"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-sm font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider text-white"
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
