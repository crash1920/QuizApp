import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import Resultat from "./components/Resultat";
import Header from "./components/Header";
import "./styles/App.css";

function App() {
  return (
    <Router>
    <Header/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Resultat />} />
      </Routes>
    </Router>
  );
}

export default App;
