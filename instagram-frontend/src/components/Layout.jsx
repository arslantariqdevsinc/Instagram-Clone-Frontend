import { Outlet, Link } from "react-router-dom";
// import Navbar from "../components/Navigation/Navbar";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <nav>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
