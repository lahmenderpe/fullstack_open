import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests/requests";
import { useNotificationContext } from "../context/notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: queryClient.invalidateQueries("notes"),
    onError: (error) => {
      showMessage(error.response.data.error);
    },
  });
  const { showMessage } = useNotificationContext();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    showMessage(`You created "${content}"`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
