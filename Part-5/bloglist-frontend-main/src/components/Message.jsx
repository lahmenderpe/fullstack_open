import { useEffect } from "react";

const Message = ({ messageContent, setShowMessage, setMessageContent }) => {
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
      setMessageContent({ content: "", success: false });
    }, 3000);
  }, [setMessageContent, setShowMessage]);

  const { content, success } = messageContent;

  return (
    <div className={`message ${success ? "success" : "error"}`}>{content}</div>
  );
};

export default Message;
