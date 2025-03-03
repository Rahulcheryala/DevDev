import { ValidatedForm } from "@zeak/remix-validated-form";
import { useFetcher } from "@remix-run/react";
import { forwardRef, useEffect, useState } from "react";

import {
  ClearableInput,
  AddressInput,
  PhoneInputV2,
  Input,
} from "~/components/Form";
import type { User } from "~/modules/users";
import { path } from "~/utils/path";
import ProfilePhotoFormV2 from "~/modules/shared/ui/ProfilePhotoFormV2";
import axios from "axios";
import {
  accountProfileValidatorV2,
  AWS_USER_PROFILE_FOLDER_NAME,
} from "~/modules/access-settings";
import { extractAddressComponents } from "~/modules/shared";
import type { z } from "zod";

type UserDetails = User & { avatarSignedUrl: string | null; roleName: string };

type ProfileFormPropsV2 = {
  user: UserDetails;
  googleMapsApiKey: string;
  editProfile?: boolean;
  updateFormEditState: (value: boolean) => void;
  isSaveBtnClickedOnce?: boolean;
};

const ProfileFormV2 = forwardRef<HTMLButtonElement, ProfileFormPropsV2>(
  (props, ref) => {
    const fetcher = useFetcher<{ status: string }>();
    const [formValue, setFormValue] = useState<UserDetails>(props.user);
    const [imageData, setImageData] = useState<File | null>();

    useEffect(() => {
      setFormValue(props.user);
    }, [props.user]);

    useEffect(() => {
      if (fetcher.data?.status === "success") {
        props.updateFormEditState(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetcher]);

    const handlePlacesSelect = async (
      place: google.maps.places.PlaceResult,
    ) => {
      const addrComponents = extractAddressComponents(place);
      await setFormValue({
        ...formValue,
        ...addrComponents,
      });
    };

    const uploadImage = async (imageData: File) => {
      if (imageData) {
        const newFileName = encodeURI(imageData.name);
        const newFile = new File([imageData], newFileName, {
          type: imageData.type,
        });

        const formData = new FormData();
        formData.append("folder", AWS_USER_PROFILE_FOLDER_NAME);
        formData.append("files", newFile);
        const result = await axios({
          method: "post",
          url: path.to.api.s3Upload,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (result?.data?.files?.length) {
          return result?.data?.files[0];
        }
        return null;
      }
    };

    const handleSubmit = async (
      data: User & { avatarUrl: File | string },
      event: React.FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();
      let uploadedKey = props?.user?.avatarUrl;
      const formData = new FormData();
      if (imageData) {
        uploadedKey = await uploadImage(imageData as File);
        formData.append("avatarUrl", uploadedKey as string);
      }
      (
        Object.keys(data) as Array<
          keyof z.infer<typeof accountProfileValidatorV2>
        >
      ).forEach((item) => {
        if (item !== "avatarUrl") {
          formData.append(item, data[item]);
        }
      });
      fetcher.submit(formData, { method: "POST" });
    };

    return (
      <ValidatedForm
        method="post"
        onSubmit={handleSubmit}
        validator={accountProfileValidatorV2}
        defaultValues={formValue as any}
        className="w-full"
      >
        <div className="flex flex-wrap mx-[-20px]">
          <div className="w-1/2 px-[20px]">
            <ProfilePhotoFormV2
              uniqueId={`${props.user?.id}-user-profile`}
              avatarUrl={props?.user?.avatarSignedUrl}
              userName={formValue.fullName as string}
              onFileChange={(e) => setImageData(e)}
              isReadOnly={!props.editProfile}
            />
          </div>
          <div className="w-1/2 px-[20px]">
            <label className="text-[16px] leading-[20px] text-accent mb-[5px]">
              <span className="text-secondary">Ranbaxy</span> / Xcelpros
            </label>
            <Input
              name="roles"
              label="Roles"
              value={formValue?.roleName}
              readOnly
              isReadOnly={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-[-20px]">
          <div className="w-1/2 mt-[40px] px-[20px]">
            <ClearableInput
              name="firstName"
              label="First name"
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            <ClearableInput
              name="lastName"
              label="Last name"
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            <ClearableInput
              name="email"
              label="Email Address"
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile || formValue?.roleName !== 'Admin'}
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            {/* <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
              Phone number
            </label> */}
            <PhoneInputV2
              name="phno"
              label="Phone number"
              defaultValue={formValue.phno}
              validateOnChange={props.isSaveBtnClickedOnce}
              // for disabled and hiding the close icon you can use below two property
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
            />

            {/* <PhoneInput name="phno" label="Phone number" /> */}
            {/* //  onBlur={(e) => handleBlur('phno', e.target.value)} /> */}
            {/* <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
            Phone number
          </label>
          <div className="relative mx-[-10px] flex">
            <div className="relative select-close-inner px-[10px]">
              <Select
                size="lg"
                // value={params.get("labelType") ?? ""}
                isClearable
                options={[]}
                onChange={(selected) => { }}
              />
            </div>
            <div className="w-[calc(100%_-_160px)] px-[10px]">
              <ClearableInput name="phno" type="number"/>
            </div>
          </div> */}
          </div>
        </div>
        <div className="flex items-center justify-between pb-[10px] border-b mb-[20px] w-full mt-[60px]">
          <h2 className="text-base text-accent tracking-wider">Address</h2>
        </div>
        <div className="flex flex-wrap mx-[-20px]">
          <div className="w-1/2 mt-[40px] px-[20px]">
            <AddressInput
              name="address1"
              label="Address 1"
              googleMapsApiKey={props.googleMapsApiKey}
              value={formValue.address1}
              onPlaceSelect={handlePlacesSelect}
              onChange={(e) =>
                setFormValue({ ...formValue, address1: e.target.value })
              }
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            <ClearableInput
              name="address2"
              label="Address 2"
              value={formValue.address2}
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
              onChange={(e) =>
                setFormValue({ ...formValue, address2: e.target.value })
              }
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            <ClearableInput
              name="city"
              label="City"
              validateOnChange={true}
              value={formValue.city}
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
              onChange={(e) =>
                setFormValue({ ...formValue, city: e.target.value })
              }
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            {/* <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
              State / Province
            </label> 
            <div className="relative select-close-inner">
               <Select
                size="lg"
                name="state"
                // value={params.get("labelType") ?? ""}
                isClearable
                options={[]}
                onChange={(selected) => { }}
                aria-label="State / Province"
                placeholder="State / Province"
              /> 
            </div> */}
            <ClearableInput
              name="state"
              label="State / Province"
              value={formValue.state}
              validateOnChange={true}
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
              onChange={(e) =>
                setFormValue({ ...formValue, state: e.target.value })
              }
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            <ClearableInput
              name="zipCode"
              type="number"
              label="Zip/ Postal Code"
              value={formValue.zipCode}
              validateOnChange={true}
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
              onChange={(e) =>
                setFormValue({ ...formValue, zipCode: e.target.value })
              }
            />
          </div>
          <div className="w-1/2 mt-[40px] px-[20px]">
            {/* <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
              Country
            </label> 
            <div className="relative select-close-inner">
              <Select
                size="lg"
                name="country"
                // value={params.get("labelType") ?? ""}
                isClearable
                options={[]}
                onChange={(selected) => { }}
                aria-label="Country"
                placeholder="Country"
              />
            </div> */}
            <ClearableInput
              name="country"
              label="Country"
              value={formValue.country}
              validateOnChange={true}
              hideClose={!props.editProfile}
              isReadOnly={!props.editProfile}
              onChange={(e) =>
                setFormValue({ ...formValue, country: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="hidden" ref={ref}>
          {" "}
          Submit
        </button>
      </ValidatedForm>
    );
  },
);

ProfileFormV2.displayName = "ProfileFormV2";

export default ProfileFormV2;
