import React, { useCallback, useState, useMemo } from "react";
import { ModalType, ModalContext } from "./ModalContext";
import { ModalRoot } from "./ModalRoot";

/**
 * Modal Provider Props
 */
export interface ModalProviderProps {
  /**
   * Container component for modals that will be passed to ModalRoot
   */
  container?: React.ComponentType<any>;

  /**
   * Subtree that will receive modal context
   */
  children: React.ReactNode;
}

/**
 * Modal Provider
 *
 * Provides modal context and renders ModalRoot.
 */
export const ModalProvider = ({ container, children }: ModalProviderProps) => {
  const [modals, setModals] = useState<Record<string, ModalType>>({});
  const showModal = useCallback(
    (key: string, modal: ModalType) =>
      setModals(modals => ({
        ...modals,
        [key]: modal
      })),
    []
  );
  const hideModal = useCallback(
    (key: string) =>
      setModals(modals => {
        const newModals = { ...modals };
        delete newModals[key];
        return newModals;
      }),
    []
  );
  const contextValue = useMemo(() => ({ showModal, hideModal }), []);

  return (
    <ModalContext.Provider value={contextValue}>
      <React.Fragment>
        {children}
        <ModalRoot modals={modals} container={container} />
      </React.Fragment>
    </ModalContext.Provider>
  );
};
