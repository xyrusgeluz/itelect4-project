// src/schemas/claimSchema.ts
// One schema. The rules live here, and the TypeScript type is DERIVED
// from it -- so a rule and its type can never drift apart.

import { z } from "zod";

export const claimSchema = z.object({
  // Rule 1: Required selection (non-empty string)
  itemId: z.string().min(1, "Please select an item to claim."),

  // Rule 2: Built-in URL validation
  // Rule 3: Custom .refine() ensuring it's an approved proof link
  proofUrl: z
    .url("That is not a valid URL -- include https://")
    .refine(
      (url) =>
        url.includes("drive.google.com") ||
        url.includes("photos.app.goo.gl") ||
        url.includes("photos.google.com") ||
        url.includes("imgur.com") ||
        url.includes("dropbox.com") ||
        url.includes("github.com"),
      "Proof URL must be an image or drive link (Google Drive, Imgur, Dropbox, Photos, GitHub)."
    ),
});

// z.infer reads the schema and generates the TypeScript type:
//   { itemId: string; proofUrl: string }
export type ClaimFormValues = z.infer<typeof claimSchema>;
