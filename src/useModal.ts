import { useContext } from "react";
import { ModalType, ModalContext } from "./ModalContext";
import { useGlobalId } from "./useGlobalId";

/**
 * Callback for showing the modal
 */
type ShowModal = () => void;

/**
 * Callback for hiding the modal
 */
type HideModal = () => void;

/**
 * React hook for showing modal windows
 */
export const useModal = (modal: ModalType): [ShowModal, HideModal] => {
  const key = useGlobalId();
  const { showModal, hideModal } = useContext(ModalContext);

  return [() => showModal(key, modal), () => hideModal(key)];
};
