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
   * Modals will be rendered as children of this component. React.Fragment is
   * used by defualt, specifying a different component can change the way modals
   * are rendered across the whole application.
   */
  container?: React.ComponentType<any>;
}

/**
 * Modal Root
 *
 * Renders modals using react portal.
 */
export const ModalRoot = memo(
  ({ container: Container = React.Fragment }: ModalRootProps) => {
    const { modals } = useContext(ModalContext);

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
