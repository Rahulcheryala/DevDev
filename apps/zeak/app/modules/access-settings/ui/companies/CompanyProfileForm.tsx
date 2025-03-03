import { forwardRef, memo, useEffect, useState } from "react";
import {
  extractAddressComponents,
  ProfilePhotoFormV2,
  uploadImageToS3FromClient,
} from "~/modules/shared";
import {
  AWS_COMPANY_FOLDER_NAME,
  companyStatusMap,
  companyValidatorV2,
  primaryLanguageOptions,
} from "../../access-settings.model";
import { Button } from "@zeak/react";
import { useControlField, ValidatedForm } from "@zeak/remix-validated-form";
import * as Accordion from "@radix-ui/react-accordion";
import { LuChevronDown } from "react-icons/lu";
import {
  AddressInput,
  ClearableInput,
  CustomFormFields,
  Input,
  Select,
  Timezone,
} from "~/components/Form";
import { useFetcher } from "@remix-run/react";
import type { z } from "zod";
import slugify from "slugify";
import { compressImage } from "~/utils/helper";

type CompanyDetails = Partial<z.infer<typeof companyValidatorV2>>;

type CompanyProfileFormProps = {
  companyDetails?: CompanyDetails;
  googleMapsApiKey: string;
  editProfile?: boolean;
};

const defaultCompanyDetails = {
  logo: "",
  name: "",
  domainUrl: "",
  companyCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  primaryLanguage: primaryLanguageOptions[0].value,
  timezone: "",
  status: companyStatusMap.ACTIVE,
};

const PhotoForm = memo(
  ({
    avatarUrl,
    userName,
    handleFileChange,
    isReadOnly,
  }: {
    avatarUrl: string;
    userName: string;
    handleFileChange: (e: File | null) => void;
    isReadOnly: boolean;
  }) => {
    return (
      <ProfilePhotoFormV2
        avatarUrl={avatarUrl}
        userName={userName}
        onFileChange={handleFileChange}
        isReadOnly={isReadOnly}
        msg1="Company Logo"
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.avatarUrl === nextProps.avatarUrl &&
      prevProps.isReadOnly === nextProps.isReadOnly
    );
  },
);

PhotoForm.displayName = "PhotoForm";

const CompanyProfileForm = forwardRef<
  HTMLButtonElement,
  CompanyProfileFormProps
