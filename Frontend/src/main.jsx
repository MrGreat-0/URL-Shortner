import "./index.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing/routeTree.js";
import store from "./store/store.js";
import { Provider } from "react-redux";
import AuthLoader from "./components/AuthLoader.jsx";
import Spinner from "./components/Spinner.jsx";

export const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthLoader>
        <RouterProvider router={router} defaultPendingComponent={Spinner} />
      </AuthLoader>
    </QueryClientProvider>
  </Provider>
);
