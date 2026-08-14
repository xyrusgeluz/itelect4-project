import type { Claim } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <p className="font-semibold text-gray-900 dark:text-white">
        Claim #{claim.id}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Submitted: {claim.submittedAt.toDateString()}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Score: {claim.score ?? "Not graded yet"}
      </p>
      {children}
    </div>
  );
};

export default ClaimBadge;