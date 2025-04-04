import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase";

const supabase = getSupabaseServiceRole()

// Define the structure of our data
interface InsertData {
  workflowId: number;
  headerId: number;
  lineId: number;
  line: object | string; // Can be JSON object or string
  header: object | string; // Can be JSON object or string
  companyId: string;
  createdBy: string;
  createdAt?: string;
  modifiedBy: string;
  modifiedOn?: string;
  deletedBy: string | null;
  deletedOn?: string | null;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return json(
        { error: "Invalid content type. Expected JSON" },
        { status: 400 },
      );
    }

    const requestData: Partial<InsertData> = await request.json();

    // Validate that all required fields are present
    const requiredFields: (keyof InsertData)[] = [
      "workflowId",
      "headerId",
      "lineId",
      "line",
      "header",
      "companyId",
      "createdBy",
      "modifiedBy",
      "deletedBy",
    ];

    for (const field of requiredFields) {
      if (!(field in requestData)) {
        return json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Convert line and header to text if they are objects
    const dataToInsert = {
      ...requestData,
      line:
        typeof requestData.line === "object"
          ? JSON.stringify(requestData.line)
          : requestData.line,
      header:
        typeof requestData.header === "object"
          ? JSON.stringify(requestData.header)
          : requestData.header,
    };
    const { data, error } = await supabase
      .from("triggerDataAlreadyProcessedRows")
      .insert({
        companyId: dataToInsert.companyId as string,
        createdBy: dataToInsert.createdBy as string,
        line: dataToInsert.line,
        header: dataToInsert.header,
        workflowId: dataToInsert.workflowId,
        headerId: dataToInsert.headerId,
        lineId: dataToInsert.lineId,
        modifiedBy: dataToInsert.modifiedBy,
        modifiedOn: dataToInsert.modifiedOn,
        deletedBy: dataToInsert.deletedBy,
        deletedOn: dataToInsert.deletedOn,
        createdAt: dataToInsert.createdAt
      });

    if (error) throw error;

    return json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Failed to insert data" }, { status: 500 });
  }
}

export function loader({ request }: LoaderFunctionArgs) {
  return json({ error: "Method not allowed" }, { status: 405 });
}
