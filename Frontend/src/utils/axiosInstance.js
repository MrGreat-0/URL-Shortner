import axios from "axios"

import store from "../store/store";
import { logout } from "../store/slice/authSlice";
import { queryClient } from "../main";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, //10s
    withCredentials: true
})

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx
        return response;
    },
    (error) => {
        // Handle different types of errors
        if (error.response) {
            // The server responded with a status code outside the 2xx range
            const { status, data } = error.response;

            const config = error.config || {};

            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;
                case 401:
                    console.error("Unauthorized:", data);
                    // You could redirect to login page or refresh token here
                    // ✅ Logout cleanup on session expiration
                    // 👉 Skip redirect for passive checks like `/me` on public pages ("skipAuthRedirect")
                    if (!config.skipAuthRedirect && !window.location.pathname.startsWith("/auth")) {
                        store.dispatch(logout()); // Clear Redux
                        queryClient.removeQueries(); // Clear React Query cache
                        window.location.href = "/auth"; // Force redirect
                    }
                    break;
                case 403:
                    console.error("Forbidden:", data);
                    break;
                case 404:
                    console.error("Not Found:", data);
                    break;
                case 500:
                    console.error("Server Error:", data);
                    break;
                default:
                    console.error(`Error (${status}):`, data);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Network Error: No response received", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error:", error.message);
        }

        // You can customize the error object before rejecting
        return Promise.reject({
            // isAxiosError: true,
            message: error.response?.data?.message || error.message || "Unknown error occurred",
            status: error.response?.status,
            data: error.response?.data,
            // originalError: error
        });
    }
);
export default axiosInstance