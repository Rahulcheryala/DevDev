import { Status } from "@zeak/react";
import {
  ChevronDown,
  Crown,
  MoreVertical,
  Edit2,
  Phone,
  Mail,
  PencilLine,
} from "lucide-react";

interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface AddressCardProps {
  purpose: string;
  isDefault: boolean;
  address: Address;
  contacts: Contact[];
  isActive: string;
  onEdit: () => void;
}

function AddressCard({
  purpose,
  isDefault,
  address,
  contacts,
  isActive,
  onEdit,
}: AddressCardProps) {
  return (
    <div className="grid grid-cols-[1fr,1fr] overflow-hidden rounded-xl">
      {/* Left Section */}
      <div className="relative p-6 bg-[#DCE4F0]">
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-gray-600 text-2xl font-normal">{purpose}</h3>
          {!!isDefault && (
            <span className="bg-yellow-400 px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1">
              <Crown className="w-4 h-4" /> Primary
            </span>
          )}
        </div>

        <div className="absolute bottom-8 left-8 flex items-center justify-between w-[calc(100%-4rem)]">
          {isActive && (
            <Status
              color={!!isActive ? "green" : "red"}
              className="bg-white text-[#28CD41] rounded-xl"
            >
              {!!isActive ? "ACTIVE" : "INACTIVE"}
            </Status>
          )}
          <div className="flex items-center gap-4 ml-auto">
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
            >
              <PencilLine className="w-5 h-5 text-[#475467]" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-5 h-5 text-[#475467]" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="">
        <div className="p-6 bg-[#F7F7F8] space-y-6">
          <h4 className="text-gray-600 text-sm font-medium tracking-wide">
            ADDRESS
          </h4>
          <div className="space-y-1">
            {address.address1}
            <br />
            {address.city} {address.state ? ", " + address.state : ""}{" "}
            {address.postalCode ? ", " + address.postalCode : ""}
          </div>
        </div>

        <div className="p-6 bg-[#F8FAFC] space-y-6">
          <h4 className="text-gray-600 text-sm font-medium tracking-wide">
            CONTACT
          </h4>
          <div className="space-y-2">
            <p className="text-gray-900 text-lg font-medium">
              {contacts?.[0]?.name}
            </p>
            <div className="flex items-center text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#475467]" />
                <span>{contacts?.[0]?.email}</span>
              </div>
              <span className="text-gray-300 mx-3">|</span>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#475467]" />
                <span>{contacts?.[0]?.phone}</span>
              </div>
            </div>
          </div>
          <div>
            {contacts?.length > 1 && (
              <button className="flex items-center gap-1 text-blue-500 font-medium hover:text-blue-600 transition-colors">
                {contacts?.length - 1} MORE <ChevronDown className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
