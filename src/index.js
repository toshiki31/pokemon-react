import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // commit時はコメントアウトを外す
  // <React.StrictMode>
  <App />
  //</React.StrictMode>
);
