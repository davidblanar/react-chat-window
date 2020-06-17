import React from "react";
import { IMessage } from "./interfaces";

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  return <div className="message">{message.text}</div>;
};

export default Message;
