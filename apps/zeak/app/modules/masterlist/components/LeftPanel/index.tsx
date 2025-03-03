
import FilterOptions from "./FilterOptions";
import LeftPanelHeader from "./LeftPanelHeader";
import ListCard from "./ListCard";
import CreateMasterList from "../CreateMasterList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ListView from "./ListView";


export default function LeftPanel({ userId }: { userId: string }) {

  return (
    <div className="space-y-1 ">
      <FilterOptions />
      <LeftPanelHeader />
      <ListView />
      <CreateMasterList userId={userId} />
    </div>
  );
}
