import { IMessage } from "../interfaces";
import { isUnread } from "../util";

describe("util", () => {
  it("should correctly identify read message", () => {
    const m1: IMessage = {
      id: 1,
      text: "",
      timestamp: "1",
      direction: "in",
      status: "received"
    };
    expect(isUnread(m1)).toBe(true);

    const m2: IMessage = {
      id: 2,
      text: "",
      timestamp: "1",
      direction: "out",
      status: "received"
    };
    expect(isUnread(m2)).toBe(false);

    const m3: IMessage = {
      id: 3,
      text: "",
      timestamp: "1",
      direction: "in",
      status: "read"
    };
    expect(isUnread(m3)).toBe(false);

    const m4: IMessage = {
      id: 1,
      text: "",
      timestamp: "1",
      direction: "out",
      status: "read"
    };
    expect(isUnread(m4)).toBe(false);
  });
});
