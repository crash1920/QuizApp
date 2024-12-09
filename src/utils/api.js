import axios from "axios";

export const fetchQuestions = async (amount, category, difficulty) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const response = await axios.get(url);
  return response.data.results;
};
