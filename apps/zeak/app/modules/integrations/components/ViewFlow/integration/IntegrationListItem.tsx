import { Image } from "@zeak/ui";

export interface IIntegrationListItemRecord{
  id: string;
  logo: string;
  name: string;
  integrationCategory: string;
  lastUpdatedBy: string;
  updatedAt: string;
}

interface IntegrationListItemProps {
  record: IIntegrationListItemRecord;
  selectedId: string;
  onItemClicked: (record: IIntegrationListItemRecord) => void;
}

const IntegrationListItem = ({
  record,
  selectedId,
  onItemClicked,
}: IntegrationListItemProps) => {
  return (
    <div
      onClick={() => onItemClicked(record)}
      className={`px-4 py-3 mt-0.5 cursor-pointer hover:bg-accent-primary hover:rounded-zeak transition-all duration-200 group ${selectedId === record.id ? "bg-accent-primary hover:opacity-100 rounded-zeak" : "bg-white hover:opacity-80"}`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={record.logo}
          alt={record.name}
          className={`h-10 w-10 min-h-10 min-w-10 p-2 object-cover group-hover:bg-white rounded-full ${selectedId === record.id ? "bg-white" : "bg-[#00000010]"}`}
        />
        <div className="flex-1">
          <p className="flex justify-between items-center">
            <span
              className={`text-[14px] font-medium ${selectedId === record.id ? "text-white" : "text-secondary group-hover:text-white"}`}
            >
              {record.name}
            </span>
          </p>
          <p
            title="Integration Category"
            className={`text-[12px] uppercase ${selectedId === record.id ? "text-white opacity-60" : "text-secondary-tertiary group-hover:text-white group-hover:opacity-60"}`}
          >
            {record.integrationCategory}
          </p>
        </div>
      </div>
      <div className="mt-[14px]">
        <p className="grid grid-cols-[60%_40%] justify-between">
          <div className="flex gap-x-2 flex-nowrap">
            <span
              className={`text-sm whitespace-nowrap ${selectedId === record.id ? "text-white opacity-60" : "text-tertiary group-hover:text-white group-hover:opacity-60"}`}
            >
              Last updated
            </span>
            <span
              title="Last Updated By"
              className={`text-sm truncate max-w-[120px] block ${selectedId === record.id ? "text-white opacity-60" : "text-secondary group-hover:text-white group-hover:opacity-60"}`}
            >
              {record.lastUpdatedBy || "-"}
            </span>
          </div>
          <div className="flex flex-nowrap justify-end">
            <span
              className={`text-sm mx-2 ${selectedId === record.id ? "text-white" : "text-secondary group-hover:text-white"}`}
            >
              |
            </span>
            <span
              title="Last Updated On"
              className={`text-sm truncate ${selectedId === record.id ? "text-white opacity-60" : "text-secondary group-hover:text-white group-hover:opacity-60"}`}
            >
              {record.updatedAt
                ? new Date(record.updatedAt!).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default IntegrationListItem;
