import { useEffect } from "react";
import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/userSlice";
import { getUser } from "./utils/user";
import Draw from "./pages/Draw";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const user = await getUser()
      dispatch(
        setUser(user)
      )
    })()
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={
        <RequireAuth loginPath={'/login'}>
          <Dashboard />
        </RequireAuth>
      }></Route>
      <Route path="/draw/:id" element={
        <RequireAuth loginPath={'/login'}>
          <Draw />
        </RequireAuth>
      }></Route>
      <Route path="*" element={<div>404</div>}></Route>
    </Routes>
  );
};

export default App;