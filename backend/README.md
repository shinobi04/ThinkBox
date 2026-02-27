# NoteApp

A robust backend service for a note-taking application built with **Bun**, **Express**, **TypeScript**, and **Prisma**. Authentication is handled securely using **better-auth** with PostgreSQL as the database.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Express (with TypeScript)
- **Database ORM**: Prisma
- **Database Engine**: PostgreSQL (pg)
- **Authentication**: better-auth (Email/Password & Google OAuth)
- **AI Integrations**: OpenAI, Google Generative AI

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) and [PostgreSQL](https://www.postgresql.org/) installed on your machine.

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Configure your environment variables in a `.env` file (Database, Google OAuth credentials, AI keys, etc.).

4. Push Prisma schema to the database:

   ```bash
   bunx prisma db push
   # or
   bunx prisma migrate dev
   ```

5. Run the development server (runs on `http://localhost:3000` by default):
   ```bash
   bun run dev
   ```

---

## 🗺️ API Routes

### Public Routes

- `GET /` - Health check route. Returns a hello message: `"Hello from Bun + Express + TS!"`

### Authentication Routes (handled by better-auth)

The `better-auth` integration intercepts all requests to `/api/auth/*`.

- `POST /api/auth/sign-up/email` - Create a new user account with email, password, and name.
- `POST /api/auth/sign-in/email` - Sign in with email and password.
- `GET /api/auth/sign-in/google` - Initiate Google OAuth sign-in flow.
- `POST /api/auth/sign-out` - Sign out the current user session.
- `GET /api/auth/session` - Get the current active user session.

### Protected API Routes

_These routes require a valid session (managed via cookies/headers by better-auth)._

- `GET /api/protected` - Returns the authenticated user profile and session details.
- `POST /api/content` - Create new content/notes.
- `GET /api/content` - Retrieve stored content/notes.
- `GET /api/search` - Search through existing content.

---

## 🔒 Frontend Integration (better-auth)

To seamlessly integrate the frontend with the backend authentication system, you should use the `@better-auth/client` package.

### 1. Setup Auth Client (`lib/auth-client.ts`)

Initialize the `better-auth` client with your backend's base URL:

```typescript
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Your Bun frontend origin
});
```

### 2. Sign Up (Email & Password)

```typescript
const { data, error } = await authClient.signUp.email({
  email: "user@example.com",
  password: "securepassword",
  name: "John Doe",
});

if (error) {
  console.error("Signup failed:", error.message);
} else {
  console.log("Signup successful!");
}
```

### 3. Sign In (Email & Password)

```typescript
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "securepassword",
});

if (error) {
  console.error("Login failed:", error.message);
} else {
  console.log("Login successful! Redirecting...");
}
```

### 4. Google Login (Social OAuth)

Triggering Google Login will redirect the user to the Google Consent screen.
Make sure your Google Console matches your backend authorized redirect URIs.

```typescript
const handleGoogleLogin = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3001/dashboard", // Optional: where to land after auth
  });

  if (error) console.error("Google login failed:", error);
};
```

### 5. Sign Out

```typescript
const handleLogOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/login"; // Redirect after logout
      },
    },
  });
};
```

### 6. Checking Session (Client-Side)

```typescript
// You can use the session method or React hooks if using better-auth React adapters
const { data: session } = await authClient.useSession();

if (session) {
  console.log("Logged in as:", session.user.email);
} else {
  console.log("Not logged in");
}
```

## CORS Details

The backend explicitly trusts origins specified in the `index.ts` file (`http://localhost:3000`, `http://localhost:3001`, `http://127.0.0.1:3001`). Make sure your frontend runs on one of these ports to avoid CORS restrictions when sending credentials (cookies).
