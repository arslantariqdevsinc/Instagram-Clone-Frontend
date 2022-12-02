import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isSuccess) {
    console.log(users);
    return (
      <div>
        <ul>
          {users.results?.map((user, i) => {
            return <li key={i}> {user.username}</li>;
          })}
        </ul>
      </div>
    );
  } else if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }
};

export default UsersList;
