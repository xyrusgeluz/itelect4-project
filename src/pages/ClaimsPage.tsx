// src/pages/ClaimsPage.tsx
// Protected page — only reachable when a token exists in the auth store.
// Session 7: useQuery to read claims, useMutation to create one.

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiClaim } from "../types/index";
import ClaimBadge from "../components/ClaimBadge";
import { fetchClaims, createClaim, fetchItems } from "../api/client";
import type { ApiItem } from "../types/index";

function ClaimsPage() {
  const [itemId, setItemId] = useState<string>("");
  const queryClient = useQueryClient();

  // 1. READ claims
  const { data: claims, isPending, isError } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  // Also read items so we can show the item title next to each claim
  const { data: items } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // 2. WRITE — mutationFn does the POST, onSuccess cleans up after it
  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      setItemId("");
    },
  });

  const handleAdd = (): void => {
    addClaim.mutate({
      itemId: Number(itemId),
      claimedBy: 1,
      submittedAt: new Date().toISOString(),
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

      <div className="mb-6 flex gap-2">
        <input
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Item ID to claim (e.g. 1)"
          className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleAdd}
          disabled={itemId === "" || addClaim.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addClaim.isPending ? "Saving..." : "Add Claim"}
        </button>
      </div>

      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addClaim.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {claims.map((claim) => {
          const item = items?.find((i) => i.id === String(claim.itemId));
          return (
            <ClaimBadge key={claim.id} claim={claim}>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Item: {item?.title ?? "Unknown item"}
              </p>
            </ClaimBadge>
          );
        })}
      </div>
    </div>
  );
}

export default ClaimsPage;
