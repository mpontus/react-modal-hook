import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./ModalContext";

/**
 * Modal Root
 *
 * Renders modals using a portal.
 */
export const ModalRoot = () => {
  const { modals } = useContext(ModalContext);

  return ReactDOM.createPortal(
    <React.Fragment>
      {Object.keys(modals).map(key => {
        const Component = modals[key];

        return <Component key={key} />;
      })}
    </React.Fragment>,
    document.body
  );
};
