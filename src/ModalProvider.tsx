import React, { useCallback, useState, useMemo } from "react";
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
  const [modals, setModals] = useState<Record<string, ModalType>>({});
  const showModal = useCallback(
    (key: string, modal: ModalType) =>
      setModals(modals => ({
        ...modals,
        [key]: modal
      })),
    [setModals]
  );
  const hideModal = useCallback(
    (key: string) =>
      setModals(modals => {
        const newModals = { ...modals };
        delete newModals[key];
        return newModals;
      }),
    [setModals]
  );

  const contextValue = useMemo(() => ({ modals, showModal, hideModal }), [
    modals,
    showModal,
    hideModal
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      <React.Fragment>
        {children}
        <ModalRoot />
      </React.Fragment>
    </ModalContext.Provider>
  );
};
