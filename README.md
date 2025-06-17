# 🔗 URL Shortener – Full Stack Project

This application is a full-featured **URL shortener** built with a modern MERN-style stack. It allows users to generate short, shareable links from long URLs — similar to services like Bitly or TinyURL.

- 🌍 **Public users** can create short URLs instantly without registration.
- 🔐 **Registered users** can log in to:
  - Create and manage their own short URLs
  - Use custom slugs (e.g. `/github` instead of `/Ab3kL2`)
  - View all their created links in a personal dashboard

The app includes **JWT authentication** stored in **secure HTTP-only cookies**, route protection using TanStack Router, and session-aware Axios interceptors. All URLs are stored in **MongoDB**, and redirection is handled via server-side Express routes.

## 📁 Project Structure

```bash
URL_SHORTENER/
 ┣ 📂BACKEND      # Express.js backend (API, Auth, DB, Services)
 ┣ 📂FRONTEND     # React frontend (Auth, Routes, UI)
 ┗ 📜README.md    # You're here
```

## ⚙️ Technologies Used

| Layer     | Tech Stack                                                 |
| --------- | ---------------------------------------------------------- |
| Frontend  | React, Redux Toolkit, TanStack Router, Axios, Tailwind CSS |
| Backend   | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt          |
| Auth Flow | Secure HTTP-only cookies + middleware + interceptors       |
| Routing   | Protected routes using `beforeLoad` + redirect logic       |

## 🚀 Getting Started

### 📦 Backend

Make sure you have a `.env` file (see [Backend/README.md](https://github.com/MrGreat-0/URL-Shortner/blob/main/Backend/README.md) for setup)

---

### 💻 Frontend

```
Vite will launch on http://localhost:5173
```

Also make sure you have a `.env` file (see [Frontend/README.md](https://github.com/MrGreat-0/URL-Shortner/blob/main/Frontend/README.md) for setup)

### 🔐 Features

```
    ✅ User Registration & Login (JWT Auth with HTTP-only cookies)

    ✅ Create Short URLs (with or without login)

    ✅ View your links in Dashboard

    ✅ Protected route: /dashboard (redirects if not authenticated)

    ✅ Auto logout on session expiry (via Axios interceptor)

    ✅ Seamless redirection using /:slug route
```

### 📁 Read More

```
    🔎 Frontend Details → FRONTEND/README.md

    🛠 Backend Details → BACKEND/README.md

```

### 🧠 Developer Tips

```
    All /me requests include a skipAuthRedirect flag on the frontend to prevent unnecessary logouts on public pages.

    Backend uses attachUser and authMiddleware to secure routes and associate links with users.

    Custom error classes like AppError, UnauthorizedError, and ConflictError help with clean backend error handling.

```

## ✅ TODOs / Ideas

- 📊 Add click analytics per shortened URL (IP, referrer, timestamp, etc.)
- 🔁 Add refresh token support for longer sessions
- 🚫 Add rate limiting on URL creation (per IP or user)
- ⏳ Add expiration time for short URLs (for unauthenticated users)
- 🛠️ Add admin panel to manage all links (view, delete, moderate)
