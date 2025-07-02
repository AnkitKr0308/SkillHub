import React, { useEffect, useState } from "react";
import Card from "../Templates/Card";
import {
  archivecourseslice,
  enrollingcourse,
  fetchAllCourses,
  getEnrolledCourses,
} from "../../store/courseSlice";

import { useDispatch, useSelector } from "react-redux";
import Button from "../Templates/Button";
import { useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";
import Modal from "../Templates/Modal";

function ExploreCourse() {
  const [cardList, SetCardList] = useState([]);
  const user = useSelector((state) => state.auth.data?.user);
  const dispatch = useDispatch();
  const [enrolledcourses, SetEnrolledCourses] = useState([]);
  const [hoveredCourseId, SetHoveredCourseId] = useState(null);
  const [selectedCourseId, SetSelectedCourseId] = useState(null);
  const [showEditModal, SetShowEditModal] = useState(false);

  const navigate = useNavigate();

  const closeModal = async (updatedcourse = null) => {
    SetShowEditModal(false);
    if (updatedcourse) {
      SetCardList((prev) =>
        prev.map((course) =>
          course.courseId === updatedcourse.courseId ? updatedcourse : course
        )
      );
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      const data = await dispatch(fetchAllCourses());
      SetCardList(data.payload);
    };
    fetchCards();
  }, [dispatch]);

  useEffect(() => {
    const EnrolledCoursebyUser = async () => {
      try {
        const result = await dispatch(
          getEnrolledCourses({ userId: user.userId })
        );

        if (result.payload) {
          SetEnrolledCourses(
            result.payload.map((item) => item.courseId ?? item)
          );
        }
      } catch (error) {
        console.error("Error fetching enrolled courses", error);
      }
    };
    EnrolledCoursebyUser();
  }, [dispatch, user.userId]);

  const exploreCard = async (courseId) => {
    const formData = {
      courseId: courseId,
      userId: user?.userId,
      comments: "",
      status: "Not Started",
    };

    try {
      await dispatch(enrollingcourse(formData));

      SetEnrolledCourses((prev) => [...enrolledcourses, courseId]);
    } catch (error) {
      alert("Failed to enroll");
      console.error("Failed to enroll", error);
    }
  };

  const handleEditCourse = async (courseId) => {
    SetShowEditModal(true);
    SetSelectedCourseId(courseId);
  };

  const handleArchiveCourse = async (courseId) => {
    try {
      const response = await dispatch(archivecourseslice(courseId)).unwrap();
      if (response) {
        SetCardList((prev) =>
          prev.filter((card) => card.courseId !== courseId)
        );
        alert("Course deleted successfully!");
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error archiving course", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.isArray(cardList) &&
          cardList.map((card) => {
            const isEnrolled = enrolledcourses.includes(card.courseId);
            return (
              <Card
                key={card.courseId}
                title={card.title}
                description={card.description}
                onEdit={() => {
                  handleEditCourse(card.courseId);
                }}
                onDelete={() => {
                  handleArchiveCourse(card.courseId);
                }}
              >
                <Button
                  className="w-3/4"
                  label={
                    isEnrolled
                      ? hoveredCourseId === card.courseId
                        ? "Click to Explore"
                        : "ENROLLED"
                      : "Enroll to Learn More"
                  }
                  onClick={
                    isEnrolled
                      ? () => navigate(`/my-learning/${card.courseId}`)
                      : () => exploreCard(card.courseId)
                  }
                  onMouseEnter={() => {
                    isEnrolled && SetHoveredCourseId(card.courseId);
                  }}
                  onMouseLeave={() => {
                    isEnrolled && SetHoveredCourseId(null);
                  }}
                />
              </Card>
            );
          })}
      </div>
      {showEditModal && (
        <Modal header="Edit Course" onClose={closeModal}>
          <EditCourse courseId={selectedCourseId} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default ExploreCourse;
