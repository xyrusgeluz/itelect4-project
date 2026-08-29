// src/pages/ClaimsPage.tsx
// Protected page — only reachable when a token exists in the auth store.
// Session 8: React Hook Form + Zod + Shadcn UI

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiClaim, ApiItem } from "../types/index";
import { claimSchema } from "../schemas/claimSchema";
import type { ClaimFormValues } from "../schemas/claimSchema";
import ClaimBadge from "../components/ClaimBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchClaims, createClaim, fetchItems } from "../api/client";

function ClaimsPage() {
  const queryClient = useQueryClient();

  // 1. useForm holds the values, runs the schema, and stores the errors.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    mode: "onBlur",
    defaultValues: { itemId: "", proofUrl: "" },
  });

  // 2. READ: items (for dropdown and name resolution) and claims
  const { data: items } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const { data: claims, isPending, isError } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  // 3. WRITE: mutationFn does the POST; reset() empties fields on success
  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      reset(); // clears all fields back to defaultValues
    },
  });

  // handleSubmit only calls this after the schema passes
  const onSubmit = (values: ClaimFormValues): void => {
    addClaim.mutate({
      itemId: Number(values.itemId),
      claimedBy: 1,
      submittedAt: new Date().toISOString(),
      proofUrl: values.proofUrl,
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading claims...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load claims.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>

      {/* The Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        {/* Item Selection Dropdown */}
        <div className="grid gap-1.5">
          <Label htmlFor="itemId" className="text-foreground">
            Item to Claim
          </Label>
          <select
            id="itemId"
            {...register("itemId")}
            className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground"
          >
            <option value="">Select an item...</option>
            {items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.category} - {item.status})
              </option>
            ))}
          </select>
          {errors.itemId && (
            <p className="text-sm text-red-600">{errors.itemId.message}</p>
          )}
        </div>

        {/* Proof URL Input */}
        <div className="grid gap-1.5">
          <Label htmlFor="proofUrl" className="text-foreground">
            Proof / Receipt URL
          </Label>
          <Input
            id="proofUrl"
            {...register("proofUrl")}
            aria-invalid={errors.proofUrl ? true : undefined}
            placeholder="https://drive.google.com/file/d/..."
          />
          {errors.proofUrl && (
            <p className="text-sm text-red-600">{errors.proofUrl.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={addClaim.isPending}
          className="justify-self-start"
        >
          {addClaim.isPending ? "Saving..." : "Add Claim"}
        </Button>
      </form>

      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700">{addClaim.error.message}</p>
      )}

      {/* Claims List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {claims.map((claim) => {
          const item = items?.find((i) => i.id === String(claim.itemId));
          return (
            <ClaimBadge key={claim.id} claim={claim}>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Item: {item?.title ?? "Unknown item"}
              </p>
              {claim.proofUrl && (
                <p className="mt-1 truncate text-xs text-blue-600 dark:text-blue-400">
                  Proof: {claim.proofUrl}
                </p>
              )}
            </ClaimBadge>
          );
        })}
      </div>
    </div>
  );
}

export default ClaimsPage;
