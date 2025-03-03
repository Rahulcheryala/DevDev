import { useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import Avatar from "~/components/Avatar";
import ImageUploadModal from "~/components/ImageUploadModal";

type ProfilePhotoFormProps = {
  // Used this to give unique ids in profile pic file naming.
  uniqueId?: string | null;

  avatarUrl?: string | null;
  userName: string;
  onFileChange: (file: File | null) => void;
  isReadOnly?: boolean;
  msg1?: string;
  msg2?: string;
  msg3?: string;
  size?: string;
};

const ProfilePhotoFormV2 = ({
  uniqueId,
  userName,
  avatarUrl = null,
  onFileChange,
  isReadOnly = false,
  msg1 = "Profile picture",
  msg2 = "Drag and drop or click to upload a picture for user",
  msg3 = ".png, .jpg, .jpeg (Max 2MB)",
  size,
}: ProfilePhotoFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(avatarUrl);

  const handleSubmit = (file: File | null) => {
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
      onFileChange(null);
    }
  };

  return (
    <>
      <div className="flex items-center">
        {/* <div className="w-[100px] h-[100px] rounded-[100px] bg-[#9747FF] overflow-hidden flex items-center justify-center">
        <span className="text-[32px] leading-[41px] text-[#FFFFFF]">
          NX
        </span>
      </div> */}
        <div className="relative group cursor-pointer">
          <Avatar
            size={size || "2xl"}
            src={imagePreview ?? ""}
            // path={user?.avatarUrl}
            name={userName}
            onClick={() => !isReadOnly && setShowModal(true)}
          />
          {!isReadOnly && (
            <span className="hidden group-hover:flex transition ease-in-out duration-300 absolute top-0 left-0 h-full w-full bg-primary-foreground rounded-full flex justify-center items-center pointer-events-none">
              <MdOutlinePhotoCamera
                className="text-[hsl(var(--card))]"
                size={40}
              />
            </span>
          )}
        </div>
        <div className="w-[calc(100%_-_100px)] pl-[32px]">
          <p className="text-[14px] leading-[20px] text-accent">{msg1}</p>
          <span className="text-[12px] leading-[17px] text-secondary-foreground block">
            {msg2}
          </span>
          <span className="text-[12px] leading-[17px] text-secondary-foreground block">
            {msg3}
          </span>
        </div>
      </div>
      <ImageUploadModal
        fileData={imagePreview as string}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        maxFileSize={"2MB"}
        acceptedFileTypes={["image/png", "image/jpeg"]}
        onSubmit={handleSubmit}
        uniqueId={uniqueId}
      />
    </>
  );
};

export default ProfilePhotoFormV2;
