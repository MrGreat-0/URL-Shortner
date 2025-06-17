# URL Shortener – Frontend

This is the React-based frontend for the URL Shortener application. It manages authentication, short URL creation, and displays user-specific links using a modern SPA architecture with TanStack Router, Redux Toolkit, and Axios.

## ⚙️ Tech Stack

- **React JS**
- **Redux Toolkit** (for auth state)
- **TanStack Router** (for route protection and data loading)
- **Axios** with interceptors (for token-aware API calls)
- **TanStack Query** (for caching and revalidation)
- **Tailwind CSS** (for styling)

## 📁 Project Structure

```bash
📦Frontend
 ┣ 📂public
 ┃ ┗ 📜link.svg
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜shortUrl.api.js
 ┃ ┃ ┗ 📜user.api.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜AuthLoader.jsx
 ┃ ┃ ┣ 📜LoginForm.jsx
 ┃ ┃ ┣ 📜NavBar.jsx
 ┃ ┃ ┣ 📜RegisterForm.jsx
 ┃ ┃ ┣ 📜UrlForm.jsx
 ┃ ┃ ┗ 📜UserUrl.jsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜AuthPage.jsx
 ┃ ┃ ┣ 📜DashboardPage.jsx
 ┃ ┃ ┗ 📜HomePage.jsx
 ┃ ┣ 📂routing
 ┃ ┃ ┣ 📜auth.route.js
 ┃ ┃ ┣ 📜dashboard.js
 ┃ ┃ ┣ 📜homepage.js
 ┃ ┃ ┣ 📜redirectIfAuthenticated.js
 ┃ ┃ ┗ 📜routeTree.js
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📂actions
 ┃ ┃ ┃ ┗ 📜auth.actions.js
 ┃ ┃ ┣ 📂slice
 ┃ ┃ ┃ ┗ 📜authSlice.js
 ┃ ┃ ┗ 📜store.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜axiosInstance.js
 ┃ ┃ ┗ 📜helper.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.jsx
 ┃ ┗ 📜RootLayout.jsx
 ┣ 📜.env
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜vercel.json
 ┗ 📜vite.config.js
```

## 🧪 Dev Notes

- Add `.env` file in the **frontend root** with

  ```env
  VITE_API_BASE_URL=http://localhost:5000
  ```

## 🌐 Frontend API Usage

Below are the backend API routes used in the frontend, with their purpose and the component/page that uses them:

| API Endpoint             | Method | Used In                        | Purpose                             |
| ------------------------ | ------ | ------------------------------ | ----------------------------------- |
| `/api/auth/register`     | POST   | `RegisterForm.jsx`             | Register a new user                 |
| `/api/auth/login`        | POST   | `LoginForm.jsx`                | Log in and store cookie             |
| `/api/auth/logout`       | POST   | `Navbar.jsx`                   | Log out and clear cookie/state      |
| `/api/auth/me`           | GET    | `AuthLoader.jsx`, route guards | Restore session / check auth        |
| `/api/user/urls`         | POST   | `UserUrl.jsx`                  | Get logged-in user's shortened URLs |
| `/api/create`            | POST   | `UrlForm.jsx`                  | Create a new short URL              |
| `/:slug` (external link) | GET    | —                              | Used by `<a href>` to redirect      |

> ✅ All API calls are made using the `axiosInstance.js`, which handles:
>
> - Credentials (`withCredentials: true`)
> - Interceptors for `401` errors (auto logout)
> - Base URL via `VITE_API_BASE_URL`

## 🔐 Authentication Handling

- `/api/auth/me` checks if the session is valid.
- If a request fails with `401`:
  - Interceptor clears Redux + TanStack Query
  - Redirects user to `/auth` **unless** `skipAuthRedirect: true` is set.

## 🚦 Route Guards

- `/auth` and `/` use `redirectIfAuthenticated` to redirect logged-in users to `/dashboard`
- `/dashboard` uses `checkAuth` to prevent unauthorized access
