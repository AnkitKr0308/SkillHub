import React, { useState } from "react";
import Input from "../Templates/Input";
import Button from "../Templates/Button";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../Templates/Modal";

function LoginComponent() {
  const [formData, SetFormData] = useState({});
  const [ErrorMsg, SetErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, SetShowModal] = useState(true);

  const fields = [
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password...",
    },
  ];

  const handleChange = async (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    SetFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData)).unwrap();
    if (result.success) {
      navigate("/dashboard");
    } else {
      SetErrorMsg(result.msg);
    }
  };

  const closeModal = () => {
    SetShowModal(false);
    navigate(-1);
  };

  return (
    <div>
      {showModal && (
        <Modal header={"Login to your Account"} onClose={closeModal}>
          <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
            {ErrorMsg && (
              <label className="block mt-4 text-sm font-medium text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded">
                {ErrorMsg}
              </label>
            )}

            <Input
              fields={fields}
              formData={formData}
              onChange={handleChange}
            />

            <div className="mt-6">
              <Button label="Login" type="submit" />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default LoginComponent;
