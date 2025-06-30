import React, { useEffect, useState } from "react";
import Card from "../Templates/Card";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Templates/Button";
import { getEnrolledCourses } from "../../store/courseSlice";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
  const [enrolledcourses, SetEnrolledCourses] = useState([]);
  const user = useSelector((state) => state.auth.data?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, SetCount] = useState();

  useEffect(() => {
    const fetchEnrolledData = async () => {
      const data = await dispatch(getEnrolledCourses({ userId: user.userId }));
      SetEnrolledCourses(data.payload);
      if (data.payload.length === 0) {
        SetCount(0);
      }
    };
    fetchEnrolledData();
  }, [dispatch, user.userId]);

  if (count === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-green-900">
          You don't have any enrolled courses.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.isArray(enrolledcourses) &&
          enrolledcourses.map((card) => {
            return (
              <Card
                key={card.courseId}
                title={card.title}
                description={card.description}
              >
                <Button
                  className="w-3/4"
                  onClick={() => navigate(`/my-learning/${card.courseId}`)}
                  label={"Learn More..."}
                />
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default EnrolledCourses;
