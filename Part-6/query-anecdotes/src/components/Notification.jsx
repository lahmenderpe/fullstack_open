import { useNotificationContext } from "../context/notificationContext";

const Notification = () => {
  const { isVisible, message } = useNotificationContext();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!isVisible) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
