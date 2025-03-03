import {
  Button,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useDisclosure,
} from "@zeak/react";
import * as Accordion from "@radix-ui/react-accordion";
import { useRevalidator } from "@remix-run/react";
import axios from "axios";
import { EditAltIcon, ShareIcon, TrashIcon } from "@zeak/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { LuChevronDown } from "react-icons/lu";
import { ConfirmDelete } from "~/components/Modals";
import { useUrlParams } from "~/hooks";
import type { Views } from "~/modules/view";
import { privacyTypeMap, useViews } from "~/modules/view";
import { useViewTableConfStore } from "~/stores";
import { path } from "~/utils/path";

interface ListViewProps {
  tableName: string;
  setIsListViewMode: React.Dispatch<React.SetStateAction<any>>;
  setIsUpsertMode: React.Dispatch<React.SetStateAction<any>>;
  selectView: Views | null;
  setSelectView: React.Dispatch<React.SetStateAction<Views | null>>;
}

const ListView = ({
  tableName,
  setIsListViewMode,
  setIsUpsertMode,
  selectView,
  setSelectView,
}: ListViewProps) => {
  const closeDepartmentModal = useDisclosure();
  const revalidator = useRevalidator();
  const [, setParams] = useUrlParams();

  const [, setAccessType] = useState("public");
  const [selectedView, setSelectedView] = useState<Views | null>(null);
  const [selectedViewToEditIndex, setSelectedViewToEditIndex] = useState<
    number | null
  >(null);
  const [, setIsDropdownOpen] = useState(false);
  const [hasUnmounted, setHasUnmounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setViewTableConf] = useViewTableConfStore();

  const { options: myView } = useViews(tableName, "my");
  const [views, setViews] = useState<Views[]>(myView);
  const { options: sharedWithMeViews } = useViews(tableName, "sharedWithMe");
  const { options: publicAndSharedWithMeViews } = useViews(tableName, "public");

  // Ref to store the latest selectedViewForEdit
  const selectedViewForEditRef = useRef<Views | null>(null);

  const handleDeleteClick = (view: Views) => {
    setSelectView(view);
    closeDepartmentModal.onOpen();
  };

  const handleCancelDelete = () => {
    setSelectView(null);
    closeDepartmentModal.onClose();
  };

  const handleViewPrivacyChange = useCallback(
    async (name: string, value: string, id: string) => {
      if (id) {
        try {
          setAccessType(value);
          const formData = new FormData();
          formData.append("id", id);
          formData.append(name, value);
          setIsSubmitting(true);

          await axios({
            method: "post",
            url: path.to.api.updateView(id),
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          revalidator.revalidate();
          setSelectedViewToEditIndex(null);
        } catch (error) {
          console.error("Error updating table view privacy:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [revalidator],
  );

  const navigateToCreateView = () => {
    setIsListViewMode(false);
    setIsUpsertMode(true);
    setSelectView(null);
  };

  const viewSelectedTableView = useCallback(
    async (view: Views) => {
      setSelectedView(null);
      if (view) {
        if (view.id === selectedView?.id) {
          setSelectedView(null);
          setViewTableConf({ colWidthInTableConf: {} });
          setParams({});
        } else {
          setSelectedView(view);
          setParams(view?.viewDetail?.params || ({} as any));
          setViewTableConf(
            view?.viewDetail?.[0]?.tableConf || { colWidthInTableConf: {} },
          );
        }
      }

      // selectedView?.id will become a circular reference if we add it to the dependency array
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [setParams, setViewTableConf, selectedView.id],
  );

  const handleConfirmDelete = async () => {
    if (selectView) {
      setIsSubmitting(true);
      try {
        await axios({
          method: "post",
          url: path.to.api.deleteView(selectView.id),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        revalidator.revalidate();
        closeDepartmentModal.onClose();
        setSelectView(null);
      } catch (error) {
        console.error("Error deleting table view:", error);
        // Optionally, display an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSelectedNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViews((prevState) =>
      prevState.map((item, index) =>
        index === selectedViewToEditIndex
          ? { ...item, name: e.target.value }
          : item,
      ),
    );
  };

  useEffect(() => {
    return () => {
      if (hasUnmounted && selectedViewForEditRef.current) {
        handleViewPrivacyChange(
          "name",
          selectedViewForEditRef.current.name,
          selectedViewForEditRef.current.id,
        );
      }
    };
  }, [handleViewPrivacyChange, hasUnmounted]);

  useEffect(() => {
    setViews(myView);
  }, [myView]);

  useEffect(() => {
    if (selectView) {
      const newlySavedView = views.find((view) => view.id === selectView.id);
      // setSelectedView(newlySavedView || null);
      // setParams(newlySavedView?.viewDetail?.params || {} as any);
      // setViewTableConf(newlySavedView?.viewDetail?.[0]?.tableConf || { colWidthInTableConf: {} });
      viewSelectedTableView(newlySavedView || null);
    }
  }, [selectView, viewSelectedTableView, views]);

  // Track component unmount
  useEffect(() => {
    if (typeof selectedViewToEditIndex === "number") {
      selectedViewForEditRef.current = views[selectedViewToEditIndex];
    } else {
      selectedViewForEditRef.current = null;
    }

    return () => {
      setHasUnmounted(true);
    };
  }, [views, selectedViewToEditIndex]);

  const handleSelectedPrivacyChange = (viewId: string) => (value: string) => {
    setViews((prevState) =>
      prevState.map((item) =>
        item.id === viewId ? { ...item, privacy: value } : item,
      ),
    );
    handleViewPrivacyChange("privacy", value, viewId);
  };

  return (
    <DropdownMenuLabel>
      <div>
        <Accordion.Root
          className="AccordionRoot"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <Accordion.Item
            className="AccordionItem border-b border-[#E9E9EE]"
            value="item-1"
          >
            <Accordion.Trigger className="w-full">
              <div className="flex items-center justify-between px-6 py-4 -mt-[6px] bg-accent-gray -mx-2">
                <p className="text-foreground text-base flex items-center font-normal tracking-[0.5px]">
                  My views
                  {isSubmitting && <span className="ring-loader ml-2"></span>}
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
            <Accordion.Content>
              {views.map((view, index) => (
                <div
                  key={view.id}
                  className={`group flex justify-between items-center px-6 pt-2 pb-3 -mx-2 hover:bg-accent-bgHoverNew ${
                    false ? "bg-accent-bgHoverNew" : ""
                  }`}
                >
                  <div className="truncate max-w-[284px] flex items-center">
                    <SelectedViewEyeButton
                      view={view}
                      viewSelectedTableView={viewSelectedTableView}
                      selectedView={selectedView}
                    />
                    <Input
                      size="sm"
                      className={`min-w-auto text-xs truncate font-normal border-0 ${
                        selectedViewToEditIndex === index ? "bg-white" : ""
                      }`}
                      value={view.name}
                      isDisabled={index !== selectedViewToEditIndex}
                      onChange={handleSelectedNameInput}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleViewPrivacyChange(
                            "name",
                            view.name ?? "",
                            view.id,
                          );
                        }
                      }}
                      disabled={index !== selectedViewToEditIndex}
                      noDisabledClass={true}
                    />
                    <Button
                      variant="ghost"
                      className="px-0 w-6 h-6 ms-2 hidden group-hover:flex"
                      type="button"
                      onClick={(e) => setSelectedViewToEditIndex(index)}
                    >
                      <EditAltIcon />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Select
                      defaultValue={view.privacy}
                      onValueChange={handleSelectedPrivacyChange(view.id)}
                    >
                      <SelectTrigger
                        style={
                          view.privacy === privacyTypeMap.Private
                            ? { color: "hsl(var(--accent-yellow))" }
                            : { color: "hsl(var(--accent-green))" }
                        }
                        className={`p-0 border-0 h-auto text-xs font-normal ${
                          view.privacy === privacyTypeMap.Private
                            ? "text-accentYellow"
                            : "text-accentGreen"
                        }`}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={privacyTypeMap.Private}>
                          Private
                        </SelectItem>
                        <SelectItem value={privacyTypeMap.Public}>
                          Public
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center ml-5">
                      <Button
                        variant="ghost"
                        className="px-0 w-6 h-6 ml-1"
                        onClick={() => {
                          setIsListViewMode(false);
                          setIsUpsertMode(false);
                          setSelectView(view);
                        }}
                      >
                        <ShareIcon color="hsl(var(--tertiary))" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-0 w-6 h-6 ml-1"
                        onClick={() => handleDeleteClick(view)}
                      >
                        <TrashIcon color="hsl(var(--tertiary))" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item className="AccordionItem" value="item-2">
            <Accordion.Trigger className="w-full">
              <div className="flex items-center justify-between px-6 py-4 -mt-[6px] bg-accent-gray -mx-2">
                <p className="text-foreground text-base font-normal tracking-[0.5px]">
                  Public
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
            <Accordion.Content>
              {sharedWithMeViews.length > 0 && (
                <>
                  <div className="flex items-center justify-between px-6 py-4 -mx-2">
                    <p className="text-foreground whitespace-nowrap text-base font-normal tracking-[0.5px]">
                      Shared with Me
                    </p>
                    <hr className="ml-4 h-[1px] w-full bg-accent-gray" />
                  </div>
                  {sharedWithMeViews.map((view) => (
                    <PublicListContent
                      key={view.id}
                      view={view}
                      viewSelectedTableView={viewSelectedTableView}
                      selectedView={selectedView}
                    />
                  ))}
                </>
              )}
              {publicAndSharedWithMeViews.length > 0 && (
                <>
                  <div className="flex items-center justify-between px-6 py-4 -mx-2">
                    <p className="text-foreground whitespace-nowrap text-base font-normal tracking-[0.5px]">
                      All
                    </p>
                    <hr className="ml-4 h-[1px] w-full bg-accent-gray" />
                  </div>
                  {publicAndSharedWithMeViews.map((view) => (
                    <PublicListContent
                      key={view.id}
                      view={view}
                      viewSelectedTableView={viewSelectedTableView}
                      selectedView={selectedView}
                    />
                  ))}
                </>
              )}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <DropdownMenuSeparator className="-mx-2 my-0" />
        <div className="flex justify-end px-6 py-4">
          <Button
            variant="primary"
            disabled={isSubmitting}
            className="h-[48px] min-w-[160px] rounded-[40px]"
            onClick={() => {
              setIsDropdownOpen(false);
              if (typeof selectedViewToEditIndex === "number") {
                handleViewPrivacyChange(
                  "name",
                  views[selectedViewToEditIndex].name,
                  views[selectedViewToEditIndex].id,
                );
              } else {
                navigateToCreateView();
              }
            }}
          >
            {typeof selectedViewToEditIndex === "number" ? "Update" : "Save"}
          </Button>
          {/* <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="primary"
                className="py-[10px] px-4 text-sm h-10 rounded-tr-[40px] rounded-br-[40px] rounded-tl-none rounded-bl-none"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {isDropdownOpen ? <LuChevronUp /> : <LuChevronDown />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[128px]">
              <DropdownMenuLabel
                className="font-normal hover:bg-accent-bgHoverNew"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigateToCreateView();
                }}
              >
                Save
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="font-normal hover:bg-accent-bgHoverNew"
                onClick={() => {
                  handleViewPrivacyChange(
                    "name",
                    selectedViewForEdit.name,
                    selectedViewForEdit
                  );
                  setIsDropdownOpen(false);
                }}
              >
                Update
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      {selectView && (
        <ConfirmDelete
          hasAction={false}
          isOpen={closeDepartmentModal.isOpen}
          name={selectView.name!}
          text={`Are you sure you want to permanently remove ${selectView.name!} from the Labels and Forms?`}
          onCancel={handleCancelDelete}
          onSubmit={handleConfirmDelete}
        />
      )}
    </DropdownMenuLabel>
  );
};

export default ListView;

const PublicListContent = ({
  view,
  viewSelectedTableView,
  selectedView,
}: {
  view: Views;
  viewSelectedTableView: (view: Views) => Promise<void>;
  selectedView: any;
}) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 -mx-2 hover:bg-accent-bgHoverNew">
      <div className="truncate flex items-center">
        <SelectedViewEyeButton
          view={view}
          viewSelectedTableView={viewSelectedTableView}
          selectedView={selectedView}
        />
        <p className="text-xs truncate font-normal">{view.name}</p>
      </div>
    </div>
  );
};

const SelectedViewEyeButton = ({
  view,
  viewSelectedTableView,
  selectedView,
}: {
  view: Views;
  viewSelectedTableView: (view: Views) => Promise<void>;
  selectedView: any;
}) => {
  return (
    <Button
      variant="ghost"
      className="px-0 w-6 h-6 mr-4"
      onClick={() => viewSelectedTableView(view)}
    >
      {selectedView?.id === view?.id ? (
        <BsEye size={16} />
      ) : (
        <BsEyeSlash size={16} className="text-tertiary" />
      )}
    </Button>
  );
};
