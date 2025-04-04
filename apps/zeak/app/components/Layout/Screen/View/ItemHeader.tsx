import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { BuildingIcon } from "@zeak/icons"
import { ChevronDown, ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import Image from "../../../Image";
import StatusPill from "./StatusPill";
import { motion } from 'framer-motion'

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
}

interface ItemHeaderProps {
  companyName: string;
  backUrl: string;
  selectedItem: ISelectedItem;
  breadcrumbs: IBreadcrumb[];
  actionPopover: React.ReactNode;
  onClose: () => void;
}

const ItemHeader: React.FC<ItemHeaderProps> = ({ companyName, backUrl, selectedItem, breadcrumbs, actionPopover, onClose }: ItemHeaderProps): JSX.Element => {
  const navigate = useNavigate();

  if (!selectedItem) return <></>;

  const handleBack = () => {
    if (typeof backUrl === 'string') {
      navigate(backUrl); // Navigate to the backUrl if it's a string
    } else {
      navigate(-1); // Go back one step in history if backUrl is not a string
    }
  };

  return (
    <motion.div
      initial={{ x: '-10%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >


      <div className="bg-[#E3E8EF] px-6 pt-2 pb-6 rounded-t-[12px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6 text-secondary-tertiary">
            <button title="Back" onClick={handleBack}>
            <ChevronLeft
              className="cursor-pointer"
            />
            </button>
            <ul className="flex">
              {breadcrumbs.map((item, index) => (
                <li className="flex items-center" key={index}>
                  {item.to ? (
                    <Link
                      title={`Navigate to ${item.label}`}
                      to={item.to}
                      className="text-textLink text-sm leading-[20px] tracking-wider"
                    >
                      {item.label}
                    </Link>
                  ) : <></>}
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
            <Popover>
              <PopoverTrigger className={`${selectedItem.isArchived ? 'cursor-not-allowed' : 'cursor-pointer'}`} asChild disabled={selectedItem.isArchived}>
                <button
                  className="flex items-center justify-between gap-1 py-3 px-6 text-secondary text-sm"
                >
                  Actions <ChevronDown className="text-secondary text-xl" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-0">
                {actionPopover}
              </PopoverContent>
            </Popover>
            <button
              title="Close"
              onClick={() => {
              onClose();
              handleBack();
            }}>
              <XIcon className="text-2xl text-secondary" />
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            <Image src={selectedItem.logo || ''} alt={selectedItem.name} className='min-h-[72px] min-w-[72px] h-[72px] w-[72px] rounded-full' />
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <p className="text-text-dark text-4xl ">{selectedItem.name}</p>
                <ChevronDown className="text-text-tertiary" />
                <div className="px-3 py-1 rounded-[12px] bg-white"><StatusPill status={selectedItem.status} /></div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <p className="flex items-center gap-2 ">
                  <span className="text-secondary-tertiary">CODE</span>
                  <span className="text-secondary">{selectedItem.code}</span>
                </p>
                <p className="flex items-center gap-2">
                  <BuildingIcon className="text-secondary-tertiary" />
                  <span className="text-secondary">{companyName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <BuildingIcon className="text-secondary-tertiary" />
                  <span className="text-secondary">{selectedItem.userCount || 0} Members</span>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center pr-3">
            <button
              title="Previous"
              className="px-1 py-1 rounded-l-md bg-white border-r-2 border-stroke-shade"
            ><ChevronLeft className="text-secondary text-xl" /></button>
            <div className="text-secondary-tertiary px-4 py-[6px] bg-white text-sm"><span className="text-accent-primary">5</span>/32</div>
            <button
              title="Next"
              className="px-1 py-1 rounded-r-md bg-white  border-l-2 border-stroke-shade"
            ><ChevronRight className="text-secondary text-xl" /></button>
          </div> */}
        </div>
      </div>
    </motion.div>
  )
}


export default ItemHeader;