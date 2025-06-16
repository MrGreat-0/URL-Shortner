import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slice/authSlice";
import { getCurrentUser } from "../api/user.api";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(login(data));
      } catch (err) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, []);

  return children;
};

export default AuthLoader;


// This version uses Redux's createAsyncThunk to manage async logic centrally("fetchCurrentUser").

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchCurrentUser } from "../store/actions/auth.actions";

// const AuthLoader = ({ children }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, []);

//   return children;
// };

// export default AuthLoader;
