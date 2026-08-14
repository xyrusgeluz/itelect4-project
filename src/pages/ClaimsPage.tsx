// src/pages/ClaimsPage.tsx
// Protected page — only reachable when a token exists in the auth store.
// Shows all claims filed by the current user, using ClaimBadge.

import ClaimBadge from "../components/ClaimBadge";
import { allClaims, allItems } from "../data/mockData";

function ClaimsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allClaims.map((claim) => {
          // Find the item this claim is for, so we can show its title
          const item = allItems.find((i) => i.id === claim.itemId);

          return (
            // The <p> below is passed as children — the typed-children pattern from Session 3
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
