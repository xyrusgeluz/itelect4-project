# ITELECT4 Project: Campus Lost & Found Tracker

## Project Concept

This project is a simple backend model for a Campus Lost & Found Tracker. The idea is to help students and campus security keep track of items that have been lost or found around campus. A user can post an item they lost or found, and other users can submit a claim on that item. An admin then reviews the claim to verify if it is legit before the item is returned to its owner. This project focuses on the data structure and logic side of the app, using TypeScript to make sure every part of the data is properly typed and safe to work with.

## Entities and Types

The project defines the following interfaces and types in `types/index.ts`:

- **User**: represents a person using the app, either a student or an admin. Includes fields like id, name, email, role, and isActive.
- **Item**: represents a lost or found post. Includes fields like id, title, description, category, status (lost or found), who posted it, and the date it was reported.
- **Claim**: represents a user claiming an item as theirs. Includes fields like id, which item it refers to, who claimed it, and when it was submitted.
- **ApiResponse\<T\>**: a generic interface used to wrap any kind of data response, along with a success flag and an optional message.
- **UserUpdate**: a version of User where every field is optional, used for update forms.
- **UserPreview**: a smaller version of User with only id, name, and role, used for lightweight lists.
- **PublicUser**: a version of User safe to show publicly, with email and isActive removed.
- **RoleCount**: a type used for counting how many users belong to each role.
- **ClaimStatus**: an enum representing the lifecycle of a claim, from Pending to Verified to Rejected.
- **Role**: a const enum representing the two possible user roles, student and admin.

## TypeScript Concepts Used

This project applies the following TypeScript concepts:

- Type annotations for variables, function parameters, and return values
- Primitive types such as string, number, boolean, null, undefined, and void
- Special types such as any, unknown, and never
- Interfaces to define the shape of objects
- Type aliases and union types
- Type narrowing using typeof
- Generic functions and a generic interface
- Utility types such as Partial, Pick, Omit, Record, and ReturnType
- Enums, both a regular enum and a const enum

## How to Install and Run

1. Clone the repository.
2. Open a terminal inside the project folder.
3. Run `npm install` to install all dependencies.
4. Run `npx tsc --noEmit` to check that the project compiles with no errors.
5. Run `npx ts-node src/index.ts` to run the project and see the sample output in the terminal.

## Notes

This is part of GT1 for ITELECT4. The User, Item, and Claim entities and their related types are the foundation that future graded tasks in this course will build on top of.