>(({ companyDetails, googleMapsApiKey, editProfile }, ref) => {
  const fetcher = useFetcher<{ success: string }>();
  const [formValue, setFormValue] = useState<CompanyDetails>(
    defaultCompanyDetails,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageData, setImageData] = useState<File | null>();
  const formId = "myForm";
  const [domainUrl, setDomainUrl] = useControlField<string>(
    "domainUrl",
    formId,
  );
  const [addressLine1, setAddressLine1] = useControlField<string>(
    "addressLine1",
    formId,
  );
  const [addressLine2, setAddressLine2] = useControlField<string>(
    "addressLine2",
    formId,
  );
  const [city, setCity] = useControlField<string>("city", formId);
  const [state, setState] = useControlField<string>("state", formId);
  const [postalCode, setPostalCode] = useControlField<string>(
    "postalCode",
    formId,
  );
  const [country, setCountry] = useControlField<string>("country", formId);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
      setFormValue(defaultCompanyDetails);
      setImageData(undefined);
    };
  }, []);

  useEffect(() => {
    const defaultDetails = {
      ...defaultCompanyDetails,
      domainUrl: window?.location?.origin ? `${window?.location?.origin}/` : "",
    };

    setFormValue(companyDetails ? companyDetails : defaultDetails);
  }, [companyDetails]);

  const handleNameChange = (e: string) => {
    const domainUrl = slugify(e ?? "", {
      lower: true, // convert to lowercase
      remove: /[*+~.()'"!:@#$%^&?/<>;:"'-]/g, // remove special characters
    });
    setDomainUrl(`${window?.location?.origin ?? ""}/${domainUrl}`);
  };

  const handlePlacesSelect = async (place: google.maps.places.PlaceResult) => {
    const addrComponents = extractAddressComponents(place);
    setAddressLine1(addrComponents?.address1 ?? "");
    setAddressLine2(addrComponents?.address2 ?? "");
    setCity(addrComponents?.city ?? "");
    setState(addrComponents?.state ?? "");
    setPostalCode(addrComponents?.zipCode ?? "");
    setCountry(addrComponents?.country ?? "");
  };

  const handleSubmit = async (
    data: CompanyDetails,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // Access the form element directly to get all form data
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const requestFormData = new FormData();
    let uploadedKey = companyDetails?.logo;

    companyDetails?.id && requestFormData.append("id", companyDetails.id);
    requestFormData.append(
      "status",
      companyDetails?.status ?? companyStatusMap.ACTIVE,
    );

    if (imageData) {
      const compressedFile = await compressImage(imageData);
      uploadedKey = await uploadImageToS3FromClient(
        compressedFile as File,
        AWS_COMPANY_FOLDER_NAME,
      );
      requestFormData.append("logo", uploadedKey as string);
    } else {
      requestFormData.append("logo", "");
    }

    for (const [key, value] of formData.entries()) {
      if (key !== "__rvfInternalFormId" && key !== "logo") {
        requestFormData.append(key, value ?? "");
      }
    }

    fetcher.submit(requestFormData, { method: "POST" });
  };

  return (
    isLoaded && (
      <ValidatedForm
        validator={companyValidatorV2}
        defaultValues={formValue}
        onSubmit={handleSubmit}
        method="post"
        id={formId}
      >
        <div className="grid grid-cols-2 gap-x-[40px] mb-12">
          <PhotoForm
            avatarUrl={formValue?.logo ?? ""}
            userName={formValue?.name ?? ""}
            isReadOnly={!editProfile}
            handleFileChange={(e) => {
              setImageData(e);
            }}
          />
          <div className="relative">
            <Input
              className="min-h-[54px]"
              name="domainUrl"
              label="Company Url"
              isReadOnly={true}
              value={domainUrl ?? ""}
            />
          </div>
          <div className="mt-10">
            <ClearableInput
              name="name"
              label="Company Name"
              onChange={(e) => handleNameChange(e?.target?.value)}
              showErrors={editProfile}
              hideClose={!editProfile}
              isReadOnly={!editProfile}
            />
          </div>

          <div className="mt-10">
            <ClearableInput
              name="companyCode"
              label="Company Code"
              showErrors={editProfile}
              hideClose={!editProfile}
              isReadOnly={!editProfile}
            />
          </div>
        </div>
        <Accordion.Root
          className="AccordionRoot mb-[60px]"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <Accordion.Item className="AccordionItem" value="item-1">
            <Accordion.Trigger className="w-full">
              <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
                <p className="text-sm font-normal tracking-[0.5px]">Address</p>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" className="px-0 w-6 h-6">
                    <LuChevronDown
                      size="20px"
                      strokeWidth="2"
                      color="#8A8A8F"
                    />
                  </Button>
                </div>
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="pt-[26px]">
              <div className="grid grid-cols-2 gap-x-[40px]">
                <div className="pt-4">
                  <AddressInput
                    name="addressLine1"
                    label="Address 1"
                    googleMapsApiKey={googleMapsApiKey}
                    value={addressLine1}
                    onPlaceSelect={handlePlacesSelect}
                    onChange={(e) => setAddressLine1(e.target.value ?? "")}
                    hideClose={!editProfile}
                    isReadOnly={!editProfile}
                  />
                </div>
                <div className="pt-4">
                  <ClearableInput
                    name="addressLine2"
                    label="Address 2"
                    value={addressLine2}
                    showErrors={editProfile}
                    hideClose={!editProfile}
                    isReadOnly={!editProfile}
                    onChange={(e) => setAddressLine2(e.target.value ?? "")}
                  />
                </div>
                <div className="pt-4">
                  <ClearableInput
                    name="city"
                    label="City"
                    value={city}
                    validateOnChange={true}
                    hideClose={!editProfile}
                    isReadOnly={!editProfile}
                    onChange={(e) => setCity(e.target.value ?? "")}
                  />
                </div>
                <div className="pt-4">
                  <ClearableInput
                    name="state"
                    label="State / Province"
                    validateOnChange={true}
                    value={state}
                    hideClose={!editProfile}
                    isReadOnly={!editProfile}
                    showErrors={editProfile}
                    onChange={(e) => setState(e.target.value ?? "")}
                  />
                </div>
                <div className="pt-4">
                  <ClearableInput
                    name="postalCode"
                    type="number"
                    label="Zip/ Postal Code"
                    validateOnChange={true}
                    value={postalCode}
                    hideClose={!editProfile}
                    isReadOnly={!editProfile}
                    showErrors={editProfile}
                    onChange={(e) => setPostalCode(e?.target?.value ?? "")}
                  />
                </div>
                <div className="pt-4">
                  <ClearableInput
                    name="country"
                    label="Country"
                    value={country}
                    validateOnChange={true}
                    hideClose={!editProfile}
                    isReadOnly={!editProfile}
                    showErrors={editProfile}
                    onChange={(e) => setCountry(e.target.value ?? "")}
                  />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <Accordion.Root
          className="AccordionRoot mb-[60px]"
          type="single"
          defaultValue="addition-info"
          collapsible
        >
          <Accordion.Item className="AccordionItem" value="addition-info">
            <Accordion.Trigger className="w-full">
              <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
                <p className="text-sm font-normal tracking-[0.5px]">
                  Additional Info
                </p>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" className="px-0 w-6 h-6">
                    <LuChevronDown
                      size="20px"
                      strokeWidth="2"
                      color="#8A8A8F"
                    />
                  </Button>
                </div>
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="pt-[26px]">
              <div className="grid grid-cols-2 gap-x-[40px]">
                <div className="pt-4">
                  <Select
                    name="primaryLanguage"
                    label="Primary Language"
                    options={primaryLanguageOptions}
                    isReadOnly={!editProfile}
                  />
                </div>
                <div className="pt-4">
                  <Timezone
                    name="timezone"
                    label="Timezone"
                    isReadOnly={!editProfile}
                  />
                </div>
              </div>
              <div className={`grid grid-cols-2 gap-x-[40px]`}>
                <div className="pt-4">
                  <CustomFormFields table="company" isReadOnly={!editProfile} />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <button type="submit" className="hidden" ref={ref}>
          Submit
        </button>
      </ValidatedForm>
    )
  );
});

CompanyProfileForm.displayName = "CompanyProfileForm";

export default CompanyProfileForm;
