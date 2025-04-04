import { triggerClient } from "~/lib/trigger.server";
import { intervalTrigger } from "@trigger.dev/sdk";
import { Resend } from "@trigger.dev/resend";
import axios from "axios";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_ROLE,
);

const resend = new Resend({
  id: "resend",
  apiKey: process.env.RESEND_API_KEY!,
});

type Workflow = {
  id: number;
  workflow_json: { rules: Rule[] }; // Assuming the JSON is directly parsed as an object
  category: string;
};

type Condition = {
  id: string;
  operator_id: string;
  value: any;
};

type ConditionGroup = {
  logic: "AND" | "OR";
  conditions: (Condition | ConditionGroup)[];
};

type Event = {
  id: string;
  data: {
    message: string;
  };
};

type Rule = {
  id: string;
  description: string;
  when: {
    id: string;
    condition_group: ConditionGroup;
  };
  event: Event[];
  exception: {
    id: string;
    condition_group: ConditionGroup;
    event: Event[];
  };
};

// Sample JSON Rules data
// const rulesData: { rules: Rule[] } = {
//   "rules": [
//     {
//       "id": "1",
//       "description": "Check conditions and trigger events accordingly, with exception handling.",
//       "when": {
//         "id": "1",
//         "condition_group": {
//           "logic": "AND",
//           "conditions": [
//             {
//               "id": "2",
//               "operator_id": "2",
//               "value": {
//                 "column_name": "DeliveryAddressZipCode",
//                 "comparision_value": "12345"
//               }
//             },
//             {
//               "logic": "OR",
//               "conditions": [
//                 {
//                   "id": "2",
//                   "operator_id": "2",
//                   "value": {
//                     "column_name": "SalesOrderLineStatus",
//                     "comparision_value": "Invoiced"
//                   }
//                 },
//                 {
//                   "id": "2",
//                   "operator_id": "2",
//                   "value": {
//                     "column_name": "SalesOrderLineStatus",
//                     "comparision_value": "Backorder"
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       },
//       "event": [
//         {
//           "id": "1",
//           "data": {
//             "message": "Sales order line is added"
//           }
//         },
//         {
//           "id": "2",
//           "data": {
//             "message": "Sales order line is added"
//           }
//         }
//       ],
//       "exception": {
//         "id": "exception1",
//         "condition_group": {
//           "logic": "OR",
//           "conditions": [
//           ]
//         },
//         "event": [{
//           "id": "1",
//           "data": {
//             "message": "API call or network issue occurred, triggering fallback."
//           }
//         }]
//       }
//     }
//   ]
// };

// Operator functions
const operators = {
  "1": (a: any, b: any) => a > b, // greater_than
  "2": (a: any, b: any) => a === b, // equal_to
};

// Evaluate a single condition
function evaluateCondition(condition: Condition, data: any): boolean {
  const { column_name, comparision_value } = condition.value;
  const actualValue = data[column_name];
  if (!actualValue) {
    console.log(`No data found for column: ${column_name}`);
    return false;
  }
  const operatorFunction =
    operators[condition.operator_id as keyof typeof operators];
  if (!operatorFunction) {
    console.log(`No operator found with id: ${condition.operator_id}`);
    return false;
  }
  return operatorFunction(actualValue, comparision_value);
}

// Evaluate a group of conditions based on the logic (AND / OR)
function evaluateConditionGroup(group: ConditionGroup, data: any): boolean {
  if (group.conditions.length === 0) {
    return true;
  }
  if (group.logic === "AND") {
    return group.conditions.every((cond) =>
      "conditions" in cond
        ? evaluateConditionGroup(cond as ConditionGroup, data)
        : evaluateCondition(cond as Condition, data),
    );
  } else {
    // group.logic === "OR"
    return group.conditions.some((cond) =>
      "conditions" in cond
        ? evaluateConditionGroup(cond as ConditionGroup, data)
        : evaluateCondition(cond as Condition, data),
    );
  }
}

// Process each rule
async function processRules(rules: Rule[], io: any, workflow_id: any) {
  for (const rule of rules) {
    await io.runTask("getWhenFunction", async () => {
      // Fetch workflows where category is 'msdynamics'
      const { data, error } = await supabase
        .from("whens_trigger")
        .select("name")
        .eq("id", rule.when.id);

      if (error) {
        console.error("Failed to fetch when:", error.message);
        return;
      }

      if (data && data.length > 0) {
        await io.runTask(`new_dynamics_task-${data[0].name}`, async () => {
          await new_data_dynamics(io, rule, data, workflow_id);
        });
      }
    });
  }
}

