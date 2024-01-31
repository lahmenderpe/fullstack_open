const Form = ({ children, buttonText, onsubmit }) => {
  return (
    <form onSubmit={onsubmit}>
      {children}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default Form;
