import { IAdminUser } from "../../types/admin.typing";

const UserItem = (props: {
  user: IAdminUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<IAdminUser | undefined>>;
}) => {
  const handleClick = () => {
    props.setSelectedUser(props.user);
  };
  return (
    <button
      onClick={handleClick}
      className="hover:bg-black hover:text-white text-lg rounded-lg"
    >
      {props.user.username}
    </button>
  );
};

export default UserItem;
