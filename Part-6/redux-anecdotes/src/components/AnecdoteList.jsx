import { useSelector, useDispatch } from "react-redux";
import { handleVoteAnecdote } from "../reducers/anecdoteReducer";
import { handleShowNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const vote = (anecdote) => {
    dispatch(handleVoteAnecdote(anecdote.id));
    dispatch(handleShowNotification(`You voted "${anecdote.content}"`, 5));
  };

  const anecdotesToShow = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
