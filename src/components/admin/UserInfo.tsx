import { useAppDispatch } from "../../redux/hooks";
import { deleteUser } from "../../redux/slices/admin";
import { IAdminUser } from "../../types/admin.typing";
import { IUserId } from "../../types/user.typing";
import { fetchCards } from "../../redux/slices/cards";

const UserInfo = (props: {
  selectedUser: IAdminUser | undefined;
  setShowCards: React.Dispatch<React.SetStateAction<boolean>>;
  showCards: boolean;
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = (user: IAdminUser | undefined) => {
    if (user) {
      const userId: IUserId = { id: user.id };
      dispatch(deleteUser(userId));
    }
  };
  const handleShowCards = (user: IAdminUser | undefined) => {
    props.setShowCards(!props.showCards);
    if (user) {
      const userId: IUserId = { id: user.id };
      dispatch(fetchCards({ userId }));
    }
  };

  return (
    <div className="border border-black rounded-lg p-2">
      <h2 className="text-xl border-b-4">User Info</h2>
      <div className="flex flex-row">
        <div className="w-1/3 text-center border-r-4">
          <p>Id:</p>
          <p>Name:</p>
          <p>Surname:</p>
          <p>Email:</p>
        </div>
        <div className="w-2/3 text-left ml-4">
          <p>{props.selectedUser?.id}</p>
          <p>{props.selectedUser?.name}</p>
          <p>{props.selectedUser?.surname}</p>
          <p>{props.selectedUser?.email}</p>
        </div>
      </div>
      <div className="flex justify-between w-1/2 m-auto mt-4">
        <button
          onClick={() => handleDelete(props.selectedUser)}
          className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
        >
          Delete user
        </button>
        <button
          onClick={() => handleShowCards(props.selectedUser)}
          className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
        >
          {props.showCards ? "Hide cards" : "Show cards"}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
