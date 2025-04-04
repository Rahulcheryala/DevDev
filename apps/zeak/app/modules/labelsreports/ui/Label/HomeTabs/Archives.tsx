import type { TabPros } from "./types";
import LabelCard from "./LabelCard";

export default function Archives({ LRList }: TabPros) {
  return (
    <div className="flex flex-wrap mx-[-20px]">
      {LRList.map((label) => (
        <LabelCard key={label.id} labelnReports={label} />
      ))}
    </div>
  );
}
