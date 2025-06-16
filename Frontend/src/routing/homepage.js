import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import HomePage from "../pages/HomePage"
import { redirectIfAuthenticated } from "./redirectIfAuthenticated"

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  beforeLoad: redirectIfAuthenticated,
})