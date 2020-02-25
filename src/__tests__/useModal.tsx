import * as React from "react";
import { useState } from "react";

import { render, fireEvent, RenderOptions } from "@testing-library/react";

import { ModalProvider } from "../ModalProvider";
import { useModal } from "../useModal";

// Helper to render components in modal context
const renderWithProvider = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  const result = render(<ModalProvider>{ui}</ModalProvider>, options);

  return {
    ...result,

    // Override rerender to only update children of the provider
    rerender: (ui: React.ReactElement) => renderWithProvider(ui, { container: result.container })
  };
};

describe("simple usage", () => {
  const App = () => {
    const [showModal, hideModal] = useModal(() => (
      <div>
        <p>Modal content</p>
        <button onClick={hideModal}>Hide modal</button>
      </div>
    ));

    return <button onClick={showModal}>Show modal</button>;
  };

  it("should show the modal", () => {
    const { getByText, queryByText } = renderWithProvider(<App />);

    fireEvent.click(getByText("Show modal"));

    expect(queryByText("Modal content")).toBeTruthy();
  });

  it("should hide the modal", () => {
    const { getByText, queryByText } = renderWithProvider(<App />);

    fireEvent.click(getByText("Show modal"));

    fireEvent.click(getByText("Hide modal"));

    expect(queryByText("Modal content")).not.toBeTruthy();
  });

  it("should hide the modal when parent component unmounts", () => {
    const { getByText, queryByText, rerender } = renderWithProvider(
      <div>
        <App />
      </div>
    );

    fireEvent.click(getByText("Show modal"));

    rerender(<div />);

    expect(queryByText("Modal content")).not.toBeTruthy();
  });
});

describe("updating modal", () => {
  it("should work with internal state", () => {
    const App = () => {
      const [showModal] = useModal(() => {
        const [count, setCount] = useState(0);

        return (
          <div>
            <span>The count is {count}</span>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        );
      });

      return <button onClick={showModal}>Show modal</button>;
    };

    const { getByText, queryByText } = renderWithProvider(<App />);

    fireEvent.click(getByText("Show modal"));

    expect(queryByText("The count is 0")).toBeTruthy();

    fireEvent.click(getByText("Increment"));

    expect(queryByText("The count is 1")).toBeTruthy();
  });

  it("should work with external state", () => {
    const App = () => {
      const [count, setCount] = useState(0);
      const [showModal] = useModal(
        () => (
          <div>
            <span>The count is {count}</span>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        ),
        [count]
      );

      return <button onClick={showModal}>Show modal</button>;
    };

    const { getByText, queryByText } = renderWithProvider(<App />);

    fireEvent.click(getByText("Show modal"));

    expect(queryByText("The count is 0")).toBeTruthy();

    fireEvent.click(getByText("Increment"));

    expect(queryByText("The count is 1")).toBeTruthy();
  });

  it("should not rerender when external state changes", () => {
    const mountCounter = jest.fn();

    class MountSpy extends React.Component {
      componentDidMount() {
        mountCounter();
      }

      render() {
        return null;
      }
    }

    const App = () => {
      const [count, setCount] = useState(0);
      const [showModal] = useModal(
        () => (
          <div>
            <MountSpy />
            <span>The count is {count}</span>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        ),
        [count]
      );

      return <button onClick={showModal}>Show modal</button>;
    };

    const { getByText } = renderWithProvider(<App />);

    fireEvent.click(getByText("Show modal"));

    fireEvent.click(getByText("Increment"));

    expect(mountCounter).toHaveBeenCalledTimes(1);
  });
});

describe("multiple modals", () => {
  it("should show multiple modals at the same time", () => {
    const App = () => {
      const [showFirstModal] = useModal(() => <div>First modal content</div>);
      const [showSecondModal] = useModal(() => <div>Second modal content</div>);

      return (
        <div>
          <button onClick={showFirstModal}>Show first modal</button>
          <button onClick={showSecondModal}>Show second modal</button>
        </div>
      );
    };

    const { getByText, queryByText } = renderWithProvider(<App />);

    fireEvent.click(getByText("Show first modal"));
    fireEvent.click(getByText("Show second modal"));

    expect(queryByText("First modal content")).toBeTruthy();
    expect(queryByText("Second modal content")).toBeTruthy();
  });
});

describe("calling useModal without ModalProvider", () => {
  const App = () => {
    useModal(() => <div>Modal content</div>);

    return null;
  };

  it("should throw an error", () => {
    const consoleError = jest.fn()
    jest.spyOn(console, 'error').mockImplementation(consoleError);

    expect(
      () => render(<App />)
    ).toThrow(
      new Error("Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider.")
    );

    expect(consoleError).toHaveBeenCalled();
  });
});

describe("calling useModal with class component", () => {
  class Modal extends React.Component {
    render() {
      return <div>Modal content</div>;
    }
  }

  const App = () => {
    useModal(Modal as any);

    return null;
  };

  beforeEach(() => {
    jest.spyOn(console, "error");
    (global.console.error as any).mockImplementation(() => {});
  });

  afterEach(() => {
    (global.console.error as any).mockRestore();
  });

  it("should throw an error", () => {
    const catchError = jest.fn((e: Event) => e.preventDefault());
    window.addEventListener("error", catchError);

    expect(() => {
      renderWithProvider(<App />);
    }).toThrowError(
      expect.objectContaining({
        message: expect.stringMatching(
          /Only stateless components can be used as an argument to useModal/
        )
      })
    );
  });
});
