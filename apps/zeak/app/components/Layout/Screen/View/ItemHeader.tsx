import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { BuildingIcon } from "@zeak/icons"
import { ChevronDown, ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { BiEditAlt } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import Image from "../../../Image";
import StatusPill from "./StatusPill";
import { LuPlug2 } from "react-icons/lu";
import { motion } from 'framer-motion'
import TypePill from "./TypePill";
// import Zeak from "../../../../../public/zeak.svg";
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
  // for integrations
  integrationCategory?: string;
  connectionType?: string;
  integrationType?: string;
  // for connections
  integrationName?: string;
  application?: string;
}

interface ItemHeaderProps {
  companyName?: string;
  backUrl: string;
  selectedItem: ISelectedItem;
  breadcrumbs: IBreadcrumb[];
  actionPopover: React.ReactNode;
  onClose: () => void;
  onEdit?: () => void;
  component?: string;
  type?: string;
}

const ItemHeader: React.FC<ItemHeaderProps> = ({ companyName, backUrl, selectedItem, breadcrumbs, actionPopover, onClose, onEdit, component, type }: ItemHeaderProps): JSX.Element => {
  const navigate = useNavigate();

  if (!selectedItem) return <></>;

  const SubHeader = () => {
    switch(component){
      case 'integration':
        return (
          <div className="flex items-center gap-8 text-sm">
            <p className="flex items-center gap-2 ">
              <span className="text-secondary-tertiary">CATEGORY</span>
              <span className="text-secondary uppercase font-semibold">{selectedItem.integrationCategory}</span>
            </p>
            <p className="flex items-center gap-2">
              <LuPlug2 className="text-secondary-tertiary" size={18} />
              <span className="text-secondary uppercase font-semibold">{selectedItem.connectionType}</span>
            </p>
            <p className="flex items-center gap-2">
              <TypePill type={selectedItem.integrationType!} className="uppercase" />
            </p>
          </div>
        )
      case 'connection':
        return (
          <div className="flex items-center gap-8 text-sm">
            <p className="flex items-center gap-2 ">
              <span className="text-secondary-tertiary">INTEGRATION</span>
              <img src="/zeak.svg" alt="Zeak Logo" className="w-10 h-w-10 -mx-2" />
              <span className="text-secondary font-medium uppercase">{selectedItem.integrationName}</span>
            </p>
            <p className="flex items-center gap-2 ">
              <span className="text-secondary-tertiary">APPLICATION</span>
              <Image src={selectedItem.logo} alt={selectedItem.name} className='min-h-[20px] min-w-[20px] h-[20px] w-[20px] rounded-full text-xs' />
              <span className="text-secondary font-medium uppercase">{selectedItem.application}</span>
            </p>
          </div>
        )
      default:
        return (
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
        )
    }
  }

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
          <button
              title="Edit"
              className="flex items-center gap-2 py-2 px-6 text-sm disabled:opacity-50 disabled:cursor-default"
              onClick={onEdit}
              disabled={type === 'System'}
              >
              <BiEditAlt className="text-xl text-textLink" />
              <span className="text-secondary">Edit</span>
            </button>
            <Popover>
              <PopoverTrigger className={`${selectedItem.isArchived ? 'cursor-not-allowed' : 'cursor-pointer'}`} asChild disabled={selectedItem.isArchived}>
                <button
                  className="flex items-center justify-between gap-1 py-3 px-2 text-secondary text-sm"
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
        <div className="flex justify-between items-end">
          <div className="flex gap-6 items-center">
            {component !== "connection" && (
              <Image src={selectedItem.logo} alt={selectedItem.name} className='min-h-[72px] min-w-[72px] h-[72px] w-[72px] p-3.5 bg-white rounded-full' />
            )}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <p className="text-text-dark text-4xl max-w-[450px] truncate">{selectedItem.name}</p>
                <ChevronDown className="text-text-tertiary" />
                <div className="px-3 py-1 rounded-[12px] bg-white">
                  <StatusPill status={selectedItem.status} />
                </div>
              </div>
              <SubHeader />
            </div>
          </div>
          <div className="flex items-center">
            <button
              // TODO(vamsi): Add previous and next buttons functionality
              title="Previous"
              className="px-1 py-1 rounded-l-md bg-white border-r-2 border-stroke-shade"
            ><ChevronLeft className="text-secondary text-xl" /></button>
            <div className="text-secondary-tertiary px-4 py-[6px] bg-white text-sm"><span className="text-accent-primary">5</span>/32</div>
            <button
              title="Next"
              className="px-1 py-1 rounded-r-md bg-white  border-l-2 border-stroke-shade"
            ><ChevronRight className="text-secondary text-xl" /></button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


export default ItemHeader;