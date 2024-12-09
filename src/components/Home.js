import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(""); // Ajout du paramètre catégorie
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (amount < 1 || amount > 50) {
      setError("Le nombre de questions doit être entre 1 et 50.");
      return;
    }
    if (!category) {
      setError("Veuillez sélectionner une catégorie.");
      return;
    }
    setError(""); // Clear error
    navigate("/quiz", { state: { amount, difficulty, category } });
  };

  return (
    <div className="card">
      <h1>Bienvenue au Quiz</h1>
      <div className="labels">
      <label>
        Nombre de questions :
        <input
          type="number"
          min="1"
          max="50"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Difficulté :
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Facile</option>
          <option value="medium">Moyenne</option>
          <option value="hard">Difficile</option>
        </select>
      </label>
      <label>
        Catégorie :
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Sélectionnez une catégorie --</option>
          <option value="9">Culture Générale</option>
          <option value="11">Films</option>
          <option value="15">Jeux Vidéo</option>
          <option value="17">Science et Nature</option>
          <option value="21">Sports</option>
        </select>
      </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleStartQuiz}>Commencer le Quiz</button>
      
    </div>
  );
};

export default Home;
