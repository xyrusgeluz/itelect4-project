// src/data/mockData.ts
// Shared mock data for the Lost & Found app.
// Multiple pages need the same items and claims, so they live here.

import type { User, Item, Claim } from "../types/index";

export const currentUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

export const allItems: Item[] = [
  {
    id: 1,
    title: "Black Umbrella",
    description: "Found near the library entrance, black with a wooden handle.",
    category: "accessories",
    status: "found",
    postedBy: 1,
    dateReported: new Date("2026-08-01"),
  },
  {
    id: 2,
    title: "Blue Backpack",
    description: "Lost near the cafeteria. Has a keychain of a small bear.",
    category: "bags",
    status: "lost",
    postedBy: 1,
    dateReported: new Date("2026-08-05"),
  },
  {
    id: 3,
    title: "Red Wallet",
    description: "Found in Room 301. Contains a student ID inside.",
    category: "accessories",
    status: "found",
    postedBy: 1,
    dateReported: new Date("2026-08-10"),
  },
];

export const allClaims: Claim[] = [
  {
    id: 1,
    itemId: 1,
    claimedBy: 1,
    submittedAt: new Date("2026-08-03"),
    score: 95,
  },
  {
    id: 2,
    itemId: 3,
    claimedBy: 1,
    submittedAt: new Date("2026-08-12"),
  },
];
