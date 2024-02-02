import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  if (action.type === "SHOW_MESSAGE") {
    return { isVisible: true, message: action.payload };
  }

  if (action.type === "HIDE_MESSAGE") {
    return { isVisible: false, message: "" };
  }

  return state;
};

const initialState = {
  isVisible: false,
  message: "",
};

const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showMessage = (message) => {
    dispatch({ type: "SHOW_MESSAGE", payload: message });
    setTimeout(() => {
      hideMessage();
    }, 5000);
  };

  const hideMessage = () => {
    dispatch({ type: "HIDE_MESSAGE" });
  };

  return (
    <NotificationContext.Provider
      value={{ ...state, showMessage, hideMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
