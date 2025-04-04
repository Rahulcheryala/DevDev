import { useFetcher } from "@remix-run/react";
import LabelCard from "./LabelCard";
import type { LabelsReports } from "~/modules/labelsreports";
import { path } from "~/utils/path";
import { objectToFormData } from "~/utils/helper";

type TemplatePros = {
  LRList: Array<LabelsReports>;
  showAction?: boolean;
};

export default function Templates({ LRList, showAction = true }: TemplatePros) {
  const fetcher = useFetcher();
  const handleShowClick = (label: LabelsReports) => {
    const data = objectToFormData(label);
    fetcher.submit(data, {
      action: path.to.labelsreportsLabelNew,
      method: "POST",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 mt-1 -mx-5">
      {LRList.map((label) => {
        return (
          <LabelCard
            key={label.id}
            labelnReports={label}
            showDate={false}
            showStatus={false}
            onCardClick={() => handleShowClick(label)}
            allowedActions={
              showAction
                ? {
                    show: true,
                    handleShowClick: () => handleShowClick(label),
                    share: true,
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
