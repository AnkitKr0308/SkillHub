import React, { useEffect, useState } from "react";
import Card from "../Templates/Card";
import { fetchAllCourses } from "../../store/courseSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function ExploreCourse() {
  const [cardList, SetCardList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      const data = await dispatch(fetchAllCourses());
      SetCardList(data.payload);
    };
    fetchCards();
  }, [dispatch]);

  const exploreCard = () => {
    navigate("");
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.isArray(cardList) &&
          cardList.map((card) => (
            <Card
              key={card.courseId}
              title={card.title}
              description={card.description}
              onButtonClick={exploreCard}
              buttonText={"Enroll to Learn More"}
            />
          ))}
      </div>
    </div>
  );
}

export default ExploreCourse;
