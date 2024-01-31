import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const { buttonText, children } = props;

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <section>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </section>
  );
});

Togglable.displayName = Togglable;

export default Togglable;
