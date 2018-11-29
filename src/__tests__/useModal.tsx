import "react-testing-library/cleanup-after-each";
import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { ModalProvider } from "../ModalProvider";
import { useModal } from "../useModal";

// Helper to render components in modal context
const renderWithProvider = (content: React.ReactNode) =>
  render(<ModalProvider>{content}</ModalProvider>);

// Test component which calls useModal
const Component = () => {
  const [showModal, hideModal] = useModal(() => <div>Modal content</div>);

  return (
    <React.Fragment>
      <button onClick={showModal}>Show modal</button>
      <button onClick={hideModal}>Hide modal</button>
    </React.Fragment>
  );
};

test("showModal works", () => {
  const { getByText } = renderWithProvider(<Component />);

  fireEvent.click(getByText("Show modal"));

  expect(getByText("Modal content")).toBeTruthy();
});

test("hideModal works", () => {
  const { getByText, queryByText } = renderWithProvider(<Component />);

  fireEvent.click(getByText("Show modal"));
  fireEvent.click(getByText("Hide modal"));

  expect(queryByText("Modal content")).not.toBeTruthy();
});
