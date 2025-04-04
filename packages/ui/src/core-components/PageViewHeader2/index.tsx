import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { ChevronDown, ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import Image from "../../micro-components/Image";
import { motion } from "framer-motion";
import Popup, { ActionButtonProps } from "../Popup";
import StatusPill from "../StatusPill";
import { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
/**
 * ItemHeader Component
 *
 * This component displays the header for a view item, including navigation breadcrumbs,
 * actions, and item details.
 *
 * How to use:
 *
 * ```jsx
 * <ItemHeader
 *   companyName="Your Company Name"
 *   selectedItem={{ name: "Item Name", logo: "logo_url", status: "active", code: "ITEM123", userCount: 10 }}
 *   breadcrumbs={[{ label: "Home", to: "/" }, { label: "Items", to: "/items" }]}
 *   actionPopover={<YourActionPopoverComponent />}
 *   onClose={() => console.log("Closed")}
 * />
 * ```
 */

interface IBreadcrumb {
  label: string;
  to?: string;
}

export type ISelectedItem = {
  name: string;
  logo?: string;
  status: string;
  code: string;
  userCount?: number;
  isArchived?: boolean;
};

interface ItemHeaderProps {
  backUrl: string;
  breadcrumbs: IBreadcrumb[];
  isEditable?: boolean;
  isEditing?: boolean;
  actionButtons: ActionButtonProps[];
  onClose: () => void;
  onEdit?: () => void;
  isSaveVisible?: boolean;
  onSave?: () => void;
  showImage?: boolean;
  selectedItem: ISelectedItem;
  subHeader: React.ReactNode;
}

const PageViewHeader2: React.FC<ItemHeaderProps> = ({
  backUrl,
  breadcrumbs,
  isEditable,
  isEditing: isEditingProp,
  actionButtons,
  onClose,
  onEdit,
  isSaveVisible,
  onSave,
  showImage = true,
  selectedItem,
  subHeader,
}: ItemHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(isEditingProp || false);

  if (!selectedItem) return <></>;

  useEffect(() => {
    setIsEditing(isEditingProp);
  }, [isEditingProp]);

  const EditClickHandler = () => {
    setIsEditing(!isEditing);
    onEdit && onEdit();
  };

  const handleBack = () => {
    if (typeof backUrl === "string") {
      navigate(backUrl); // Navigate to the backUrl if it's a string
    } else {
      navigate(-1); // Go back one step in history if backUrl is not a string
    }
  };

  return (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="bg-[#E3E8EF] px-6 pt-2 pb-6 rounded-t-[12px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6 text-secondary-tertiary">
            <button title="Back" onClick={handleBack}>
              <ChevronLeft className="cursor-pointer" />
            </button>
            <ul className="flex">
              {breadcrumbs.map((item, index) => (
                <li className="flex items-center" key={index}>
                  {item.to && (
                    <Link
                      title={`Navigate to ${item.label}`}
                      to={item.to}
                      className="text-textLink text-sm leading-[20px] tracking-wider"
                    >
                      {item.label}
                    </Link>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
                      <RxSlash />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <button
              title={isEditing ? "View" : "Edit"}
              className="flex items-center gap-2 py-2 px-6 text-sm disabled:opacity-50 disabled:cursor-default"
              onClick={EditClickHandler}
              disabled={!isEditable}
            >
              {isEditing ? (
                <>
                  <FaRegEye className="text-xl text-textLink" />
                  <span className="text-secondary">View</span>
                </>
              ) : (
                <>
                  <BiEditAlt className="text-xl text-textLink" />
                  <span className="text-secondary">Edit</span>
                </>
              )}
            </button>
            <Popup
              trigger={
                <button className="flex items-center justify-between gap-1 py-3 px-2 text-secondary text-sm">
                  Actions <ChevronDown className="text-secondary text-xl" />
                </button>
              }
              buttons={actionButtons}
              align="end"
              disabled={selectedItem?.isArchived}
            />
            {isSaveVisible && (
              <button
                className="flex items-center justify-center gap-2 py-3 px-5 text-secondary text-sm bg-[#1677FF] rounded-md"
                onClick={onSave}
              >
                <LiaSave className="text-white" size={20} />
                <span className="text-white">Save</span>
              </button>
            )}
            <button onClick={onClose}>
              <XIcon className="ml-2 text-2xl text-secondary" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-6 items-center">
            {showImage && (
              <Image
                src={selectedItem.logo}
                alt={selectedItem.name}
                className="min-h-[72px] min-w-[72px] h-[72px] w-[72px] p-3.5 bg-white rounded-full text-xl"
              />
            )}
            <div className="flex flex-col justify-between h-[72px]">
              <div className="flex gap-4 items-center">
                <p className="text-text-dark text-4xl max-w-[450px] truncate">
                  {selectedItem.name}
                </p>
                <ChevronDown className="text-text-tertiary" />
                <div className="px-3 py-1 rounded-zeak bg-white flex items-center">
                  <StatusPill status={selectedItem.status} uppercase={true} />
                </div>
              </div>
              {subHeader}
            </div>
          </div>
          <div className="flex items-center">
            <button
              // TODO(vamsi): Add previous and next buttons functionality
              title="Previous"
              className="px-1 py-1 rounded-l-md bg-white border-r-2 border-stroke-shade"
            >
              <ChevronLeft className="text-secondary text-xl" />
            </button>
            <div className="text-secondary-tertiary px-4 py-[6px] bg-white text-sm">
              <span className="text-accent-primary">5</span>/32
            </div>
            <button
              title="Next"
              className="px-1 py-1 rounded-r-md bg-white  border-l-2 border-stroke-shade"
            >
              <ChevronRight className="text-secondary text-xl" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageViewHeader2;
