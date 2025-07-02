import React, { useEffect, useState } from "react";
import Input from "../Templates/Input";
import Dropdown from "../Templates/Dropdown";
import { getRoles } from "../../API/authentication";
import Button from "../Templates/Button";
import { useDispatch } from "react-redux";
import { editUsers } from "../../store/userSlice";

function UpdateUser({ userId, initialData = {}, onUpdate }) {
  const [formData, SetFormData] = useState(initialData);
  const [roles, SetRoles] = useState([]);
  const dispatch = useDispatch();

  const fields = [
    {
      id: "firstName",
      name: "FirstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    { id: "lastName", name: "LastName", label: "Last Name", required: true },
    {
      id: "email",
      name: "Email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email address",
    },
  ];

  useEffect(() => {
    SetFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      if (Array.isArray(data)) {
        const convert = data.map((role) => ({
          label: role.role,
          value: role.id,
        }));
        SetRoles(convert);
      } else {
        console.error("Expected Array, got: ", data);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    SetFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editUsers({ userId, formData }));
    onUpdate?.();
  };

  return (
    <div>
      <Input fields={fields} formData={formData} onChange={handleChange} />
      <div className="flex items-center gap-28 mt-4 mb-4">
        <label
          htmlFor="RoleId"
          className="text-sm font-medium text-gray-900 dark:text-white min-w-max"
        >
          Role
        </label>
        <Dropdown
          id="RoleId"
          items={roles}
          selectable="true"
          label="Roles"
          selectedValue={formData.roleId}
          onSelect={(value) =>
            SetFormData((prev) => ({ ...prev, RoleId: value }))
          }
        />
      </div>
      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          className="w-full"
          label="Update User"
          type="button"
        />
      </div>
    </div>
  );
}

export default UpdateUser;
