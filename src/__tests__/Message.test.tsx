import React from "react";
import { shallow } from "enzyme";
import Message from "../Message";

describe("Message", () => {
  it("should render correctly", () => {
    const msg = shallow(
      <Message
        onViewportEnter={jest.fn()}
        message={{
          id: 1,
          text: "my message",
          timestamp: "1",
          direction: "in",
          status: "received"
        }}
      />
    );
    expect(msg.find(".message-date").text()).toBe("01 Jan 1970 - 01:00:01");
    expect(msg.find(".message-text").text()).toBe("my message");
  });
});
