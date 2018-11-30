import React, { useContext, memo } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./ModalContext";

/**
 * Modal Root Props
 */
interface ModalRootProps {
  /**
   * Container component for modals
   *
   * Modals will be rendered into a portal as children of the
   * specified component. React.Fragment is used by default.
   */
  container?: React.ComponentType<any>;
}

/**
 * Modal Root
 *
 * Renders modals using a portal.
 */
export const ModalRoot = memo(
  ({ container = React.Fragment }: ModalRootProps) => {
    const { modals } = useContext(ModalContext);
    const Container = container;

    return ReactDOM.createPortal(
      <Container>
        {Object.keys(modals).map(key => {
          const Component = modals[key];

          return <Component key={key} />;
        })}
      </Container>,
      document.body
    );
  }
);
