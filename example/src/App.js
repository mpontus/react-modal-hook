import React from "react";
import { useModal } from "react-modal-hook";

const App = () => {
  const [showModal, hideModal] = useModal(() => (
    <div role="dialog" className="modal">
      <span>This is a modal window</span> <a onClick={hideModal}>Close</a>
    </div>
  ));

  return (
    <div>
      <a onClick={showModal}>Open modal</a>
    </div>
  );
};

export default App;
