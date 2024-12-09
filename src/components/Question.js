import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from  "../Store/quizSlice";

const Question = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      dispatch(incrementScore());
    }
    setSelectedAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  if (!currentQuestion) {
    return <p>Fin du quiz !</p>;
  }

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        .sort()
        .map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            style={{
              backgroundColor: selectedAnswer === option ? "lightblue" : "white",
            }}
          >
            {option}
          </button>
        ))}
      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
};

export default Question;
