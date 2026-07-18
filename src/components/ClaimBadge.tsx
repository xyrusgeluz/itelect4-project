import type { Claim } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="claim-badge">
      <p>Claim ID: {claim.id}</p>
      <p>Score: {claim.score ?? "Not graded yet"}</p>
      {children}
    </div>
  );
};

export default ClaimBadge;