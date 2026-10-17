// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin"; // only these values
  isActive: boolean;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "lost" | "found";
  postedBy: number;      // references a User's id
  dateReported: Date;
}

export interface Claim {
  id: number;
  itemId: number;        // references an Item's id
  claimedBy: number;     // references a User's id
  submittedAt: Date;
  proofUrl?: string;     // optional proof link
}

// ===== TYPE ALIASES / UNIONS =====
export type ID = string | number;
export type StringOrNumber = string | number;

// ===== TYPE NARROWING EXAMPLE =====
export function printId(id: StringOrNumber): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;

// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;

// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<"student" | "admin", number>;

// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum ClaimStatus {
  Pending,
  Verified,
  Rejected,
}

// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
  Student = "student",
  Admin = "admin",
}

// ===== SESSION 7: API TYPES =====
// JSON has no Date, and json-server writes ids as strings. So what the
// API hands back is NOT the Item/Claim shapes declared above.
// Both types below are DERIVED with Omit, so Item and Claim stay the
// single source of truth.

export type ApiItem = Omit<Item, "id" | "dateReported"> & {
  id: string;            // json-server ids are strings
  dateReported: string;  // an ISO string, never a Date object
};

// ===== SESSION 10: the same two types, matching the real API =======

export type ApiClaim = Omit<Claim, "id" | "itemId" | "claimedBy" | "submittedAt"> & {
  id: string;            // 24 hex characters, from MongoDB's _id
  itemId: string;        // references an Item's _id
  claimedBy: string;     // the owner's _id, also 24 hex characters
  submittedAt: string;   // an ISO string, never a Date object
};

// What we SEND when creating one. Not Omit<ApiClaim, "id"> any
// more: the server fills in claimedBy from the token and submittedAt
// from the schema default, so sending either one is at best ignored
// and at worst a lie. These two fields are the whole request body,
// and itelect4-backend's NewClaimBody is this same Pick.
export type NewClaim = Pick<ApiClaim, "itemId"> & {
  proofUrl?: string;
};

// What /api/auth/register sends back, and what sits inside the login
// reply. Same story as ApiClaim: Session 1 said id was a number
// because there was no database to number the rows.
export type ApiUser = Omit<User, "id"> & {
  id: string;
};

// What /api/auth/login sends back. The token is the string that goes
// in the Authorization header on every request after this one.
export interface AuthReply {
  token: string;
  user: ApiUser;
}