import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
