import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slice/authSlice";
import { getCurrentUser } from "../api/user.api";
import Spinner from "./Spinner";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(login(data));
      } catch (err) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return <>{loading ? <Spinner /> : children}</>;
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
