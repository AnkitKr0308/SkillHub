import React, { useEffect, useState } from "react";
import DataTable from "../Templates/DataTable";
import { fetchAllUsers, removeUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Templates/Modal";
import UpdateUser from "./UpdateUser";

function UserComponent() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { id: "userid", label: "User ID", type: "text", readOnly: true },
    { id: "name", label: "Name", type: "text", readOnly: true },
    { id: "email", label: "Email", type: "email", readOnly: true },
    { id: "role", label: "Role", type: "text", readOnly: true },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = dispatch(fetchAllUsers());
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const data = users.map((user) => ({
    userid: user.userId,
    name: user.firstName + " " + user.lastName,
    email: user.email,
    role: user.role,
  }));

  const handleEdit = (row) => {
    const user = users.find((user) => user.userId === row.userid);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUpdate = () => {
    dispatch(fetchAllUsers());

    handleModalClose();
  };

  const handleDeleteUser = async (row) => {
    const user = users.find((user) => user.userId === row.userid);
    await dispatch(removeUser(user.userId));
    await dispatch(fetchAllUsers());
  };

  return (
    <div className="p-14">
      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDeleteUser}
      />
      {showModal && (
        <Modal header="Update User Detail" onClose={handleModalClose}>
          <UpdateUser
            userId={selectedUser.userId}
            initialData={selectedUser}
            onUpdate={handleUpdate}
          />
        </Modal>
      )}
    </div>
  );
}

export default UserComponent;
