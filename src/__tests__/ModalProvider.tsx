import React from "react";
import { render, fireEvent, flushEffects } from "react-testing-library";
import { ModalProvider, useModal } from "..";
import "jest-dom/extend-expect";

describe("custom container prop", () => {
  const RootComponent: React.SFC = ({ children }) => (
    <div data-testid="custom-root">{children}</div>
  );

  const App = () => {
    const [showModal] = useModal(() => <div>This is a modal</div>);

    return <button onClick={showModal}>Show modal</button>;
  };

  it("should render modals inside custom root component", () => {
    const { getByTestId, getByText } = render(
      <ModalProvider rootComponent={RootComponent}>
        <App />
      </ModalProvider>
    );

    fireEvent.click(getByText("Show modal"));
    flushEffects();

    expect(getByTestId("custom-root")).toContainElement(
      getByText("This is a modal")
    );
  });
});
