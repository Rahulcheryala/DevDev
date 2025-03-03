import { useEffect, useRef, useState } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import axios from "axios";
import moment from "moment";
import hash from "object-hash";
import type { LabelsReports } from "~/modules/labelsreports";
import { AWS_LABELS_FOLDER_NAME } from "~/modules/labelsreports";
import type { User } from "~/modules/users";
import { base64ToFile } from "~/utils/helper";
import { path } from "~/utils/path";

type ActionStatus = { saveLabel: string };

const SaveStatusMap = {
  SAVED: "saved",
  UPLOADING: "uploading",
  UPLOAD_FAILED: "upload_failed",
  OFFLINE: "offline",
};

export default function EditorComponent({
  width,
  height,
  size,
  name,
  id,
  configuration,
  isFavorite,
  status,
  createdOn,
  modifiedOn,
  user,
  updateLabel,
  commentService,
  companyId,
  labelType,
}: LabelsReports & {
  user: User;
  updateLabel: (detail: { [key: string]: string }) => void;
  commentService: any;
}) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const configHashRef = useRef<string | null>(null);
  const [Editor, setEditor] = useState<any>(null);
  const [actionStatus, setActionStatus] = useState<ActionStatus>({
    saveLabel: SaveStatusMap.SAVED,
  });
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const lastUpdatedTimeString = moment(modifiedOn || createdOn).fromNow();

  // Load Editor dynamically on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@zeak/labels-forms").then((module) => {
        setEditor(() => module.Editor);
      });
    }
  }, []);

  // Check network status only on the client side
  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine);

      const updateNetworkStatus = () => {
        setIsOnline(navigator.onLine);
      };

      window.addEventListener("online", updateNetworkStatus);
      window.addEventListener("offline", updateNetworkStatus);

      return () => {
        window.removeEventListener("online", updateNetworkStatus);
        window.removeEventListener("offline", updateNetworkStatus);
      };
    }
  }, []);

  useEffect(() => {
    configHashRef.current = hash(configuration);
  }, [configuration]);

  const uploadImage = async (imageData: string) => {
    if (imageData && name) {
      const fileName = encodeURIComponent(`${name}-${id}.png`);
      const fileData = base64ToFile(imageData, fileName);
      const formData = new FormData();
      formData.append("folder", AWS_LABELS_FOLDER_NAME);
      formData.append("files", fileData as Blob);

      const result = await axios({
        method: "post",
        url: path.to.api.s3Upload,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return result?.data?.files?.[0] || null;
    }
    return null;
  };

  const saveLabel = async (config: any, imageData: string) => {
    const configHash = hash(config);
    if (configHashRef.current === configHash) return null;

    configHashRef.current = configHash;
    setActionStatus({ saveLabel: SaveStatusMap.UPLOADING });

    const previewUrl = await uploadImage(imageData);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("configuration", JSON.stringify(config));
    formData.append("previewUrl", previewUrl || "");
    formData.append("flashSuccessMsg", "Label saved");

    const result = await axios.post(path.to.api.editLabel, formData);

    setActionStatus({
      saveLabel: result?.data
        ? SaveStatusMap.SAVED
        : SaveStatusMap.UPLOAD_FAILED,
    });
  };

  const onDashboardClick = () => {
    navigate(path.to.labelsreportsHome());
  };

  const onFavoriteClick = async (value = false) => {
    updateLabel({ id, isFavorite: String(value) });
  };

  const handleStatusChange = async (value: string) => {
    updateLabel({ id, status: value });
  };

  const handleNameChange = (name: string) => {
    updateLabel({ id, name });
  };

  return (
    <>
      {/* Use fetcher to trigger save label statuses */}
      <fetcher.Form method="post" />
      {Editor && user && companyId && (
        <Editor
          isDocument={labelType?.toLowerCase() === "document"}
          width={width as number}
          height={height as number}
          unit={size as string}
          name={name as string}
          onSave={saveLabel}
          savedDocument={configuration}
          saveStatus={
            isOnline !== null
              ? isOnline
                ? actionStatus.saveLabel
                : SaveStatusMap.OFFLINE
              : SaveStatusMap.SAVED
          }
          onDashboardClick={onDashboardClick}
          isFavourite={!!isFavorite}
          onFavoriteClick={onFavoriteClick}
          status={status}
          onStatusChange={handleStatusChange}
          username={`${user?.firstName}${
            user?.lastName ? ` ${user.lastName}` : ""
          }`}
          lastUpdated={lastUpdatedTimeString}
          avatarUrl={user?.avatarUrl || undefined}
          labelComments={commentService}
          companyID={companyId}
          userDetails={user}
          labelId={id}
          onLabelNameChange={handleNameChange}
        />
      )}
    </>
  );
}
