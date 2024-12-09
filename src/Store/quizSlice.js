import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk pour récupérer les questions depuis l'API
export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async ({ amount, category, difficulty }) => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    return response.data.results;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    score: 0,
    loading: false,
    error: null,
  },
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = "Erreur lors de la récupération des questions.";
      });
  },
});

export const { incrementScore, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;