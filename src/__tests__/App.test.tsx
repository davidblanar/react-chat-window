import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import { IMessage } from "../interfaces";

describe("App", () => {
  it("should render correctly", () => {
    const app = shallow(<App />);
    expect(app.find("p").text()).toBe("Unread messages: 47");
    expect(app.find(".chat-window").children().length).toBe(500);
  });

  it("should update input", () => {
    const app = shallow(<App />);
    const event = {
      currentTarget: {
        value: "my value"
      }
    };
    app.find("textarea").simulate("change", event);
    expect(app.state("input")).toBe(event.currentTarget.value);
  });

  it("should send message", () => {
    const app = shallow(<App />);
    (app as any).instance().ref = {
      current: {
        scrollTop: 10,
        scrollHeight: 10
      }
    };
    app.setState({ input: "12345" });
    app.find(".btn-send").simulate("click");
    const messages: IMessage[] = app.state("messages");
    const last = messages[messages.length - 1];
    expect(last.text).toBe("12345");
  });
});
