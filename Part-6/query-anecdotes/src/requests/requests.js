import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () =>
  axios.get(baseUrl).then((response) => response.data);

export const createAnecdote = (newNote) =>
  axios.post(baseUrl, newNote).then((res) => res.data);

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
