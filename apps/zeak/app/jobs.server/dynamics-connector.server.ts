import { task, logger, schedules, configure } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";
import axios from "axios";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env file
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_ROLE,
);

// Using secretKey authentication
configure({
  secretKey: process.env.TRIGGER_SECRET_KEY, // starts with tr_dev_ or tr_prod_
});

const resend = new Resend(process.env.RESEND_API_KEY);

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
//   rules: [
//     {
//       id: "1",
//       description:
//         "Check conditions and trigger events accordingly, with exception handling.",
//       when: {
//         id: "1",
//         condition_group: {
//           logic: "AND",
//           conditions: [
//             {
//               id: "2",
//               operator_id: "2",
//               value: {
//                 column_name: "DeliveryAddressZipCode",
//                 comparision_value: "12345",
//               },
//             },
//             {
//               logic: "OR",
//               conditions: [
//                 {
//                   id: "2",
//                   operator_id: "2",
//                   value: {
//                     column_name: "SalesOrderLineStatus",
//                     comparision_value: "Invoiced",
//                   },
//                 },
//                 {
//                   id: "2",
//                   operator_id: "2",
//                   value: {
//                     column_name: "SalesOrderLineStatus",
//                     comparision_value: "Backorder",
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       },
//       event: [
//         {
//           id: "1",
//           data: {
//             message: "Sales order line is added",
//           },
//         },
//         {
//           id: "2",
//           data: {
//             message: "Sales order line is added",
//           },
//         },
//       ],
//       exception: {
//         id: "exception1",
//         condition_group: {
//           logic: "OR",
//           conditions: [],
//         },
//         event: [
//           {
//             id: "1",
//             data: {
//               message:
//                 "API call or network issue occurred, triggering fallback.",
//             },
//           },
//         ],
//       },
//     },
//   ],
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

async function runExceptionConditions(rule: Rule, error: any) {
  try {
    if (evaluateConditionGroup(rule.exception.condition_group, {})) {
      for (const event of rule.exception.event) {
        if (event.id === "1") {
          // Send email
          try {
            logger.info("Preparing to send email with data:", {
              message: event?.data?.message,
            });
            const emailBody = `
              Exception in workflow:
              - ${event.data.message}
              ${error}
            `;
            await resend.emails.send({
              to: "anupam.appar@xcelpros.com",
              subject: "Workflow Exception",
              text: emailBody,
              from: "Your Company <dev@xcelpros.com>",
            });
            logger.info("Email sent successfully.");
          } catch (err) {
            logger.error("Error sending email:", { error: err });
          }
        } else {
          logger.info("Condition doesn't match for exception handling");
        }
      }
    }
  } catch (err) {
    logger.error("Error during exception handling:", { error: err });
  }
}

