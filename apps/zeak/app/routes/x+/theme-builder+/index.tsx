import { json } from "@remix-run/node";
import { LeftPanel, Buttons, Inputs, useThemeBuilderStore, DataTableTheme, Badges } from "~/modules/theme-builder";


export const loader = async () => {
  return json({});
};

export default function ThemeBuilderRoute() {
  const {component} = useThemeBuilderStore()
  return (
    <div className="flex flex-row ">
      <LeftPanel />
      {component === "buttons" && <Buttons />}
      {component === "inputs" && <Inputs />}
      {component === "datatable" && <DataTableTheme />}
      {component === "badges" && <Badges />}
    </div>
  );
}
