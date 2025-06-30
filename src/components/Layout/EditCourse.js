import React, { useEffect, useState } from "react";
import Input from "../Templates/Input";
import Button from "../Templates/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  editCourseData,
  fetchAllCourses,
  fetchCourseDetails,
} from "../../store/courseSlice";

function EditCourse({ courseId, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.auth.data?.user);

  const fields = [
    { id: "title", label: "Title", required: true },
    {
      id: "description",
      label: "Description",
      required: true,
      type: "textarea",
    },
    { id: "articleLink1", label: "Article 1", required: true, type: "url" },
    { id: "articleLink2", label: "Article 2", type: "url" },
    { id: "articleLink3", label: "Article 3", type: "url" },
    { id: "videoLink1", label: "Content 1", required: true, type: "url" },
    { id: "videoLink2", label: "Content 2", type: "url" },
    { id: "videoLink3", label: "Content 3", type: "url" },
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      const data = await dispatch(
        fetchCourseDetails({ userId: user.userId, courseId })
      );
      if (Array.isArray(data.payload) && data.payload.length > 0) {
        setFormData(data.payload[0]);
      }
    };
    fetchCourseData();
  }, [courseId, dispatch, user.userId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        editCourseData({ formData, courseId })
      ).unwrap();

      setFormData(data);
      onClose(data);
      alert(`${data.title} course updated successfully!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Input fields={fields} formData={formData} onChange={handleChange} />
      <Button
        className="mt-6 w-full"
        type="button"
        label="Update Course"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default EditCourse;