async function new_data_dynamics(
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
    logger.info(tokenUrl);
    const response = await axios.post(tokenUrl, tokenData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    logger.info("Token response data:", response.data);
    const tokenResponse = response.data;

    const accessToken = tokenResponse.access_token;

    let lastDynamicsDataNumber = null;
    let dynamicsDataExists = false;
    let orderCount = 0;

    const whens_metadata = whens_trigger_data[0]?.metadata;

    while (!dynamicsDataExists) {
      try {
        const headersResponse = await axios.get(
          `${whens_metadata?.main_url}/${whens_metadata?.headerField}?${whens_metadata?.filter_part_url} desc&$top=1&$skip=${orderCount}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const headerFieldName = `${whens_metadata?.headerField}`;

        const headersData = headersResponse.data.value;

        if (headersData.length === 0) {
          logger.info(`No more ${whens_metadata?.name} found.`);
          break;
        }

        const header = headersData[0];
        const headerId = header["@odata.etag"];
        const dynamicsHeaderData = header[headerFieldName];
        logger.info(dynamicsHeaderData, { message: "Is the dynamic data" });

        const { data: existingData, error: existingDataError } = await supabase
          .from("trigger_data_already_processed")
          .select("id,workflow_id,header_id")
          .eq("header_id", headerId)
          .eq("workflow_id", workflow_id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (existingDataError) {
          logger.error(
            `Error checking for existing ${whens_metadata?.name} in the database: ${existingDataError.message}`,
          );
          orderCount++;
          continue;
        }

        if (existingData.length > 0) {
          logger.info(
            `Data and headerId ${headerId} already exists in the database.`,
          );
          dynamicsDataExists = true;
          break;
        }

        const mainFieldName = `${whens_metadata?.mainField}`;
        const headerFieldToFilter = `${whens_metadata?.headerFieldToFilter}`;
        const linesResponse = await axios.get(
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
            logger.info(
              `Evaluating for line ${
                header[headerFieldToFilter]
              } and line  ${JSON.stringify(line)}`,
            );
            if (evaluateConditionGroup(rule.when.condition_group, line)) {
              for (const event_i of rule.event) {
                if (event_i.id === "cqovgdjgq0lsfh0m7tl0") {
                  // Send email
                  try {
                    logger.info("Preparation to send email with data:", {
                      message: event_i?.data.message,
                    });

                    const emailBody = `
                    Added ${whens_metadata?.name} to database with ${whens_metadata?.name} id ${header[headerFieldToFilter]}:
                    ${event_i.data.message}
                  `;

                    await resend.emails.send({
                      to: "anupam.appar@xcelpros.com",
                      subject: `Workflow run ${whens_metadata?.name} line added to database`,
                      text: emailBody,
                      from: "Your Company <dev@xcelpros.com>",
                    });
                    logger.info("Email sent successfully.");
                  } catch (error: any) {
                    logger.error(`Error sending email: ${error}`);
                    logger.error(`Detailed stack trace: ${error.stack}`);
                    await runExceptionConditions(rule, error);
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
                logger.error(
                  `Failed to upload data to Supabase for ${whens_metadata?.name} ${header[headerFieldToFilter]} and line ${line.LineNumber}: ${dbError.message}`,
                );
              } else {
                logger.info(
                  `Successfully uploaded data for ${whens_metadata?.name} ${header[headerFieldToFilter]} and line ${line.LineNumber}`,
                );
              }
            } else {
              logger.info(
                `${whens_metadata?.name} with line id ${lineId} doesn't match the conditions`,
              );
            }
          } catch (error) {
            logger.error(
              `Error processing ${whens_metadata?.name} line data: ${error}`,
            );
          }
        }

        lastDynamicsDataNumber =
          header[`${whens_metadata?.headerFieldToFilter}`];
        orderCount++;
      } catch (error) {
        await runExceptionConditions(rule, error);
        logger.error(`Error retrieving ${whens_metadata?.name} data:`, {
          error: error,
        });
        orderCount++;
      }
    }

    logger.info(
      `Data processing completed. Last processed ${whens_metadata?.name}: ${lastDynamicsDataNumber}`,
    );
  } catch (error) {
    await runExceptionConditions(rule, error);
    logger.error(`Error during new_data_dynamics: ${error}`);
  }
}

async function processRules(rules: Rule[], workflow_id: any) {
  for (const rule of rules) {
    await task({
      id: `getWhenFunction-${rule.when.id}`,
      run: async () => {
        // Fetch workflows where category is 'msdynamics'
        const { data, error } = await supabase
          .from("whens_trigger")
          .select("name")
          .eq("id", rule?.when?.id);

        if (error) {
          logger.error("Failed to fetch when:", { error: error.message });
          return;
        }

        if (data && data.length > 0) {
          await task({
            id: `new_dynamics_task-${data[0].name}`,
            run: async () => {
              await new_data_dynamics(rule, data, workflow_id);
            },
          });
        }
      },
    });
  }
}

const job = schedules.task({
  id: "dynamics-connector-interval",
  run: async () => {
    try {
      console.log("Running job");
      // Fetch workflows where category is 'msdynamics'
      const { data, error } = await supabase
        .from("workflows_trigger")
        .select("id,workflow_json")
        .eq("category", "ms_dynamics");

      if (error) {
        logger.error(`Failed to fetch workflows:", ${error.message}`);
        return;
      }
      logger.info(`Workflow retrieve data: ${data}`);
      if (data) {
        // Process each workflow
        for (const workflow of data as Workflow[]) {
          await task({
            id: `processWorkflowRules-${workflow.id}`,
            run: async () => {
              await processRules(workflow.workflow_json.rules, workflow.id);
            },
          });
        }
      }
    } catch (error) {
      logger.error("Error during running of job:", error as any);
    }
  },
});

export default job;
