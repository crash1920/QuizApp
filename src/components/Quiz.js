import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, incrementScore } from "../Store/quizSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, loading, error } = useSelector((state) => state.quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(50); // Timer initialisé à 50 secondes

  const currentQuestion = questions[currentIndex];

  // Fonction pour décoder les entités HTML
  const decodeHtmlEntities = (text) => {
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html").body.textContent;
  };

  // Chargement des questions depuis l'API
  useEffect(() => {
    const { amount, difficulty, category } = location.state || {
      amount: 10,
      difficulty: "easy",
      category: "9", // Catégorie par défaut
    };

    if (!amount || !difficulty || !category) {
      navigate("/");
      return;
    }

    dispatch(fetchQuestions({ amount, difficulty, category }));
  }, [dispatch, location.state, navigate]);

  // Gestion du timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        handleTimeout();
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Nettoyage du timer à chaque changement
  }, [currentIndex]); // Redémarre le timer à chaque nouvelle question

  const handleTimeout = () => {
    if (!selectedAnswer) {
      setIsCorrect(false);
      setFeedback("Temps écoulé !");
      transitionToNextQuestion();
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return; // Empêche un clic multiple
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setIsCorrect(true);
      dispatch(incrementScore());
      setFeedback("Bonne réponse !");
    } else {
      setIsCorrect(false);
      setFeedback(
        `Mauvaise réponse ! La bonne réponse était : ${decodeHtmlEntities(
          currentQuestion.correct_answer
        )}`
      );
    }
    transitionToNextQuestion();
  };

  const transitionToNextQuestion = () => {
    setTimeout(() => {
      setSelectedAnswer("");
      setIsCorrect(null);
      setFeedback("");
      setTimeLeft(50); // Réinitialise le timer à 50 secondes
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        navigate("/result");
      }
    }, 2000); // 2 secondes pour afficher le feedback avant de passer
  };

  if (loading) return <p>Chargement des questions...</p>;
  if (error) return <p>{error}</p>;
  if (!currentQuestion) {
    navigate("/result");
    return null;
  }

  return (
    <div className="card">
      <h2>{decodeHtmlEntities(currentQuestion.question)}</h2>
      <p>Temps restant : {timeLeft} secondes</p>
      {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        .sort()
        .map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              backgroundColor:
                selectedAnswer === option
                  ? isCorrect === null
                    ? "black"
                    : isCorrect && option === currentQuestion.correct_answer
                    ? "lightgreen"
                    : "red"
                  : "grey",
            }}
            disabled={!!selectedAnswer} // Désactiver après avoir sélectionné une réponse
          >
            {decodeHtmlEntities(option)}
          </button>
        ))}
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Quiz;
