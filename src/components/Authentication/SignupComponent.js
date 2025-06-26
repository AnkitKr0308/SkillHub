import React, { useEffect, useState } from "react";
import Input from "../Templates/Input";
import { getRoles } from "../../API/authentication";
import Dropdown from "../Templates/Dropdown";
import Button from "../Templates/Button";
import { createAccount } from "../../store/authSlice";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import Modal from "../Templates/Modal";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
  const [showModal, SetShowModal] = useState(true);
  const [formData, SetFormData] = useState({});
  const [roles, SetRoles] = useState([]);
  // const [successMsg, SetSuccessMsg] = useState(false);
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
    // if (result.success) {
    //   SetSuccessMsg(true);
    // } else {
    //   SetSuccessMsg(false);
    //   alert(result.message);
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
    navigate(-1);
  };

  return (
    <div>
      {showModal && (
        <Modal header={"Create An Account"} onClose={closeModal}>
          <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
            {/* <header className="font-bold mb-3 text-3xl text-white bg-orange-600 rounded">
          Create Your Account
        </header> */}

            <Input
              fields={fields}
              formData={formData}
              onChange={handleChange}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            <div className="mt-6">
              <Button label="Submit" type="submit" />
            </div>
            {/* {successMsg && (
          <div className="mt-6 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
            <p className="text-sm">
              Your account has been successfully created.{" "}
              <Link
                to="/login"
                className="font-semibold underline text-blue-600 hover:text-blue-800"
              >
                Log in
              </Link>{" "}
              to explore learnings!
            </p>
          </div>
        )} */}
          </form>
        </Modal>
      )}
    </div>
  );
}

export default SignupComponent;
