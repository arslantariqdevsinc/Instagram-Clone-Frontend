import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";
import Profile from "./pages/Profile";
import Signup from "./features/auth/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        {/* Public routes  */}
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        {/* Private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
