// apps/zeak/app/modules/workflows/ui/Workflows/HomeTabs/Automations/index.tsx
import WorkflowAutomationsTable from "./WorkflowAutomationsTable";

// Client-side component
export default function Automations(props: any) {
  console.log(props);

  return (
    <div>
      <WorkflowAutomationsTable
        data={props.props}
        count={props.props.length ?? 0}
      />
    </div>
  );
}
