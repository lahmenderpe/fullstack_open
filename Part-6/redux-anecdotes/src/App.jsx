import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useSelector, useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(initializeAnecdotes());
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      {state.message ? <Notification /> : ""}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
