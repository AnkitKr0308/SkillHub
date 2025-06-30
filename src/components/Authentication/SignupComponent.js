import React, { useEffect, useState } from "react";
import Input from "../Templates/Input";
import { getRoles } from "../../API/authentication";
import Dropdown from "../Templates/Dropdown";
import Button from "../Templates/Button";
import { createAccount } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import Modal from "../Templates/Modal";
import { Link, useNavigate } from "react-router-dom";

function SignupComponent() {
  const [showModal, SetShowModal] = useState(true);
  const [formData, SetFormData] = useState({});
  const [roles, SetRoles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fields = [
    {
      id: "FirstName",
      name: "FirstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    { id: "LastName", name: "LastName", label: "Last Name", required: true },
    {
      id: "Email",
      name: "Email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email address",
    },

    {
      id: "Password",
      name: "Password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Enter Password",
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    SetFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createAccount(formData)).unwrap();

    navigate("/dashboard");
  };

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

  const closeModal = () => {
    SetShowModal(false);
    navigate("/");
  };

  return (
    <div>
      {showModal && (
        <Modal header={"Create An Account"} onClose={closeModal}>
          <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
            <Input
              fields={fields}
              formData={formData}
              onChange={handleChange}
            />
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
                onSelect={(value) =>
                  SetFormData((prev) => ({ ...prev, RoleId: value }))
                }
              />
            </div>
            <div className="mt-6">
              <Button className="w-full" label="Submit" type="submit" />
            </div>
            <div className="mt-6 flex justify-center">
              <p className="text-white">
                Already have an account?{" "}
                <Link className="text-blue-500 underline" to="/login">
                  Click here to login
                </Link>
              </p>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default SignupComponent;
