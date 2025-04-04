import { Link } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { EditIcon, DotsHorizontalIcon } from "@zeak/icons"
import { ChevronDown, XIcon } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  onEdit?: () => void;
  onMore?: () => void;
  onClose?: () => void;
  showDropdown?: boolean;
}

export default function PageHeader({
  breadcrumbs,
  title,
  onEdit,
  onMore,
  onClose,
  showDropdown = true
}: PageHeaderProps) {
  return (
    <div className="bg-[#C6D2E7] px-6 pt-2 pb-6 rounded-t-[12px]">
      <div className="flex items-center justify-between mb-[38px]">
        <ul className="flex">
          {breadcrumbs.map((item, index) => (
            <li  className="flex items-center " key={index}>
              {item.to ? (
                <Link
                  to={item.to}
                  className="text-textLink text-sm leading-[20px] tracking-wider"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-accent text-sm leading-[20px] tracking-wider">
                  {item.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
                  <RxSlash />
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4">
          {onEdit && (
            <button className="h-[48px] flex items-center gap-3 p-3" onClick={onEdit}>
              <EditIcon /> 
              Edit
            </button>
          )}
          
          {onMore && (
            <button 
              onClick={onMore}
              className="flex items-center justify-between gap-2 p-3"
            >
              <DotsHorizontalIcon />
              More <ChevronDown />
            </button>
          )}

          {onClose && (
            <button onClick={onClose}>
              <XIcon />
            </button>
          )}
        </div>
      </div>

      {showDropdown && (
        <div>
          <div className="flex items-center gap-2">
            <div className="text-[36px]">
              {title}
            </div>
            <div>
              <ChevronDown />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
