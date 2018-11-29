import React from "react";
import { useModal } from "react-modal-hook";

const App = () => {
  const [showModal, hideModal] = useModal(() => (
    <div role="dialog" className="modal">
      <span>This is a modal window</span>{" "}
      <button onClick={hideModal}>Close</button>
    </div>
  ));

  return (
    <div>
      <button onClick={showModal}>Show modal</button>
      <button onClick={hideModal}>Hide modal</button>
    </div>
  );
};

export default App;
