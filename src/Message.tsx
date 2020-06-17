import React from "react";
import { format } from "date-fns";
import { IMessage } from "./interfaces";

interface Props {
  message: IMessage;
}

const checkmark = String.fromCharCode(10003);

const Message: React.FC<Props> = ({ message }) => {
  const renderCheckmarks = () => {
    switch (message.status) {
      case "sent":
        return <span>{checkmark}</span>;
      case "received":
        return (
          <span>
            {checkmark}
            {checkmark}
          </span>
        );
      case "read":
        return (
          <span className="text-blue-500">
            {checkmark}
            {checkmark}
          </span>
        );
      default:
        return null;
    }
  };

  const date = new Date(parseInt(message.timestamp) * 1000);
  const formattedDate = format(date, "dd MMM yyyy - HH:mm:ss");
  return (
    <div
      className={`flex ${
        message.direction === "in" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="w-3/4 p-2 mt-4 border-solid border border-gray-600 rounded-md">
        <p className="text-gray-600 text-xs">{formattedDate}</p>
        <p className="text-sm font-bold flex justify-between">
          {message.text}
          {message.direction === "out" && renderCheckmarks()}
        </p>
      </div>
    </div>
  );
};

export default Message;
