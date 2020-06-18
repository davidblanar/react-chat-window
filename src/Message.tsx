import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { IMessage } from "./interfaces";
import { isUnread } from "./util";

interface Props {
  message: IMessage;
  onViewportEnter: (messageId: number) => void;
  style?: CSSProperties;
}

const checkmark = String.fromCharCode(10003);

const Message: React.FC<Props> = ({ message, onViewportEnter, style }) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const observerCb = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onViewportEnter(message.id);
        observer.disconnect();
      }
    });
  };

  useEffect(() => {
    if (isUnread(message)) {
      const options = {
        rootMargin: "0px 0px 90px 0px",
        threshold: 0.5
      };
      setObserver(new IntersectionObserver(observerCb, options));
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }
  }, [observer]);

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
    <div className={getMessageClassName()} ref={ref} style={style}>
      <div className="w-3/4 p-2 mt-4 border-solid border border-gray-600 rounded-m">
        <p className="text-gray-600 text-xs">{formattedDate}</p>
        <p className="text-sm font-bold flex justify-between">
          {message.text}
          {message.direction === "out" && renderCheckmarks()}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Message);
