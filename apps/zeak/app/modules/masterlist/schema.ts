/** @format */

import { z } from "zod";

export const createMasterlistSchema = z.object({
  name: z.string().min(1).max(25),
  code: z.string().min(1),
  isActive: z.boolean(),
  purpose: z.string().optional(),
});

export type CreateMasterlistSchema = z.infer<typeof createMasterlistSchema>;
