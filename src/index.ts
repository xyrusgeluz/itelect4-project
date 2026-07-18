// ===== IMPORTS =====
import type { User, Item, Claim, ApiResponse } from "../types/index";
import { UserUpdate, UserPreview, PublicUser, RoleCount } from "../types/index";
import { ClaimStatus, Role } from "../types/index";
import { printId } from "../types/index";

console.log("Welcome to itelect4-project -- Campus Lost & Found Tracker");

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
let anything: any = "hello";
anything = 42; // no error

let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // OK -- narrowed to string
}

function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const item: Item = {
  id: 1,
  title: "Black Umbrella",
  description: "Found near the library entrance, black with a wooden handle.",
  category: "accessories",
  status: "found",
  postedBy: student.id,
  dateReported: new Date(),
};

const claim: Claim = {
  id: 1,
  itemId: item.id,
  claimedBy: student.id,
  submittedAt: new Date(),
};

console.log(student);
console.log(item);

// ===== TYPE NARROWING =====
printId(101);          // 101.00
printId("ABC123");     // ABC123

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((entry) => entry.id === id);
}

const firstUser = getFirst<User>([student]);
const foundItem = getById<Item>([item], 1);

console.log(firstUser?.name);   // Juan dela Cruz
console.log(foundItem?.title);  // Black Umbrella

// ===== GENERIC INTERFACE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};

const itemResponse: ApiResponse<Item[]> = {
  success: true,
  data: [item],
};

console.log(userResponse.data.name); // Juan dela Cruz

// ===== USING UTILITY TYPES =====
const patch: UserUpdate = { name: "Juan D. Cruz" };
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" };
const roleCount: RoleCount = { student: 45, admin: 2 };

function makeClaim(itemId: number): Claim {
  return { id: 1, itemId, claimedBy: student.id, submittedAt: new Date() };
}

type NewClaim = ReturnType<typeof makeClaim>;
const gt1Claim: NewClaim = makeClaim(item.id);

// ===== USING ENUMS =====
let status: ClaimStatus = ClaimStatus.Pending;
console.log(ClaimStatus[status]); // "Pending" -- reverse mapping

status = ClaimStatus.Verified;
console.log(status === ClaimStatus.Verified); // true

const currentRole: Role = Role.Student;
console.log(currentRole); // "student"