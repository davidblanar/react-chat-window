import { IMessage } from "./interfaces";

export const isUnread = (message: IMessage): boolean => {
  return message.direction === "in" && message.status === "received";
};
