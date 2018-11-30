import React from "react";
import { render, fireEvent, flushEffects } from "react-testing-library";
import { ModalProvider, useModal } from "..";
import "jest-dom/extend-expect";

describe("custom container prop", () => {
  const Container: React.SFC = ({ children }) => (
    <div data-testid="custom-container">{children}</div>
  );

  const App = () => {
    const [showModal] = useModal(() => <div>This is a modal</div>);

    return <button onClick={showModal}>Show modal</button>;
  };

  it("should render modals inside custom container", () => {
    const { getByTestId, getByText } = render(
      <ModalProvider container={Container}>
        <App />
      </ModalProvider>
    );

    fireEvent.click(getByText("Show modal"));
    flushEffects();

    expect(getByTestId("custom-container")).toContainElement(
      getByText("This is a modal")
    );
  });
});
