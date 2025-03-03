import { TriggerClient } from "@trigger.dev/sdk";
import dotenv from "dotenv";

dotenv.config();

export const triggerClient = new TriggerClient({
  // id: "project-x",
  id: process.env.TRIGGER_PROJECT_REF!,
  apiKey: process.env.TRIGGER_SECRET_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
