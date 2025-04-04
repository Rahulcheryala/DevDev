import {
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuTrigger,
  IconButton,
  DropdownMenuContent,
  DropdownMenuItem,
  Tags,
} from "@zeak/react";
import { BiTrashAlt } from "react-icons/bi";
import { BsFillHeartFill, BsShare, BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import moment from "moment";
import type { LabelsReports } from "~/modules/labelsreports";
import { labelStatusColorMap } from "~/modules/labelsreports";
import { useState } from "react";
import { ConfirmDelete } from "../../../../../components/Modals";
import { path } from "~/utils/path";
import { useFetcher } from "@remix-run/react";

type PropTypes = {
  labelnReports: LabelsReports;
  isFavorite?: boolean;
  allowedActions?: {
    edit?: boolean;
    handleEditClick?: any;
    show?: boolean;
    handleShowClick?: any;
    share?: boolean;
    handleShareClick?: any;
    delete?: boolean;
    handleDeleteClick?: any;
  };
  showDate?: boolean;
  showStatus?: boolean;
  onCardClick?: any;
};

export default function LabelCard({
  labelnReports,
  isFavorite = false,
  allowedActions,
  showDate = true,
  showStatus = true,
  onCardClick,
}: PropTypes) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const {
    width,
    height,
    size,
    name,
    status,
    createdOn,
    modifiedOn,
    id,
    labelType,
    previewSignedUrl,
  } = labelnReports;

  const dateString = moment(modifiedOn || createdOn).format("DD MMMM, YYYY");
  const statusString = status ? status : null;
  const fetcher = useFetcher();

  const handleDelete = () => {
    setShowConfirmationModal(true);
    if (allowedActions?.handleDeleteClick) {
      allowedActions.handleDeleteClick();
    }
  };

  return (
    <>
      <div className="px-5 pt-5" onClick={onCardClick}>
        <Card className="border-stroke hover:border-accent-blue shadow-none rounded-xl hover:shadow-3xl cursor-pointer">
          <CardContent className="p-0">
            <div className="w-full h-[186px] bg-white border-b border-stroke flex items-center justify-center py-[34px] px-[24px] rounded-tl-xl rounded-tr-xl relative">
              {isFavorite ? (
                <IconButton
                  aria-label={"Favorite"}
                  icon={<BsFillHeartFill color="#FF7875" />}
                  variant={"ghost"}
                  className="absolute top-[12px] right-[12px]"
                />
              ) : (
                allowedActions && (
                  <div className="absolute top-[12px] right-[12px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconButton
                          aria-label="Favorite"
                          variant={"ghost"}
                          icon={<BsThreeDotsVertical />}
                          className=" rounded-full focus-visible:ring-offset-0 focus-visible:shadow-none focus-visible:ring-0 text-secondary hover:text-secondary hover:bg-dropdownHoverBg data-[state=open]:bg-dropdownHoverBg"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {allowedActions?.edit && (
                          <DropdownMenuItem
                            className="hover:bg-dropdownHoverBg"
                            onClick={allowedActions.handleEditClick}
                          >
                            <div className="flex items-center gap-2">
                              <CiEdit size={20} />
                              <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
                                Edit
                              </span>
                            </div>
                          </DropdownMenuItem>
                        )}
                        {allowedActions?.show && (
                          <DropdownMenuItem
                            className="hover:bg-dropdownHoverBg"
                            onClick={allowedActions.handleShowClick}
                          >
                            <div className="flex items-center gap-2">
                              <CiEdit size={20} />
                              <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
                                Use this template
                              </span>
                            </div>
                          </DropdownMenuItem>
                        )}
                        {allowedActions?.delete && (
                          <DropdownMenuItem
                            className="hover:bg-dropdownHoverBg"
                            onClick={handleDelete}
                          >
                            <div className="flex items-center gap-2">
                              <BiTrashAlt size={20} />
                              <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
                                Delete
                              </span>
                            </div>
                          </DropdownMenuItem>
                        )}
                        {allowedActions?.share && (
                          <DropdownMenuItem
                            className="hover:bg-dropdownHoverBg"
                            onClick={allowedActions.handleShareClick}
                          >
                            <div className="flex items-center gap-2">
                              <BsShare size={16} />
                              <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
                                Share
                              </span>
                            </div>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              )}

              <img
                src={previewSignedUrl}
                alt="label preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-[24px]">
              <span className="text-sm tracking-wider leading-[20px] block font-light text-secondary mb-[8px]">
                {labelType && (
                  <>
                    <span className="text-[#DC0073] inline-block">
                      {labelType}
                    </span>{" "}
                    |{" "}
                  </>
                )}
                <span>
                  {width} x {height} {size}
                </span>
              </span>
              <h3 className="text-primary font-medium text-sm tracking-wider truncate">
                {name}
              </h3>
              {(showStatus || showDate) && (
                <div className="flex items-center justify-between mt-[8px]">
                  {showDate && (
                    <p className="text-[#8A8A8F] text-[12px] leading-[16px] tracking-wider">
                      {dateString}
                    </p>
                  )}

                  {showStatus && statusString && (
                    <Tags variant={labelStatusColorMap[status]}>
                      {statusString}
                    </Tags>
                  )}
                </div>
              )}

              {/* <div className="flex items-center justify-between mt-[8px]">
              <p className="text-accent text-[12px] leading-[16px] tracking-wider mt-[2px]">
                {width} x {height} {size}
              </p>
              {statusString && <Tags variant="default">{statusString}</Tags>}
            </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
      {name && (
        <ConfirmDelete
          hasAction={false}
          isOpen={showConfirmationModal}
          name={name}
          text={`Are you sure you want to permanently delete ${name}?`}
          onCancel={() => {
            setShowConfirmationModal(false);
          }}
          onSubmit={() => {
            const formData = new FormData();
            formData.append("ids", id);
            fetcher.submit(formData, {
              method: "POST",
              action: path.to.labelsreportsLabelDelete,
            });
            setShowConfirmationModal(false);
          }}
        />
      )}
    </>
  );
}
