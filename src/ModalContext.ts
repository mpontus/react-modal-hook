import React from "react";

/**
 * Placeholder for context callbacks
 */
const noop = () => undefined;

/**
 * Modals, represented as stateless functions, are react
 * components, but class components will work also.
 */
export type ModalType = React.ComponentType<any>;

/**
 * Shape of the modal context
 */
export interface ModalContextType {
  modal: ModalType | undefined;
  showModal(component: ModalType): void;
  hideModal(): void;
}

/**
 * Modal Context Object
 */
export const ModalContext = React.createContext<ModalContextType>({
  modal: undefined,
  showModal: noop,
  hideModal: noop
});
