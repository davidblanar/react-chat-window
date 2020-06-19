import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import { IMessage } from "./interfaces";
import { isUnread } from "./util";

interface Props {
  message: IMessage;
  observer: IntersectionObserver;
}

const checkmark = String.fromCharCode(10003);

const Message: React.FC<Props> = ({ message, observer }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && isUnread(message)) {
      observer.observe(ref.current);
    }
  }, []);

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

  const getMessageClassName = () => {
    return `message flex ${
      message.direction === "in" ? "justify-start" : "justify-end"
    }`;
  };

  const date = new Date(parseInt(message.timestamp) * 1000);
  const formattedDate = format(date, "dd MMM yyyy - HH:mm:ss");
  return (
    <div className={getMessageClassName()} ref={ref} data-id={message.id}>
      <div className="w-3/4 p-2 mt-4 border-solid border border-gray-600 rounded-m">
        <p className="message-date text-gray-600 text-xs">{formattedDate}</p>
        <p className="message-text text-sm font-bold flex justify-between">
          {message.text}
          {message.direction === "out" && renderCheckmarks()}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Message);
