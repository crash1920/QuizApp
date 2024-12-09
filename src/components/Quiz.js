import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../Store/quizSlice";
import Question from "./Question";

const Quiz = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuestions({ amount: 10, category: "9", difficulty: "easy" }));
  }, [dispatch]);

  if (loading) {
    return <p>Chargement des questions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {questions.length > 0 ? <Question /> : <p>Pas de questions disponibles.</p>}
    </div>
  );
};

export default Quiz;
