export type Direction = "in" | "out";
export type Status = "sent" | "received" | "read";

export interface IMessage {
  id: number;
  direction: Direction;
  status: Status;
  timestamp: string;
  text: string;
}
