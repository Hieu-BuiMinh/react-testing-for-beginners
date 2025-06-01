import { User } from "../entities";

const UserAccount = ({ user }: { user: User }) => {
  return (
    <>
      <h2>User Profile</h2>
      {user.isAdmin && <button role="button">Edit</button>}
      <div>
        <strong>Name:</strong> {user.name}
      </div>
    </>
  );
};

export default UserAccount;
