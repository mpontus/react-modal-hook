import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./ModalContext";

/**
 * Modal Root
 *
 * Renders modals using a portal.
 */
export const ModalRoot = () => {
  const { modal: Component } = useContext(ModalContext);

  if (Component === undefined) {
    return null;
  }

  return ReactDOM.createPortal(<Component />, document.body);
};
