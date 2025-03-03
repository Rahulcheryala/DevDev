// Label components relaated interfaces and types goes here.
import type { LabelsReports, labelViewMode } from "~/modules/labelsreports";

export type TabPros = {
  LRList: Array<LabelsReports>;
  viewMode?: labelViewMode;
};
