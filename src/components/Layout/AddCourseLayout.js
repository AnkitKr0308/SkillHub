import React, { useState } from "react";
import Modal from "../Templates/Modal";
import Input from "../Templates/Input";
import { useNavigate } from "react-router-dom";
import Button from "../Templates/Button";
import { useDispatch } from "react-redux";
import { addCourseDetails } from "../../store/courseSlice";

function AddCourseLayout() {
  const [showModal, SetShowModal] = useState(true);
  const [formData, SetFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    { id: "title", label: "Title", required: true },
    { id: "description", label: "Description", required: true },
    { id: "articleLink1", label: "Article 1", required: true, type: "url" },
    { id: "articleLink2", label: "Article 2", type: "url" },
    { id: "articleLink3", label: "Article 3", type: "url" },
    { id: "videoLink1", label: "Content 1", required: true, type: "url" },
    { id: "videoLink2", label: "Content 2", type: "url" },
    { id: "videoLink3", label: "Content 3", type: "url" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    SetFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addCourseDetails(formData)).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      SetShowModal(false);
      navigate(-1);
    }
  };

  const closeModal = () => {
    SetShowModal(false);
    navigate(-1);
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={closeModal} header={"Add Course"}>
          <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
            <Input
              fields={fields}
              formData={formData}
              onChange={handleChange}
            />
            <Button type="submit" label="Add Course" />
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AddCourseLayout;
