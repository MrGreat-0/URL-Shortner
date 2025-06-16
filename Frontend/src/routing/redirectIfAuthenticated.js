import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const redirectIfAuthenticated = async ({ context }) => {
    const { queryClient, store } = context;

    try {
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });

        if (user) {
            store.dispatch(login(user)); // sync Redux just in case
            return redirect({ to: "/dashboard" });
        }
    } catch (err) {
        // Not authenticated — allow access
        return;
    }
};
