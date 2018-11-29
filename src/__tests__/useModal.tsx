import "react-testing-library/cleanup-after-each";
import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { ModalProvider } from "../ModalProvider";
import { useModal } from "../useModal";

// Helper to render components in modal context
const renderWithProvider = (content: React.ReactNode) =>
  render(<ModalProvider>{content}</ModalProvider>);

it("should work with single modal", () => {
  const Component = () => {
    const [showModal, hideModal] = useModal(() => <div>Modal content</div>);

    return (
      <React.Fragment>
        <button onClick={showModal}>Show modal</button>
        <button onClick={hideModal}>Hide modal</button>
      </React.Fragment>
    );
  };

  const { getByText, queryByText } = renderWithProvider(<Component />);

  expect(queryByText("Modal content")).not.toBeTruthy();

  fireEvent.click(getByText("Show modal"));

  expect(getByText("Modal content")).toBeTruthy();

  fireEvent.click(getByText("Hide modal"));

  expect(queryByText("Modal content")).not.toBeTruthy();
});

it("should work with multiple modals", () => {
  const Component = () => {
    const [showFirstModal, hideFirstModal] = useModal(() => (
      <div>
        <span>First modal</span>
      </div>
    ));

    const [showSecondModal, hideSecondModal] = useModal(() => (
      <div>
        <span>Second modal</span>
      </div>
    ));

    return (
      <React.Fragment>
        <button onClick={hideFirstModal}>Hide first modal</button>
        <button onClick={showFirstModal}>Show first modal</button>
        <button onClick={showSecondModal}>Show second modal</button>
        <button onClick={hideSecondModal}>Hide second modal</button>
      </React.Fragment>
    );
  };

  const { getByText, queryByText } = renderWithProvider(<Component />);

  expect(queryByText("First modal")).not.toBeTruthy();
  expect(queryByText("Second modal")).not.toBeTruthy();

  fireEvent.click(getByText("Show first modal"));

  expect(getByText("First modal")).toBeTruthy();
  expect(queryByText("Second modal")).not.toBeTruthy();

  fireEvent.click(getByText("Show second modal"));

  expect(getByText("First modal")).toBeTruthy();
  expect(getByText("Second modal")).toBeTruthy();

  fireEvent.click(getByText("Hide first modal"));

  expect(queryByText("First modal")).not.toBeTruthy();
  expect(getByText("Second modal")).toBeTruthy();

  fireEvent.click(getByText("Hide second modal"));

  expect(queryByText("First modal")).not.toBeTruthy();
  expect(queryByText("Second modal")).not.toBeTruthy();
});
