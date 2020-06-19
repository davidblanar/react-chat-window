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
  private readonly observer: IntersectionObserver;

  constructor(props) {
    super(props);

    this.state = {
      messages: data,
      unreadCount: data.filter(isUnread).length,
      lastId: data.length,
      input: ""
    };
    this.ref = React.createRef();
    // calculate height to fix viewport issues on mobile phones
    this.chatWindowHeight = this.getChatWindowHeight();
    this.observer = new IntersectionObserver(this.onObserved, {
      rootMargin: "0px 0px 90px 0px",
      threshold: 0.5
    });
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
            <Message message={item} key={item.id} observer={this.observer} />
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
          // scroll to bottom of chat window after state update
          this.ref.current.scrollTop = this.ref.current.scrollHeight;
        }
      );
    }
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

  private onObserved = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = parseInt(entry.target.getAttribute("data-id"));
        observer.unobserve(entry.target);
        this.setState((prevState) => ({
          messages: prevState.messages.map((msg) => {
            if (msg.id === id) {
              return { ...msg, status: "read" };
            }
            return msg;
          }),
          unreadCount: prevState.unreadCount - 1
        }));
      }
    });
  };
}

export default App;
