import React from "react";
import { useModal } from "react-modal-hook";

const App = () => {
  const [showModal, hideModal] = useModal(() => (
    <div role="dialog" className="modal">
      <p>This is a modal window</p>
      <button onClick={hideModal}>Close</button>
    </div>
  ));

  return <button onClick={showModal}>Show modal</button>;
};

export default App;
