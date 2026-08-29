// src/api/client.ts
// Every call to json-server lives in this one file.
// No component calls fetch directly any more.

import type { ApiItem, ApiClaim, NewClaim } from "../types/index";

export const API_URL = "http://localhost:3001";

// ── ITEMS ──────────────────────────────────────────────

// GET /items -> the whole list
export async function fetchItems(): Promise<ApiItem[]> {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) {
    throw new Error("Could not load items");
  }
  return res.json();
}

// GET /items/:id -> one item by its id
export async function fetchItemById(id: string): Promise<ApiItem> {
  const res = await fetch(`${API_URL}/items/${id}`);
  if (!res.ok) {
    throw new Error(`Could not load item "${id}"`);
  }
  return res.json();
}

// ── CLAIMS ─────────────────────────────────────────────

// GET /claims -> the whole list
export async function fetchClaims(): Promise<ApiClaim[]> {
  const res = await fetch(`${API_URL}/claims`);
  if (!res.ok) {
    throw new Error("Could not load claims");
  }
  return res.json();
}

// POST /claims -> the row the server saved, with the id it made
export async function createClaim(
  newClaim: NewClaim
): Promise<ApiClaim> {
  const res = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClaim),
  });
  if (!res.ok) {
    throw new Error("Could not save the claim");
  }
  return res.json();
}
