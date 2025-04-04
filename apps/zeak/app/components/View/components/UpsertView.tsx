import {
  Button,
  DropdownMenuLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useLocation, useRevalidator } from "@remix-run/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ClearableInput } from "~/components/Form";
import type { TableNameType, Views } from "~/modules/view";
import { privacyTypeMap, viewValidator } from "~/modules/view";
import { path } from "~/utils/path";
import { useViewTableConfStore } from "~/stores";

interface ViewProps {
  tableName: string;
  setIsListViewMode: React.Dispatch<React.SetStateAction<any>>;
  selectedView: Views | null;
  setSelectedView: React.Dispatch<React.SetStateAction<Views | null>>;
}

const View = ({
  tableName,
  setIsListViewMode,
  selectedView,
  setSelectedView,
}: ViewProps) => {
  const revalidator = useRevalidator();
  const location = useLocation();

  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState<string>(privacyTypeMap.Public);
  const [viewTableConf] = useViewTableConfStore();

  const isEdit = () => selectedView && selectedView.id;

  useEffect(() => {
    if (selectedView) {
      setName(selectedView.name as string);
      setPrivacy(selectedView.privacy);
    }
  }, [selectedView]);

  const saveHandler = useCallback(
    async (data: any) => {
      const query = new URLSearchParams(location.search);
      const queryParams = Object.fromEntries(query.entries());
      const shareArray = selectedView
        ? selectedView.share?.map((item: { id: string }) => item.id)
        : [];

      const formData = new FormData();
      formData.append("sharedWith", JSON.stringify(shareArray || []));
      formData.append("params", JSON.stringify(queryParams));
      formData.append(
        "tableConf",
        JSON.stringify({ colWidthInTableConf: viewTableConf }),
      );

      formData.append("name", name);
      formData.append("sharePreference", "");
      formData.append("privacy", privacy);
      formData.append("share", JSON.stringify(shareArray || []));
      formData.append("entity", tableName);

      try {
        let url = "";
        if (selectedView && selectedView.id) {
          // Edit mode
          formData.append("id", selectedView.id);
          url = path.to.api.updateView(selectedView.id);
        } else {
          // Add mode
          url = path.to.api.upsertView;
        }
        const { data } = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedViews = data?.data;
        if (updatedViews.length > 0) {
          setSelectedView(updatedViews[0]);
        }
        setIsListViewMode(true);
        revalidator.revalidate();
      } catch (error) {
        toast.error("Failed to save view");
      }

      revalidator.revalidate();
    },
    [
      location.search,
      name,
      privacy,
      revalidator,
      selectedView,
      setIsListViewMode,
      setSelectedView,
      tableName,
      viewTableConf,
    ],
  );

  return (
    <DropdownMenuLabel className="flex flex-col min-h-[500px] p-8">
      <div>
        <h3 className="text-lg font-semibold">
          {isEdit() ? "Edit" : "Save New"} View
        </h3>
        <p className="mt-1 text-tertiary text-sm font-normal">
          The font size is relatively small, which may pose readability
          challenges for certain users.
        </p>
        <ValidatedForm
          validator={viewValidator}
          defaultValues={{
            name: "",
            privacy: privacyTypeMap.Public,
            sharedWith: [],
            entity: tableName as TableNameType,
          }}
        >
          <div className="mt-6">
            <ClearableInput
              name="name"
              label="Name"
              className="h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full mt-6">
            <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
              Accessibility
            </label>
            <Select
              name="privacy"
              defaultValue={
                isEdit() ? selectedView?.privacy : privacyTypeMap.Public
              }
              onValueChange={setPrivacy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={privacyTypeMap.Public}>
                  Public (default)
                </SelectItem>
                <SelectItem value={privacyTypeMap.Private}>Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ValidatedForm>
      </div>
      <div className="flex justify-between items-center pt-4 mt-auto">
        <Button
          variant="ghost"
          className="h-[48px] min-w-[160px] rounded-[40px]"
          onClick={() => {
            setIsListViewMode(true);
          }}
        >
          Cancel
        </Button>
        <div>
          {false && (
            <Button
              variant="ghost"
              className="h-[48px] min-w-[160px] rounded-[40px]"
              onClick={() => {
                setIsListViewMode(true);
              }}
            >
              Save
            </Button>
          )}
          <Button
            variant="primary"
            className="h-[48px] min-w-[160px] rounded-[40px]"
            type="button"
            onClick={saveHandler}
          >
            {true ? "Save" : "Save & Share"}
          </Button>
        </div>
      </div>
    </DropdownMenuLabel>
  );
};

export default View;
