// src/schemas/reviewSchema.ts -- a NEW file
// ===== SESSION 11: a NEW file ========================================
import { z } from "zod";

// The same two limits as aiRequestSchema in itelect4-backend, with the
// same messages, so the browser validates before a request is spent.
// The API checks again anyway: anyone can call it directly with Postman.
export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your project or report in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;