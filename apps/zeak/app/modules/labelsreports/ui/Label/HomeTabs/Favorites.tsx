import type { TabPros } from "./types";
import LabelCard from "./LabelCard";

export default function Favorites({ LRList }: TabPros) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 mt-1 -mx-5">
      {LRList.map((label) => (
        <LabelCard key={label.id} labelnReports={label} isFavorite={true} />
      ))}
    </div>
  );
}
