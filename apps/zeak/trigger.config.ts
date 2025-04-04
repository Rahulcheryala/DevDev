import type { TriggerConfig } from "@trigger.dev/sdk/v3";
import dotenv from "dotenv";

dotenv.config();
export const config: TriggerConfig = {
  // project: "proj_aenyfohyyxzmyqvwqiug",
  project: process.env.TRIGGER_PROJECT_REF!,
  logLevel: "log",
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  triggerDirectories: ["src/trigger"],
};

// docker container rm -f $(docker container ls -aq)
 
// docker volume rm -f $(docker volume ls)