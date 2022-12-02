import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Profile</h2>
      <p>
        <strong>{user}'s</strong> profile page.
        <Link to="/userslist">ASDSADSA</Link>
      </p>
      <button onClick={() => dispatch(logOut())}>Logout</button>
    </div>
  );
};

export default Profile;
