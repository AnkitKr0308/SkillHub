import React, { useEffect, useState } from "react";
import Input from "../Templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetails } from "../../store/courseSlice";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data?.user);

  const { courseId } = useParams();

  const [formData, SetFormData] = useState({});

  const fields = [
    {
      id: "title",
      name: "title",
      label: "Title",
      readOnly: true,
      className: "text-black",
    },
    {
      id: "description",
      name: "description",
      label: "Description",
      readOnly: true,
      className: "text-black",
    },
    {
      id: "articleLink1",
      name: "articleLink1",
      label: "Article 1",
      readOnly: true,
      type: "url",
      className: "text-black",
    },
    {
      id: "articleLink2",
      name: "articleLink2",
      label: "Article 2",
      readOnly: true,
      type: "url",
      className: "text-black",
    },
    {
      id: "articleLink3",
      name: "articleLink3",
      label: "Article 3",
      readOnly: true,
      type: "url",
      className: "text-black",
    },
    {
      id: "videoLink1",
      name: "videoLink1",
      label: "Content 1",
      readOnly: true,
      type: "URL",
      className: "text-black",
    },
    {
      id: "videoLink2",
      name: "videoLink2",
      label: "Content 2",
      readOnly: true,
      type: "url",
      className: "text-black",
    },
    {
      id: "videoLink3",
      name: "videoLink3",
      label: "Content 3",
      readOnly: true,
      type: "url",
      className: "text-black",
    },
    {
      id: "comments",
      name: "comments",
      label: "Comments",
      readOnly: false,
      type: "textarea",

      className: "text-black",
    },
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      const data = await dispatch(
        fetchCourseDetails({ userId: user.userId, courseId })
      );
      if (Array.isArray(data.payload) && data.payload.length > 0) {
        SetFormData(data.payload[0]);
      }
    };
    fetchCourseData();
  }, [courseId, dispatch, user.userId]);

  const onCommentChange = (e) => {
    const { id, value } = e.target;
    SetFormData((prev) => ({ ...prev, [id]: value }));
  };

  const visibleFields = fields.filter(
    (field) =>
      formData[field.id] !== null &&
      formData[field.id] !== "" &&
      formData[field.id] !== undefined
  );

  return (
    <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8 mb-8">
      <div className="w-full max-w-4xl mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
          Course Details
        </h1>
        <Input
          fields={visibleFields}
          formData={formData}
          onChange={onCommentChange}
        />
      </div>
    </div>
  );
}

export default CourseDetails;
