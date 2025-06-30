# URL Shortener – Backend

This is the **Node.js + Express** backend for the URL Shortener app. It handles user registration, login, logout, short URL creation, and redirection. Authentication is managed using **JWT stored in HTTP-only cookies**, and MongoDB is used for persistence.

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication** with **secure cookies**
- **REST API** architecture
- **Custom middleware** and **error handling**

## 📁 Project Structure

```bash
📦Backend
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜config.js
 ┃ ┃ ┗ 📜mongo.config.js
 ┃ ┣ 📂controller
 ┃ ┃ ┣ 📜auth.controller.js
 ┃ ┃ ┣ 📜shortUrl.controller.js
 ┃ ┃ ┗ 📜user.controller.js
 ┃ ┣ 📂dao
 ┃ ┃ ┣ 📜shortUrl.js
 ┃ ┃ ┗ 📜user.dao.js
 ┃ ┣ 📂middleware
 ┃ ┃ ┣ 📜auth.middleware.js
 ┃ ┃ ┗ 📜rateLimiter.js
 ┃ ┣ 📂views
 ┃ ┣ ┗📜error.ejs
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜shorturl.model.js
 ┃ ┃ ┗ 📜user.model.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth.routes.js
 ┃ ┃ ┣ 📜shortUrl.route.js
 ┃ ┃ ┗ 📜user.routes.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜auth.service.js
 ┃ ┃ ┗ 📜shortUrl.service.js
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜attachUser.js
 ┃ ┃ ┣ 📜errorHandler.js
 ┃ ┃ ┣ 📜helper.js
 ┃ ┃ ┗ 📜tryCatchWrapper.js
 ┣ 📜.env
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

## 🧪 Dev Notes

- Add `.env` file in the **backend root** with:

  ```env
  MONGO_URI=mongodb://localhost:27017/urlshortener
  JWT_SECRET=your_jwt_secret
  APP_URL=http://localhost:5000
  NODE_ENV=development or production
  ```

### 🧠 Expiration & Rate Limit Logic

- Rate limit per IP or `req.user._id`, defined in `rateLimiter.js`.
- `expiresAt` field is saved on short URL creation and checked during redirection.
- `redirectFromShortUrl` deletes expired URLs before rendering `error.ejs`.

## 🔐 Authentication Overview

- **Login / Registration** handled via:

  - `POST /api/auth/login`
  - `POST /api/auth/register`

- **JWT token** is stored as an **HTTP-only cookie** named `accessToken`.

- `GET /api/auth/me` returns the currently authenticated user (used for session restoration on frontend).

- `authMiddleware` protects secure routes like:
  - `POST /api/user/urls`
  - Any future authenticated endpoints

## 📚 API Endpoints

### 🔐 Auth Routes (`/api/auth`)

| Method | Route     | Protected | Description                     |
| ------ | --------- | --------- | ------------------------------- |
| POST   | /register | ❌ No     | Register a new user             |
| POST   | /login    | ❌ No     | Log in and receive token cookie |
| POST   | /logout   | ✅ Yes    | Log out and clear cookie        |
| GET    | /me       | ✅ Yes    | Get current authenticated user  |

---

### 👤 User Routes (`/api/user`)

| Method | Route | Protected | Description                          |
| ------ | ----- | --------- | ------------------------------------ |
| POST   | /urls | ✅ Yes    | Fetch all shortened URLs by the user |

---

### ✂️ Short URL Routes (`/api/create`)

| Method | Route | Protected | Description                               |
| ------ | ----- | --------- | ----------------------------------------- |
| POST   | /     | Optional  | Create a short URL (with or without user) |

> 🔸 If the request includes a cookie (authenticated user), the URL is associated with their account.  
> 🔸 Optionally supports a custom slug in the request body.

---

### 🚀 Redirect Route (`/[:slug]`)

| Method | Route       | Protected | Description                    |
| ------ | ----------- | --------- | ------------------------------ |
| GET    | /:short_url | ❌ No     | Redirects to original long URL |

---

## ✅ Notes

- All `POST` routes require JSON `Content-Type` headers.
- Auth routes rely on HTTP-only cookies for session management.
- `authMiddleware` is used to protect `/me`, `/logout`, and all `/user` routes.
- Route: `/[:slug]` is public and handles redirecting based on the shortened ID.
- ✂️ **Rate Limiting** is implemented via IP or user-based tracking using `express-rate-limit`.
- ⏳ **Short URL expiration**:
  - Unauthenticated users: 3-day expiry
  - Authenticated users: 7-day expiry
  - Expired links trigger cleanup and return a rendered `error.ejs` page.

## 🧪 Error Handling

Custom error classes are defined and used throughout the backend to ensure consistent responses:

- `AppError` – Base class for all custom errors
- `UnauthorizedError` – Used when authentication fails (e.g., missing or invalid token)
- `BadRequestError` – For invalid input or missing data
- `ConflictError` – For duplicate resources (e.g., existing custom URL or user)
- `NotFoundError` – When a resource cannot be found

All errors are caught and passed to the centralized `errorHandler` middleware, which sends formatted JSON error responses.

## 🧠 Developer Notes

- 🔐 **Passwords** are securely hashed using `bcryptjs` before being stored in the database.

- 🕐 **JWT tokens** expire in **2 days by default**, controlled via the `signToken()` helper.

- 🧩 **Session handling**:

  - `attachUser` and `authMiddleware` extract the user from `req.cookies.accessToken`
  - They verify the token and attach the authenticated user to `req.user`

- 🍪 **Cookie settings**:
  - `httpOnly`, `sameSite`, and `secure` flags are set via `cookieOptions`
  - In production, cookies are sent over HTTPS (`secure: true`)
  - Session cookies are valid for **2 days**
