import axios from "axios";

const URL = "http://localhost:3001/anecdotes";

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addAnecdote = async (anecdote) => {
  try {
    const response = await axios.post(URL, asObject(anecdote));
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAnecdote = async (id) => {
  try {
    const anecdoteToUpdate = await axios.get(`${URL}/${id}`);
    const updatedAnecdote = {
      ...anecdoteToUpdate.data,
      votes: anecdoteToUpdate.data.votes + 1,
    };
    const response = await axios.put(`${URL}/${id}`, updatedAnecdote);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
