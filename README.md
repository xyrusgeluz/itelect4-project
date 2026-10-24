# Campus Lost & Found Tracker — Frontend (`itelect4-project`)

Frontend single-page application (SPA) for the **Campus Lost & Found Tracker**, built with **React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Zustand**, and **React Hook Form with Zod**.

Part of **ITELECT4 (Web Development) — Graded Task 5 (GT5)** at De La Salle Lipa.

---

## 🔗 Live Deployments & Repositories

| Component | URL |
|---|---|
| **Live Frontend App** | [https://itelect4-project-six.vercel.app](https://itelect4-project-six.vercel.app) |
| **Live Backend API** | [https://itelect4-backend-lovat.vercel.app](https://itelect4-backend-lovat.vercel.app) |
| **Frontend Repository** | [https://github.com/xyrusgeluz/itelect4-project](https://github.com/xyrusgeluz/itelect4-project) |
| **Backend Repository** | [https://github.com/xyrusgeluz/itelect4-backend](https://github.com/xyrusgeluz/itelect4-backend) |

---

## 🚀 Features

- **Authentication & Protected Routing**:
  - Login & Register pages validated with **React Hook Form** and **Zod** (`authSchema`).
  - Auth token and session persisted in `localStorage` via **Zustand** (`authStore`).
  - `ProtectedRoute` wrapper guarding sensitive routes (`/claims`, `/review`).
- **Interactive Items Catalog**:
  - Filter and search lost and found items in real-time.
  - Search state synchronized through `uiStore`.
  - Item detail pages dynamically fetched via **TanStack Query**.
- **Claims Management**:
  - Users can submit claims for lost items with validated proof URLs (Google Drive, Imgur, Dropbox, GitHub).
  - Uses TanStack Query `useMutation` with automatic query invalidation.
- **AI Review Assistant (`/review`)**:
  - Dedicated page allowing students to submit detailed lost/found descriptions for automated AI evaluation.
  - Form validation with Zod (`reviewFormSchema`) checking character boundaries (20–2000 chars) before making requests.
  - Uses `useMutation` to post to the backend's `/api/ai` endpoint (the frontend never communicates with Gemini directly).
  - Dynamic UI rendering:
    - Color-coded status badge (`ready` in green, `almost` in yellow, `not-yet` in red).
    - AI-generated summary sentence.
    - Bulleted lists for **Strengths** and **Suggested Improvements**.
- **Dark Mode Support**:
  - Dark mode state managed by Zustand (`uiStore`) and persisted in `localStorage`.

---

## 🛠️ Tech Stack

- **Framework**: React 19, Vite 8
- **Language**: TypeScript
- **State Management**:
  - **Server State**: `@tanstack/react-query` (fetching, mutations, caching)
  - **Client State**: `zustand` with `persist` middleware (auth & UI preferences)
- **Forms & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **Styling**: `tailwindcss` v4 (with `@tailwindcss/vite`), `clsx`, `tailwind-merge`, `class-variance-authority`
- **UI Components**: Shadcn-style components (`button`, `input`, `label`), Lucide icons (`lucide-react`)
- **Routing**: `react-router` v8

---

## 📁 Folder Structure

```
itelect4-project/
├── src/
│   ├── api/
│   │   └── client.ts         # Central fetch wrapper with Bearer token injection & askAi()
│   ├── components/
│   │   ├── ui/               # Reusable UI primitives (button, input, label)
│   │   ├── ClaimBadge.tsx    # Claim status badge
│   │   ├── ItemCard.tsx      # Lost/found item card
│   │   ├── Layout.tsx        # App navbar & layout container with dark mode toggle
│   │   ├── ProtectedRoute.tsx# Route guard checking token in authStore
│   │   └── UserCard.tsx      # User profile card
│   ├── hooks/
│   │   ├── usePrevious.ts    # Custom hook tracking previous state
│   │   └── useToggle.ts      # Custom toggle hook
│   ├── pages/
│   │   ├── ClaimsPage.tsx    # Protected claims submission & list
│   │   ├── DashboardPage.tsx # User dashboard
│   │   ├── ItemDetailPage.tsx# Single item view
│   │   ├── ItemsPage.tsx     # Searchable grid of lost & found items
│   │   ├── LoginPage.tsx     # Login form
│   │   ├── NotFoundPage.tsx  # 404 handler
│   │   ├── RegisterPage.tsx  # User registration form
│   │   └── ReviewPage.tsx    # Protected AI Review page (Session 11)
│   ├── schemas/
│   │   ├── authSchema.ts     # Zod login & registration schemas
│   │   ├── claimSchema.ts    # Zod claim validation schema
│   │   └── reviewSchema.ts   # Zod AI review input schema
│   ├── store/
│   │   ├── authStore.ts      # Zustand auth state (token, userName) with persist
│   │   └── uiStore.ts        # Zustand UI state (darkMode, searchTerm) with persist
│   ├── types/
│   │   └── index.ts          # Shared TypeScript interfaces (Item, User, Claim, AiReview)
│   ├── App.tsx               # Client route configuration
│   ├── main.tsx              # React root entry point
│   └── index.css             # Tailwind CSS styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of `itelect4-project`:

```env
# For local development with itelect4-backend running on port 4000:
VITE_API_URL=http://localhost:4000

# For production deployment pointing to the deployed API:
# VITE_API_URL=https://itelect4-backend-lovat.vercel.app
```

> **Note**: Vite bakes `VITE_*` variables into the JavaScript bundle at build time. Whenever you change this variable, restart the Vite dev server or trigger a new build.

---

## 💻 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/xyrusgeluz/itelect4-project.git
   cd itelect4-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   # Ensure VITE_API_URL points to your running backend
   echo "VITE_API_URL=http://localhost:4000" > .env
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

5. **Typecheck & Production Build**:
   ```bash
   npm run build
   ```

---

## 🤖 AI Review Integration (Session 11)

The `/review` page uses the backend's `/api/ai` endpoint to provide automated feedback on item reports:
1. Student enters a description (20–2000 characters).
2. The browser validates with Zod (`reviewFormSchema`).
3. `askAi()` sends an authenticated `POST` request with the user's Bearer token.
4. The backend coordinates with **Google Gemini Flash**, enforces a structured schema, and returns four typed fields:
   - `summary`: One sentence restating what was reported.
   - `strengths`: Well-articulated details that will aid recovery.
   - `improvements`: Missing information to add before posting.
   - `readiness`: Overall readiness badge (`ready`, `almost`, or `not-yet`).
