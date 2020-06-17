import React from "react";
import "./tailwind.generated.css";
import "./App.css";
import { data } from "./data";
import Message from "./Message";

const App = () => {
  return (
    <div className="App">
      <div className="chat-window">
        {data.map((item) => (
          <Message message={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
