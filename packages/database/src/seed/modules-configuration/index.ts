import { table } from "console";
import { fontsList } from "./fonts";
import { labelsreports } from "./labels-reports";
import { sidebar } from "./sidebar";

const moduleConfiguration = {
  sidebar,
  labelsreports,
  table,
  fonts: fontsList,
};

export { moduleConfiguration };
