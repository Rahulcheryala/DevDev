import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react";
import { validationError, validator } from "@zeak/remix-validated-form";
import { type Libraries, LoadScript } from "@react-google-maps/api";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import { PiFloppyDisk, PiPencilSimpleLine } from "react-icons/pi";
import Breadcrumbs from "~/components/Breadcrumb";
import { s3Client } from "~/lib/s3";
import { accountProfileValidatorV2 } from "~/modules/access-settings";
import { getAccount, updatePublicAccount } from "~/modules/account";
import { ProfileFormV2 } from "~/modules/access-settings/ui/profile";
import { GoogleMapsLibraries } from "~/modules/shared";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import { getEmployeeRoleDetails, type User } from "~/modules/users";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import type { Handle } from "~/utils/handle";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import { GoArrowLeft } from "react-icons/go";

export const handle: Handle = {
  breadcrumb: "User Profile",
  to: path.to.profile,
};

const ProfileTabs = {
  OVERVIEW: "Overview",
  COMPANIES: "Companies",
  TEAMS: "Teams",
  SECURITY: "Security",
  ALERTS: "Alerts",
  ACTIVITY: "Activity",
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId, userId } = await requirePermissions(request, {});

  const [user, employeeRoleDetails] = await Promise.all([
    getAccount(client, userId),
    getEmployeeRoleDetails(client, userId, companyId),
  ]);

  if (user.error || !user.data) {
    throw redirect(
      path.to.authenticatedRoot,
      await flash(request, error(user.error, "Failed to get user")),
    );
  }

  if (employeeRoleDetails.error) {
    throw redirect(
      path.to.authenticatedRoot,
      await flash(
        request,
        error(employeeRoleDetails.error, "Failed to get emplayee attributes"),
      ),
    );
  }

  let userData: User & { avatarSignedUrl: string | null; roleName: string } = {
    ...user.data,
    avatarSignedUrl: null,
    roleName: employeeRoleDetails?.data?.employeeType?.name ?? "",
  };

  if (user?.data?.avatarUrl) {
    userData.avatarSignedUrl = await generateSignedUrl(
      s3Client,
      process.env.AWS_BUCKET_NAME as string,
      user.data.avatarUrl,
    );
  }

  return json({
    user: userData,
    //  attributes: publicAttributes.data,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  // TODO Add permissions
  const { client, userId } = await requirePermissions(request, {});

  const validation = await validator(accountProfileValidatorV2).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const {
    firstName,
    lastName,
    email,
    address1,
    address2,
    city,
    phno,
    avatarUrl,
    state,
    country,
    zipCode,
  } = validation.data;

  const updateAccount = await updatePublicAccount(client, {
    id: userId,
    firstName,
    lastName,
    email,
    address1,
    address2,
    city,
    phno,
    avatarUrl,
    state,
    country,
    zipCode,
  });

  if (updateAccount.error)
    return json(
      {},
      await flash(
        request,
        error(updateAccount.error, "Failed to update profile"),
      ),
    );

  return json(
    { status: "success" },
    await flash(request, success("Updated profile")),
  );
}

export default function AccountProfile() {
  const { user, googleMapsApiKey } = useLoaderData<typeof loader>();

  const [currentTab, setCurrentTab] = useState(ProfileTabs.OVERVIEW);
  const [editProfile, setEditProfile] = useState(false);
  const [isSaveBtnClickedOnce, setIsSaveBtnClickedOnce] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey as string}
      libraries={GoogleMapsLibraries as Libraries}
    >
      <div className="flex items-center gap-2">
        <GoArrowLeft size={24} className="text-secondary" />
        <Breadcrumbs />
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          User Profile
        </h2>
        {/* {currentTab === HomeTabMap.DASHBOARD && ( */}
        <Button
          variant={editProfile ? "primary" : "secondary"}
          className={`rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] ${
            editProfile ? "" : "bg-white hover:text-white"
          }`}
          leftIcon={
            editProfile ? (
              <PiFloppyDisk size={20} />
            ) : (
              <PiPencilSimpleLine size={20} />
            )
          }
          onClick={() => {
            if (editProfile) {
              submitBtnRef?.current?.click();
              setIsSaveBtnClickedOnce(true);
            } else setEditProfile(true);
          }}
        >
          {editProfile ? "Save" : "Edit"}
        </Button>
        {/* )} */}
      </div>
      <Tabs
        defaultValue={ProfileTabs.OVERVIEW}
        onValueChange={handleTabChange}
        value={currentTab}
      >
        <TabsList aria-label="List of tabs">
          <TabsTrigger value={ProfileTabs.OVERVIEW}>Overview</TabsTrigger>
          <TabsTrigger value={ProfileTabs.SECURITY}>Security</TabsTrigger>
          <TabsTrigger value={ProfileTabs.ALERTS}>Alerts</TabsTrigger>
          <TabsTrigger value={ProfileTabs.ACTIVITY}>Activity</TabsTrigger>
        </TabsList>
        <TabsContent value={ProfileTabs.OVERVIEW} className="pt-[60px]">
          <ProfileFormV2
            user={user}
            ref={submitBtnRef}
            googleMapsApiKey={googleMapsApiKey || ""}
            editProfile={editProfile}
            updateFormEditState={(e) => setEditProfile(e)}
            isSaveBtnClickedOnce={isSaveBtnClickedOnce}
          />
        </TabsContent>
        <TabsContent
          value={ProfileTabs.SECURITY}
          className="pt-[60px]"
        ></TabsContent>
        <TabsContent
          value={ProfileTabs.ALERTS}
          className="pt-[60px]"
        ></TabsContent>
        <TabsContent
          value={ProfileTabs.ACTIVITY}
          className="pt-[60px]"
        ></TabsContent>
      </Tabs>
    </LoadScript>
  );
}
