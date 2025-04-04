import { useNavigate } from "@remix-run/react";
import LabelCard from "./LabelCard";
import type { TabPros } from "./types";
import { path } from "~/utils/path";

export default function MyProjects({ LRList }: TabPros) {
  const navigate = useNavigate();
  const handleEditClick = (id: string) => {
    navigate(path.to.labelsreportsLabelView(id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 mt-1 -mx-5">
      {LRList.map((label) => (
        <LabelCard
          key={label.id}
          labelnReports={label}
          onCardClick={() => handleEditClick(label.id)}
          allowedActions={{
            edit: true,
            handleEditClick: () => handleEditClick(label.id),
            delete: true,
          }}
        />
      ))}
    </div>
  );
}
