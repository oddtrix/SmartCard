import React from "react";
import { Navigate } from "react-router-dom";
import { getAdmin } from "../../helpers/additionFunction";
import { IRole } from "../../types/user.typing";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/slices/admin";
import UserItem from "./UserItem";
import UserInfo from "./UserInfo";
import { IAdminUser } from "../../types/admin.typing";
import UserCards from "./UserCards";

const AdminPage = () => {
  const admin: IRole = getAdmin();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.admin.users.items);

  const [showCards, setShowCards] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<IAdminUser>();

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl">Admin Panel</h1>
      </div>

      {admin.role !== null ? (
        admin.role === "Admin" ? (
          true
        ) : (
          <Navigate to="/signin" />
        )
      ) : (
        <Navigate to="/signin" />
      )}
      <div className="flex flex-row justify-between h-[600px]">
        <div className="border border-black w-1/4 rounded-lg p-2 ">
          <h2 className="text-xl border-b-4">Users</h2>
          <div className="flex flex-col">
            {users.map((user: IAdminUser) => (
              <UserItem
                user={user}
                key={user.id}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </div>
        </div>

        <div className="w-4/6">
          <UserInfo
            selectedUser={selectedUser}
            showCards={showCards}
            setShowCards={setShowCards}
          />

          {showCards ? (
            <UserCards selectedUser={selectedUser} pageSize={5} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
