import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../Store/quizSlice";
import { useNavigate } from "react-router-dom";

const Resultat = () => {
  const { score, questions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRetry = () => {
    dispatch(resetQuiz());
    navigate("/");
  };

  return (
    <div>
      <h1>Quiz Terminé</h1>
      <p>Votre score est : {score} / {questions.length}</p>
      <button onClick={handleRetry}>Rejouer</button>
    </div>
  );
};

export default Resultat;
