import React from "react";
import "./tailwind.generated.css";
import "./App.css";
import { data } from "./data";
import Message from "./Message";
import { IMessage } from "./interfaces";
import { isUnread } from "./util";

interface State {
  messages: IMessage[];
  unreadCount: number;
  input: string;
  lastId: number;
}

class App extends React.PureComponent<{}, State> {
  private readonly ref: React.RefObject<HTMLDivElement>;
  private readonly chatWindowHeight: number;
  constructor(props) {
    super(props);

    this.state = {
      messages: data,
      unreadCount: data.filter(isUnread).length,
      lastId: data.length,
      input: ""
    };
    this.ref = React.createRef();
    this.chatWindowHeight = this.getChatWindowHeight();
  }

  render() {
    return (
      <div className="App pl-2 pr-2">
        <p>Unread messages: {this.state.unreadCount}</p>
        <div
          className="chat-window"
          ref={this.ref}
          style={{ height: this.chatWindowHeight }}
        >
          {this.state.messages.map((item) => (
            <Message
              message={item}
              key={item.id}
              onViewportEnter={this.onViewportEnter}
            />
          ))}
        </div>
        <div className="input-wrapper">
          <textarea
            className="focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            placeholder="Type your message"
            value={this.state.input}
            onChange={this.onChange}
          />
          <div className="flex justify-between">
            <button
              className="btn-send bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
              onClick={this.onSend}
            >
              Send
            </button>
            <button
              className="btn-jump-to-unread bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
              onClick={this.jumpToUnread}
            >
              Jump to unread
            </button>
          </div>
        </div>
      </div>
    );
  }

  private getChatWindowHeight = (): number => {
    // subtract height of input-wrapper, margin and unread messages panel
    return window.innerHeight - 90 - 10 - 24;
  };

  private onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ input: e.currentTarget.value });
  };

  private onSend = () => {
    if (this.state.input !== "") {
      this.setState(
        {
          messages: [
            ...this.state.messages,
            {
              id: this.state.lastId + 1,
              direction: "out",
              status: "sent",
              text: this.state.input,
              timestamp: Math.round(new Date().getTime() / 1000).toString()
            }
          ],
          lastId: this.state.lastId + 1,
          input: ""
        },
        () => {
          this.ref.current.scrollTop = this.ref.current.scrollHeight;
        }
      );
    }
  };

  private onViewportEnter = (messageId: number) => {
    this.setState((prevState) => ({
      messages: prevState.messages.map((msg) => {
        if (msg.id === messageId) {
          return { ...msg, status: "read" };
        }
        return msg;
      }),
      unreadCount: prevState.unreadCount - 1
    }));
  };

  private jumpToUnread = () => {
    if (this.state.unreadCount !== 0) {
      const firstUnreadIdx = this.state.messages.findIndex(isUnread);
      const unreadMsg = this.ref.current.querySelectorAll(".message")[
        firstUnreadIdx
      ];
      unreadMsg.scrollIntoView({ behavior: "smooth" });
    }
  };
}

export default App;
