// This version uses Redux's createAsyncThunk to manage async logic centrally("fetchCurrentUser").

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getCurrentUser } from "../../api/user.api";

// export const fetchCurrentUser = createAsyncThunk(
//     "auth/fetchCurrentUser",
//     async (_, thunkAPI) => {
//         try {
//             const data = await getCurrentUser();
//             return data;
//         } catch (err) {
//             return thunkAPI.rejectWithValue("User not authenticated");
//         }
//     }
// );
