import { triggerClient } from "~/lib/trigger.server";
import { intervalTrigger } from "@trigger.dev/sdk";
import { Resend } from "@trigger.dev/resend";
// import axios from "axios";
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
//                 column_name: "labelType",
//                 comparision_value: "Label",
//               },
//             },
//             {
//               id: "3",
//               operator_id: "2",
//               value: {
//                 column_name: "status",
//                 comparision_value: "Submitted",
//               },
//             },
//           ],
//         },
//       },
//       event: [
//         {
//           id: "1",
//           data: {
//             message: "Label is added",
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

// Process each rule
async function processRules(rules: Rule[], io: any) {
  for (const rule of rules) {
    await io.runTask("getWhenFunction", async () => {
      const { data, error } = await supabase
        .from("whens_trigger")
        .select("name")
        .eq("id", rule.when.id);

      if (error) {
        console.error("Failed to fetch when:", error.message);
        return;
      }

      if (data && data.length > 0) {
        if (data[0].name === "new_label") {
          await io.runTask(`new_label_task-${data[0].name}`, async () => {
            await new_label_task(io, rule);
          });
        }
      }
    });
  }
}

const job = triggerClient.defineJob({
  id: "lables_check",
  name: "Check-Label-Created",
  version: "0.0.1",
  enabled: true,
  trigger: intervalTrigger({ seconds: 60 }),
  integrations: {
    resend,
  },
  run: async (payload: any, io: any, ctx: any) => {
    try {
      await io.runTask("getLabels", async () => {
        // Fetch workflows where category is 'label'
        const { data, error } = await supabase
          .from("workflows_trigger")
          .select("id,workflow_json")
          .eq("category", "labels");

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
              await processRules(workflow.workflow_json.rules, io);
            });
          }
        }
      });
    } catch (error) {
      await io.logger.error("Error during running of job:", error as any);
    }
  },
});

async function new_label_task(io: any, rule: Rule) {
  try {
    let lastLabelId = null;
    let lableExists = false;

    while (!lableExists) {
      try {
        const { data: existingLables, error: checkError } = await supabase
          .from("labelsReports")
          .select("id,category,name,labelType,status")
          .order("createdAt", { ascending: false })
          .limit(1);

        if (checkError) {
          await io.logger.error(
            `Error checking for labels reports in the database: ${checkError.message}`,
          );
          continue;
        }

        if (existingLables.length > 0) {
          for (const tempLabel of existingLables) {
            if (lastLabelId && lastLabelId == tempLabel?.id) {
              await io.logger.info(
                `Label ${tempLabel?.id} already exists in the database.`,
              );
              lableExists = true;
              break;
            } else {
              lastLabelId = tempLabel?.id;
              lableExists = true;
              try {
                if (
                  evaluateConditionGroup(rule.when.condition_group, tempLabel)
                ) {
                  let counter = 0;
                  for (const event_i of rule.event) {
                    console.log(event_i);
                    if (event_i.id === "1") {
                      //send mail
                      counter++;
                      try {
                        console.log("try mail");
                        await io.logger.info(
                          `Preparation to send email with data:${counter}`,
                          event_i.data.message,
                        );

                        const emailBody = `
                          <p>Added new label with name ${tempLabel?.name}:</p>
                          <p>Please click on the following link to approve the label</p>
                          <a href="http://localhost:3000/x/labels-reports/labels/editor/${tempLabel?.id}">Approve</a>
                        `;

                        await io.resend.sendEmail("send-email", {
                          to: "anupam.appar@xcelpros.com",
                          subject: "Label Added to Database",
                          html: emailBody,
                          from: "Your Company <dev@xcelpros.com>",
                        });
                        await io.logger.info("Email sent successfully.");
                      } catch (error: any) {
                        console.log("inside catch");
                        await io.logger.error(`Error sending email: ${error}`);
                        await io.logger.error(
                          `Detailed stack trace: ${error.stack}`,
                        );
                        await runExceptionConditions(rule, io, error);
                      }
                    }
                  }
                } else {
                  await io.logger.info(
                    `Labels with id ${tempLabel?.id} dont matches the conditons`,
                  );
                }
              } catch (error) {
                await io.logger.error(`Error processing label data: ${error}`);
                break;
              }
            }
          }
        } else {
          await io.logger.info(`No Lables found`);
          break;
        }
      } catch (error) {
        await runExceptionConditions(rule, io, error);
        await io.logger.error("Error retrieving label data:", error);
      }
    }
    await io.logger.info(`Label processing completed.`);
  } catch (error) {
    await runExceptionConditions(rule, io, error);
    await io.logger.error(`Error during new_label task : ${error}`);
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
                "Preparation to send email with data99:",
                event_i.data.message,
              );

              const emailBody = `
              Exception in label workflow:
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
              await io.logger.error(`Error sending email exception: ${error}`);
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
