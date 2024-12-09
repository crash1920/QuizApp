import { useSelector } from "react-redux";


const Resultat = () => {
  const { score, questions, setScore, setQuestions } = useSelector((state) => state.quiz); 


  const handleRetry = () => {
    setScore(0);
    setQuestions([]);
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
