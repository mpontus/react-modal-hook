import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  flushEffects
} from "react-testing-library";
import { ModalProvider, useModal } from "..";
import "jest-dom/extend-expect";

afterEach(cleanup);

beforeEach(() => {
  jest.spyOn(console, "error");
  (global.console.error as any).mockImplementation(() => {});
});

afterEach(() => {
  (global.console.error as any).mockRestore();
});

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

  it("should render modals inside the specified root element", () => {
    const customRoot = document.createElement("div");

    document.body.appendChild(customRoot);

    const { getByText } = render(
      <ModalProvider container={customRoot}>
        <App />
      </ModalProvider>
    );

    fireEvent.click(getByText("Show modal"));
    flushEffects();

    expect(customRoot).toContainElement(getByText("This is a modal"));
  });

  it("should throw an error when `container` does not specify a DOM elemnet", () => {
    expect(() => {
      render(
        <ModalProvider container={React.Fragment as any}>
          <App />
        </ModalProvider>
      );
      flushEffects();
    }).toThrowError(
      expect.objectContaining({
        message: expect.stringMatching(
          /Container must specify DOM element to mount modal root into/
        )
      })
    );
  });
});
