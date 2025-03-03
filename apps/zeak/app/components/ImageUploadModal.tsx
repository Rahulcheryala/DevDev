import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { Modal, Button, toast } from "@zeak/react";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FileStatus, type FilePondFile } from "filepond";
//  Used when we are directly uploading photo from popup.
// import { CiCircleCheck } from "react-icons/ci";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

type ModalProps = {
  isOpen: boolean;
  // Used this to give unique ids in profile pic file naming.
  uniqueId?: string | null;
  fileData: string | Blob;
  onClose: () => void;
  onSubmit: (file: File | null) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: string; // in bytes
};

const ImageUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  acceptedFileTypes = [],
  maxFileSize = "2MB",
  fileData,
  uniqueId,
}: ModalProps) => {
  const editorRef = useRef<AvatarEditor>(null);
  const [file, setFile] = useState<Blob | string | null>(fileData);
  const [profileScale, setProfileScale] = useState<any>(1.2);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [isImageUploading] = useState<boolean>(false);
  const [uploadPhotoUrl, setUploadPhotoUrl] = useState<File | string | null>(
    null,
  );
  const filePondRef = useRef<FilePond>(null);

  useEffect(() => {
    return () => {
      resetModal();
    };
  }, []);

  useEffect(() => {
    if (isOpen && typeof fileData === "string") {
      setShowEditScreen(false);
      setFile(fileData);
      setProfileScale(1.2);
      setUploadPhotoUrl(fileData as string);
    }
  }, [isOpen, fileData]);

  const resetModal = () => {
    setFile(null);
    setProfileScale(1.2);
    setPhotoUploaded(false);
    setUploadPhotoUrl(null);
  };

  const handleUpdateFiles = (fileItems: Array<FilePondFile>) => {
    setFile(null);
    if (fileItems?.length && fileItems[0].status === FileStatus.IDLE) {
      setFile(fileItems?.length ? fileItems[0].file : null);
      setUploadPhotoUrl(fileItems?.length ? (fileItems[0].file as File) : null);
      return null;
    }
  };

  const handleSubmit = () => {
    if (file && editorRef.current) {
      editorRef.current.getImage().toBlob((blob: Blob | null) => {
        let newFile = null;
        if (blob) {
          newFile = new File(
            [blob],
            `${Date.now()}${uniqueId ? `-${uniqueId}` : ""}.png`,
            { type: blob.type },
          );
          setUploadPhotoUrl(newFile);
          onSubmit(newFile);
        }
        setFile(!newFile ? null : newFile);
      });
      onClose();
      return null;
    }
    onSubmit(null);
    onClose();
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
        <div className="bg-white p-6 rounded-lg w-[500px]">
          <div className="relative">
            <h2 className={`text-xl font-semibold mb-10`}>
              Add Profile Picture
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className={`absolute top-[50%] translate-y-[-50%] p-0 right-0`}
            >
              <IoCloseOutline className="text-dark" size={32} />
            </Button>
          </div>
          {!file ? (
            <div
              className={`custom-file-input ${
                isImageUploading ? "loading" : ""
              }`}
            >
              <FilePond
                ref={filePondRef}
                files={file ? [file] : []}
                onupdatefiles={handleUpdateFiles}
                allowMultiple={false}
                maxFileSize={maxFileSize}
                acceptedFileTypes={acceptedFileTypes}
                labelFileTypeNotAllowed="Expects .jpg, .jpeg or .png"
                labelMaxFileSizeExceeded="Expects max size of 2MB"
                onerror={(e: any) => {
                  setFile(null);
                  setUploadPhotoUrl(null);
                  filePondRef.current?.removeFiles();
                  toast.error(e.main);
                }}
                onwarning={() => setFile(null)}
                labelIdle={
                  isImageUploading
                    ? `<div
                      style="font-size: 12px; line-height: 1"
                      class="upload-photo-wrap px-[16px] flex justify-center items-center flex-col text-xs">
                      <svg
                        width="36"
                        height="38"
                        viewBox="0 0 36 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 3.96875V7.82292M18 28.25V34.4167M8.625 19H3.375M31.875 19H29.625M27.6857 28.9547L26.625 27.8646M27.9963 8.84934L25.875 11.0296M7.38236 29.9126L11.625 25.5521M7.69302 8.53005L10.875 11.8004"
                          stroke="#0E77D3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span class="text-[#0E77D3] mt-1">Uploading</span>
                    </div>`
                    : `<div
                      style="font-size: 12px; line-height: 1"
                      class="upload-photo-wrap px-[16px] flex justify-center items-center flex-col text-xs"
                    >
                      <svg
                        class="mb-2"
                        width="28"
                        height="30"
                        viewBox="0 0 28 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.3 28.875H6.39706C5.48833 28.875 5.03397 28.875 4.82357 28.6903C4.64102 28.5301 4.54414 28.2897 4.56297 28.0437C4.58468 27.7602 4.90596 27.43 5.54853 26.7696L18.3029 13.6609C18.897 13.0503 19.194 12.7451 19.5365 12.6307C19.8377 12.5301 20.1623 12.5301 20.4635 12.6307C20.806 12.7451 21.103 13.0503 21.6971 13.6609L27.5 19.625V21.475M20.3 28.875C22.8202 28.875 24.0804 28.875 25.043 28.3709C25.8897 27.9275 26.5781 27.22 27.0095 26.3497C27.5 25.3604 27.5 24.0652 27.5 21.475M20.3 28.875H7.7C5.17976 28.875 3.91965 28.875 2.95704 28.3709C2.11031 27.9275 1.4219 27.22 0.990471 26.3497C0.5 25.3604 0.5 24.0652 0.5 21.475V8.525C0.5 5.93476 0.5 4.63964 0.990471 3.65029C1.4219 2.78004 2.11031 2.07251 2.95704 1.62909C3.91965 1.125 5.17976 1.125 7.7 1.125H20.3C22.8202 1.125 24.0804 1.125 25.043 1.62909C25.8897 2.07251 26.5781 2.78004 27.0095 3.65029C27.5 4.63964 27.5 5.93476 27.5 8.525V21.475M11.75 9.60417C11.75 11.307 10.4069 12.6875 8.75 12.6875C7.09315 12.6875 5.75 11.307 5.75 9.60417C5.75 7.90129 7.09315 6.52083 8.75 6.52083C10.4069 6.52083 11.75 7.90129 11.75 9.60417Z"
                          stroke="#0E77D3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Drag and drop an image, or <br />
                      <span class="underline underline-offset-1 text-[#0E77D3] mt-1">
                        browse
                      </span>
                    </div>`
                }
              />
            </div>
          ) : (
            <>
              {!photoUploaded ? (
                <div>
                  <AvatarEditor
                    ref={editorRef}
                    className={`rounded-full mx-auto ${
                      !showEditScreen && "pointer-events-none"
                    }`}
                    image={uploadPhotoUrl as File}
                    width={208}
                    height={208}
                    border={1}
                    color={[0, 0, 0, 0.2]} // RGBA
                    scale={profileScale}
                    rotate={0}
                  />
                  {!showEditScreen ? (
                    <div className="my-10 flex justify-center">
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-accent-primary hover:text-accent-primary"
                        onClick={() => setShowEditScreen(true)}
                      >
                        Change
                      </Button>
                      <hr className="h-5 w-[1px] bg-stroke mx-4 my-0" />
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-accent-primary hover:text-accent-primary"
                        onClick={resetModal}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="my-6 flex justify-between">
                      <Button
                        variant="ghost"
                        onClick={() => setProfileScale(profileScale - 0.1)}
                        disabled={profileScale.toFixed(1) == 1.0}
                        className="w-[32px] px-1"
                      >
                        <FiMinus size={18} />
                      </Button>
                      <Slider
                        value={profileScale}
                        min={1}
                        max={5}
                        step={0.1}
                        onChange={(e) => setProfileScale(e)}
                        className="w-[calc(100%_-_88px)] custom-slider"
                      />
                      <Button
                        variant="ghost"
                        onClick={() => setProfileScale(profileScale + 0.1)}
                        disabled={profileScale.toFixed(1) == 5.0}
                        className="w-[32px] px-1"
                      >
                        <FiPlus className="" size={18} />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <></>
                // Will be used when we upload directly through the modal.
                // <div className="text-center">
                //   <img
                //     src={uploadPhotoUrl}
                //     alt={"final-img"}
                //     className="w-[208px] h-[208px] mb-6 object-cover mx-auto rounded-full"
                //   />
                //   <div className="bg-table p-4 rounded-xl mb-6">
                //     <div className="max-w-[271px] mx-auto">
                //       <div className="flex items-center justify-center mb-3">
                //         <CiCircleCheck
                //           className="text-accent-darkGreen"
                //           size={20}
                //         />
                //         <p className="text-sm text-accent-darkGreen font-semibold pl-2">
                //           Profile added
                //         </p>
                //       </div>
                //       <p className="text-xs text-secondary">
                //         We&apos;ve uploaded your profile, It may take a few minute
                //         to display everywhere
                //       </p>
                //     </div>
                //   </div>
                // </div>
              )}
            </>
          )}

          {/*<div className="flex justify-end mt-4">
                        <Button
                            className="mr-3 w-1/2 rounded-[100px]"
                            onClick={onClose}
                            size={"sm"}
                            variant={"secondary"}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-1/2 rounded-[100px]"
                            onClick={handleSubmit}
                            disabled={files.length === 0}
                            size={"sm"}
                            variant={"primary"}
                        >
                            Upload
                        </Button>
                    </div>*/}

          <div className="flex justify-between pt-6">
            <Button
              onClick={onClose}
              variant="ghost"
              className="rounded-sm mx-2 font-normal min-w-[160px] h-[56px] p-[16px] text-secondary tracking-wider leading-[24px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-sm mx-2 font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-white"
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
