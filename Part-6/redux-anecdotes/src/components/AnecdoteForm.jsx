import { useDispatch } from "react-redux";
import { appendNewAnecdote } from "../reducers/anecdoteReducer";
import { handleShowNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(appendNewAnecdote(content));
    dispatch(handleShowNotification(`You create "${content}"`, 5));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => add(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
