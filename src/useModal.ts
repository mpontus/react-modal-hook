import { useContext, useEffect, useState, useCallback } from "react";
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
export const useModal = (
  modal: ModalType,
  inputs?: any[]
): [ShowModal, HideModal] => {
  const key = useGlobalId();
  const context = useContext(ModalContext);
  const [isShown, setShown] = useState<boolean>(false);
  const showModal = useCallback(() => setShown(true), []);
  const hideModal = useCallback(() => setShown(false), []);

  useEffect(
    () => {
      if (isShown) {
        context.showModal(key, modal);
      } else {
        context.hideModal(key);
      }

      return () => context.hideModal(key);
    },

    // Update modal each time unless inputs are specified
    inputs ? [isShown, ...inputs] : undefined
  );

  return [showModal, hideModal];
};
