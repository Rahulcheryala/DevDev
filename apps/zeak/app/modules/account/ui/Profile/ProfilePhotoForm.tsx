import { Button, File, VStack, toast } from "@zeak/react";
import { useSubmit } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { Avatar } from "~/components";
import { useSupabase } from "~/lib/supabase";
import type { Account } from "~/modules/account";
import { path } from "~/utils/path";

type ProfilePhotoFormProps = {
  user: Account;
};

const ProfilePhotoForm = ({ user }: ProfilePhotoFormProps) => {
  const { supabase } = useSupabase();
  const submit = useSubmit();

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && supabase) {
      const avatarFile = e.target.files[0];
      const fileExtension = avatarFile.name.substring(
        avatarFile.name.lastIndexOf(".") + 1,
      );

      const imageUpload = await supabase.storage
        .from("avatars")
        .upload(`${user.id}.${fileExtension}`, avatarFile, {
          cacheControl: "0",
          upsert: true,
        });

      if (imageUpload.error) {
        console.error(imageUpload.error);
        toast.error("Failed to upload image");
      }

      if (imageUpload.data?.path) {
        submitAvatarUrl(imageUpload.data.path);
      }
    }
  };

  const deleteImage = async () => {
    if (supabase && user?.avatarUrl) {
      const imageDelete = await supabase.storage
        .from("avatars")
        .remove([user.avatarUrl]);

      if (imageDelete.error) {
        toast.error("Failed to remove image");
      }

      submitAvatarUrl(null);
    }
  };

  const submitAvatarUrl = (avatarPath: string | null) => {
    const formData = new FormData();
    formData.append("intent", "photo");
    if (avatarPath) formData.append("path", avatarPath);
    submit(formData, {
      method: "post",
      action: path.to.profile,
      replace: true,
    });
  };

  return (
    <VStack className="px-8 items-center">
      <Avatar
        size="2xl"
        path={user?.avatarUrl}
        name={user?.fullName ?? undefined}
      />
      <File accept="image/*" onChange={uploadImage}>
        {user.avatarUrl ? "Change" : "Upload"}
      </File>

      {user.avatarUrl && (
        <Button variant="secondary" onClick={deleteImage}>
          Remove
        </Button>
      )}
    </VStack>
  );
};

export default ProfilePhotoForm;
