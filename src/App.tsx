import React from "react";
import "./tailwind.generated.css";
import "./App.css";
import { data } from "./data";
import Message from "./Message";

// TODO test on browsers

const App = () => {
  return (
    <div className="App">
      <div className="chat-window">
        {/* TODO remove */}
        {data.slice(0, 10).map((item) => (
          <Message message={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
