import { useSelector, useDispatch } from "react-redux";
import { handleVoteAnecdote } from "../reducers/anecdoteReducer";
import { handleShowNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const vote = (anecdote) => {
    dispatch(handleVoteAnecdote(anecdote.id));
    dispatch(handleShowNotification(`You voted "${anecdote.content}"`, 5));
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
  const anecdotesToShow = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

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
