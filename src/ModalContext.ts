import React from "react";

/**
 * Placeholder for context callbacks
 */
const noop = () => {
  throw new Error(
    "Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider."
  );
};

/**
 * Modals, represented as stateless functions, are react
 * components, but class components will work also.
 */
export type ModalType = React.ComponentType<any>;

/**
 * Shape of the modal context
 */
export interface ModalContextType {
  modals: Record<string, ModalType>;
  showModal(key: string, component: ModalType): void;
  hideModal(key: string): void;
}

/**
 * Modal Context Object
 */
export const ModalContext = React.createContext<ModalContextType>({
  modals: {},
  showModal: noop,
  hideModal: noop
});
