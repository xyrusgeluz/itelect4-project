import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaimBadge from "./ClaimBadge";
import type { ApiClaim } from "../types/index";

// Typed sample claim matching the backend MongoDB shape
const sampleClaim: ApiClaim = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  itemId: "665f1c2ab4e8d3a1f0c9e001",
  claimedBy: "665f1c2ab4e8d3a1f0c9e999",
  submittedAt: "2026-10-24T02:15:00.000Z",
  proofUrl: "https://drive.google.com/file/d/sample-receipt",
};

describe("ClaimBadge", () => {
  it("shows the claim id and submitted date", () => {
    render(<ClaimBadge claim={sampleClaim} />);

    expect(
      screen.getByText("Claim #665f1c2ab4e8d3a1f0c9e101"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Submitted: 2026-10-24T02:15:00.000Z"),
    ).toBeInTheDocument();
  });

  it("renders optional children when provided", () => {
    render(
      <ClaimBadge claim={sampleClaim}>
        <p>Item: Hydro Flask</p>
      </ClaimBadge>,
    );

    expect(screen.getByText("Item: Hydro Flask")).toBeInTheDocument();
  });
});