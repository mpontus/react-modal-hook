import * as React from "react";

/**
 * Modals are represented as react components
 *
 * This is what gets passed to useModal as the first argument.
 */
export type ModalType = React.FunctionComponent<any>;

/**
 * The shape of the modal context
 */
export interface ModalContextType {
  showModal(key: string, component: ModalType): void;
  hideModal(key: string): void;
}

/**
 * Throw error when ModalContext is used outside of context provider
 */
const invariantViolation = () => {
  throw new Error(
    "Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider."
  );
};

/**
 * Modal Context Object
 */
export const ModalContext = React.createContext<ModalContextType>({
  showModal: invariantViolation,
  hideModal: invariantViolation
});
ModalContext.displayName = 'ModalContext';
