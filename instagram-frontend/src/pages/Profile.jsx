import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useGetPostsQuery } from "../features/posts/postsApiSlice";
import PostForm from "../features/posts/PostForm";
import PostModal from "../features/posts/PostModal";

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetPostsQuery();

  console.log(data);

  return (
    <div>
      <h2>Profile</h2>
      <p>
        <strong>{user}'s</strong> profile page.
      </p>
      <button onClick={() => dispatch(logOut())}>Logout</button>
      <ul>
        {data?.results?.map((post, idx) => (
          <li key={post.id}>
            <div>
              <p>{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <PostModal />
    </div>
  );
};

export default Profile;
