import React, { useState } from "react";
import { ModalType, ModalContext } from "./ModalContext";
import { ModalRoot } from "./ModalRoot";

/**
 * Modal Provider Props
 */
export interface ModalProviderProps {
  /**
   * Children which will receive Modal Context
   */
  children: React.ReactNode;
}

/**
 * Modal Provider
 *
 * Provides Modal Context to children.
 */
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<ModalType | undefined>(undefined);

  return (
    <ModalContext.Provider
      value={{
        modal,
        showModal: modal => setModal(() => modal),
        hideModal: () => setModal(undefined)
      }}
    >
      <React.Fragment>
        {children}
        <ModalRoot />
      </React.Fragment>
    </ModalContext.Provider>
  );
};
