import { createSlice } from "@reduxjs/toolkit";
import {
  getAnecdotes,
  addAnecdote,
  updateAnecdote,
} from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnectode(state, action) {
      const newState = state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
      return newState;
    },
    addNewAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnectode, addNewAnecdote, setAnecdotes } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await addAnecdote(content);
    dispatch(addNewAnecdote(newAnecdote));
  };
};

export const handleVoteAnecdote = (id) => {
  return async (dispatch) => {
    anecdotesSlice;
    const response = await updateAnecdote(id);
    dispatch(voteAnectode(response));
  };
};

export default anecdotesSlice.reducer;
