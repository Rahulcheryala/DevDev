import { Avatar, Button, DropdownMenuLabel, toast } from "@zeak/react";
import { useRevalidator } from "@remix-run/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import UserMultiSelectSearchInputProps from "~/modules/shared/ui/View";
import type { Views } from "~/modules/view";
import { path } from "~/utils/path";
import { useUser } from "~/hooks";

interface ShareViewProps {
  tableName: string;
  selectedView: Views | null;
  setIsListViewMode: React.Dispatch<React.SetStateAction<any>>;
  setIsUpsertMode: React.Dispatch<React.SetStateAction<any>>;
  setSelectedView: React.Dispatch<any>;
}

const ShareView = ({
  setIsListViewMode,
  setIsUpsertMode,
  selectedView,
  setSelectedView,
}: ShareViewProps) => {
  const user = useUser();
  const revalidator = useRevalidator();
  const [hasUnmounted, setHasUnmounted] = useState(false);
  const [existingMembers, setExistingMember] = useState<any[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<any[]>([]);

  const getSelectedViewData = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: path.to.api.getViewById(selectedView.id),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setExistingMember(response.data.sharedWith || []);
      setSelectedMemberIds(
        response.data.sharedWith.map((member: any) => member.id),
      );
    } catch (error) {
      console.error("Error fetching table view data", error);
    }
  }, [selectedView]);

  const saveHandler = useCallback(async () => {
    const formData = new FormData();
    formData.append("sharedWith", JSON.stringify(selectedMemberIds));

    try {
      if (selectedView && selectedView.id) {
        // Edit mode
        formData.append("id", selectedView.id);
        await axios({
          method: "post",
          url: path.to.api.updateView(selectedView.id),
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      getSelectedViewData();
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to save view");
    }
  }, [selectedMemberIds, selectedView, getSelectedViewData, revalidator]);

  useEffect(() => {
    getSelectedViewData();

    // Cleanup function to be executed on unmount
    return () => {
      if (hasUnmounted) {
        setIsListViewMode(true);
        setIsUpsertMode(false);
        setSelectedView(null);
      } else {
        setHasUnmounted(true);
      }
    };
  }, [
    getSelectedViewData,
    hasUnmounted,
    setIsListViewMode,
    setIsUpsertMode,
    setSelectedView,
  ]);

  return (
    <DropdownMenuLabel className="flex flex-col min-h-[500px] px-8 py-8 pb-4">
      <div>
        <h3 className="text-lg font-semibold">Share New View</h3>
        <p className="mt-1 text-tertiary text-sm font-normal">
          The font size is relatively small, which may pose readability
          challenges for certain users.
        </p>
        {/* <ValidatedForm validator={[]} defaultValues={{}}>
          <div className="mt-6 flex items-end">
            <ClearableInput name="Share" className="h-10" />
            <Button variant={"primary"} className="ml-4 h-[56px] min-w-[75px]">
              Invite
            </Button>
          </div>
        </ValidatedForm> */}
        <div className="flex justify-between align-center gap-5 mt-6">
          <UserMultiSelectSearchInputProps
            existingMembers={selectedMemberIds}
            onChange={(value: any) => {
              setSelectedMemberIds([...value]);
            }}
          />
          <Button
            variant={"primary"}
            className="h-[56px] min-w-[100px]"
            type="button"
            onClick={saveHandler}
          >
            Share
          </Button>
        </div>
        {existingMembers.length ? (
          <div className="pt-6">
            <h3 className="text-sm font-normal mb-1">People with access</h3>
            <div className="max-h-[250px] overflow-y-auto">
              {existingMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center my-1 py-[6px]"
                >
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        size="sm"
                        name={member.avatarUrl || member.fullName}
                      />
                    </div>
                    <div className="pl-2">
                      <h3 className="text-sm font-normal text-accent">
                        {member.fullName} {member.id === user.id ? "(me)" : ""}
                      </h3>
                      <p className="text-tertiary text-xs mt-1 font-normal">
                        {member.employeeType?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-normal ml-3 text-right">Owner</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex justify-between items-center pt-4 mt-auto">
        <Button
          variant="ghost"
          className="h-[48px] min-w-[160px] rounded-[40px] text-accent"
          onClick={() => {
            setIsListViewMode(false);
            setIsListViewMode(true);
          }}
        >
          <span className="ml-2">Back</span>
        </Button>
        <Button
          variant="primary"
          className="h-[48px] min-w-[160px] rounded-[40px]"
          onClick={() => {
            setIsUpsertMode(false);
            setIsListViewMode(true);
            setSelectedView(null);
          }}
        >
          Done
        </Button>
      </div>
    </DropdownMenuLabel>
  );
};

export default ShareView;
