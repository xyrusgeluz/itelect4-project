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
  score?: number;        // optional -- kept from Part 1 structure if needed later
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