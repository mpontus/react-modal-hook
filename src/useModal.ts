import { useContext, useEffect, useState } from "react";
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
  const context = useContext(ModalContext);
  const [isShown, setShown] = useState<boolean>(false);

  useEffect(() =>
    isShown ? context.showModal(key, modal) : context.hideModal(key)
  );

  return [() => setShown(true), () => setShown(false)];
};