const job = triggerClient.defineJob({
  id: "dynamics_hot_swap",
  name: "Retrieve Dynamics F&O Data",
  version: "0.0.43",
  enabled: true,
  trigger: intervalTrigger({ seconds: 60 }),
  integrations: {
    resend,
  },
  run: async (payload, io, ctx) => {
    try {
      await io.runTask("getDynamicsDataWorkflows", async () => {
        // Fetch workflows where category is 'msdynamics'
        const { data, error } = await supabase
          .from("workflows_trigger")
          .select("id,workflow_json")
          .eq("category", "msdynamics");

        if (error) {
          await io.logger.error(
            `Failed to fetch workflows:", ${error.message}`,
          );
          return;
        }
        await io.logger.info(`Workflow retrieve data :  ${data}`);
        if (data) {
          // Process each workflow
          for (const workflow of data as Workflow[]) {
            await io.runTask(`processWorflowRules-${workflow.id}`, async () => {
              await processRules(
                workflow.workflow_json.rules,
                io,
                workflow?.id,
              );
            });
          }
        }
      });
    } catch (error) {
      await io.logger.error("Error during running of job:", error as any);
    }
  },
});

async function new_data_dynamics(
  io: any,
  rule: Rule,
  whens_trigger_data: any,
  workflow_id: any,
) {
  try {
    const tokenData = new URLSearchParams();
    tokenData.append("client_id", process.env.AZURE_CLIENT_ID || "");
    tokenData.append("client_secret", process.env.AZURE_CLIENT_SECRET || "");
    tokenData.append("resource", process.env.DYNAMICS_RESOURCE_URL || "");
    tokenData.append("grant_type", "client_credentials");

    const tokenUrl =
      "https://login.microsoftonline.com/0a8d21c1-bba1-4f66-a226-f09b2cf1ca09/oauth2/token";
    await io.logger.info(tokenUrl);
    const response = await axios.post(tokenUrl, tokenData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    await io.logger.info("Token response data:", response.data);
    const tokenResponse = response.data;

    const accessToken = tokenResponse.access_token;

    let lastDynamicsDataNumber = null;
    let dynamicsDataExists = false;
    let orderCount = 0;

    const whens_metadata = whens_trigger_data[0]?.metadata;

    // Fetch workflows where category is 'sales'
    // const { data:workflow_data, error:workflow_error } = await supabase
    //   .from("workflows_trigger")
    //   .select("id,workflow_json");

    while (!dynamicsDataExists) {
      try {
        const headersResponse = await axios.get(
          //`https://basicd365demo940a345f9ce46e95devaos.axcloud.dynamics.com/data/SalesOrderHeaders?$orderby=SalesOrderNumber desc&$top=1&$skip=${orderCount}`,
          `${whens_metadata?.main_url}/${whens_metadata?.headerField}?${whens_metadata?.filter_part_url} desc&$top=1&$skip=${orderCount}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const headerFieldName = `${whens_metadata?.headerField}`;

        const headersData = headersResponse.data.value;

        if (headersData.length === 0) {
          await io.logger.info(`No more ${whens_metadata?.name} found.`);
          break;
        }

        const header = headersData[0];
        const headerId = header["@odata.etag"];
        const dynamicsHeaderData = header[headerFieldName];
        await io.logger.info(dynamicsHeaderData, "Is the the dynamic data");

        // const { data: existingSalesOrder, error: checkError } = await supabase
        //   .from("sales_order")
        //   .select("id")
        //   .eq("header_id", headerId)
        //   .limit(1);

        const { data: existingData, error: existingDataError } = await supabase
          .from("trigger_data_already_processed")
          .select("id,workflow_id,header_id")
          .eq("header_id", headerId)
          .eq("workflow_id", workflow_id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (existingDataError) {
          await io.logger.error(
            `Error checking for existing ${whens_metadata?.name} in the database: ${existingDataError.message}`,
          );
          orderCount++;
          continue;
        }

        if (existingData.length > 0) {
          await io.logger.info(
            `Data and headerId ${headerId} already exists in the database.`,
          );
          dynamicsDataExists = true;
          break;
        }

        const mainFieldName = `${whens_metadata?.mainField}`;
        const headerFieldToFilter = `${whens_metadata?.headerFieldToFilter}`;
        const linesResponse = await axios.get(
          //`https://basicd365demo940a345f9ce46e95devaos.axcloud.dynamics.com/data/SalesOrderLines?$filter=SalesOrderNumber eq '${header.SalesOrderNumber}'`,
          `${
            whens_metadata?.main_url
          }/${mainFieldName}?$filter=${headerFieldToFilter} eq '${
            header[`${headerFieldToFilter}`]
          }'`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        const linesData = linesResponse.data.value;

        for (const line of linesData) {
          const lineId = line["@odata.etag"];

          try {
            await io.logger.info(
              `Evaluating for line ${
                header[headerFieldToFilter]
              } and line  ${JSON.stringify(line)}`,
            );
            if (evaluateConditionGroup(rule.when.condition_group, line)) {
              for (const event_i of rule.event) {
                if (event_i.id === "1") {
                  //send mail
                  try {
                    await io.logger.info(
                      "Preparation to send email with data:",
                      event_i.data.message,
                    );

                    const emailBody = `
                    Added ${whens_metadata?.name} to database with ${whens_metadata?.name} id ${header[headerFieldToFilter]}:
                    ${event_i.data.message}
                  `;

                    await io.resend.sendEmail("send-email", {
                      to: "anupam.appar@xcelpros.com",
                      subject: `Workflow run ${whens_metadata?.name} line added to database`,
                      text: emailBody,
                      from: "Your Company <dev@xcelpros.com>",
                    });
                    await io.logger.info("Email sent successfully.");
                  } catch (error: any) {
                    await io.logger.error(`Error sending email: ${error}`);
                    await io.logger.error(
                      `Detailed stack trace: ${error.stack}`,
                    );
                    await runExceptionConditions(rule, io, error);
                  }
                }
              }
              const { error: dbError } = await supabase
                .from("trigger_data_already_processed")
                .insert([
                  {
                    header: header,
                    line: line,
                    line_id: lineId,
                    header_id: headerId,
                    workflow_id: workflow_id,
                  },
                ]);

              if (dbError) {
                await io.logger.error(
                  `Failed to upload data to Supabase for ${whens_metadata?.name} ${header[headerFieldToFilter]} and line ${line.LineNumber}: ${dbError.message}`,
                );
              } else {
                await io.logger.info(
                  `Successfully uploaded data for ${whens_metadata?.name} ${header[headerFieldToFilter]} and line ${line.LineNumber}`,
                );
              }
            } else {
              await io.logger.info(
                `${whens_metadata?.name} with line id ${lineId} dont matches the conditons`,
              );
            }
          } catch (error) {
            await io.logger.error(
              `Error processing ${whens_metadata?.name} line data: ${error}`,
            );
          }
        }

        lastDynamicsDataNumber =
          header[`${whens_metadata?.headerFieldToFilter}`];
        orderCount++;
      } catch (error) {
        await runExceptionConditions(rule, io, error);
        await io.logger.error(
          `Error retrieving ${whens_metadata?.name} data:`,
          error,
        );
        orderCount++;
      }
    }

    await io.logger.info(
      `Data processing completed. Last processed ${whens_metadata?.name}: ${lastDynamicsDataNumber}`,
    );
  } catch (error) {
    await runExceptionConditions(rule, io, error);
    await io.logger.error(`Error during new_data_dynamics : ${error}`);
  }
}

async function runExceptionConditions(rule: Rule, io: any, err: any) {
  try {
    await io.runTask(`exception_handling-${rule.exception.id}`, async () => {
      if (evaluateConditionGroup(rule.exception.condition_group, {})) {
        for (const event_i of rule.exception.event) {
          if (event_i.id === "1") {
            //send mail
            try {
              await io.logger.info(
                "Preparation to send email with data:",
                event_i.data.message,
              );

              const emailBody = `
              Exception in workflow:
              - ${event_i.data.message}
              ${err}
            `;

              await io.resend.sendEmail("send-email", {
                to: "anupam.appar@xcelpros.com",
                subject: "Workflow run",
                text: emailBody,
                from: "Your Company <dev@xcelpros.com>",
              });
              await io.logger.info("Email sent successfully.");
            } catch (error: any) {
              await io.logger.error(`Error sending email: ${error}`);
              await io.logger.error(`Detailed stack trace: ${error.stack}`);
            }
          } else {
            await io.logger.info(
              `Condition doesnt match for exception handling`,
            );
          }
        }
      }
    });
  } catch (error) {
    await io.logger.error(`Error during exception handling:${error}`);
  }
}
export default job;
