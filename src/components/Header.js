import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
    const score = useSelector((state) => state.quiz.score);

  return (
    <header>
      <h1>Quiz Interactif</h1>
      <p>Score: {score}</p>
    </header>
  );
};

export default Header;
