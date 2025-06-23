import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import NotFoundPage from "../pages/NotFoundPage";

export const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "*",
    component: NotFoundPage,
});
    