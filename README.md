# react-modal-hook

[![](https://img.shields.io/npm/v/react-modal-hook.svg)](https://www.npmjs.com/package/react-modal-hook)
[![](https://img.shields.io/travis/mpontus/react-modal-hook.svg)](https://travis-ci.org/mpontus/react-modal-hook)
[![](https://img.shields.io/codecov/c/github/mpontus/react-modal-hook.svg)](https://codecov.io/gh/mpontus/react-modal-hook)
[![](https://img.shields.io/npm/dt/react-modal-hook.svg)](https://www.npmjs.com/package/react-modal-hook)

> Syntactic sugar for handling modal windows using React Hooks.

This library does not provide any UI, but instead offers a convenient way to render modal components defined elsewhere.

For a simple modal component check out [`react-modal`](https://github.com/reactjs/react-modal), which works well with this library.

[**Demo** (Material-UI)](https://codesandbox.io/s/v8qy4w1j77)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Updating Modals](#updating-modals)
  - [Animated Modals](#animated-modals)
- [License](#license)

## Install

```bash
npm install --save react-modal-hook
```

## Usage

Use `ModalProvider` to provide modal context for your application:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook";
import App from "./App";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
```

Call `useModal` with the dialog component of your choice. Example using [`react-modal`](https://github.com/reactjs/react-modal):

```jsx
import React from "react";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";

const App = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <p>Modal content</p>
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));

  return <button onClick={showModal}>Show modal</button>;
};
```

### Updating Modals

Second argument to `useModals` should contain an array of values referenced inside the modal:

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  const [showModal] = useModal(
    () => (
      <ReactModal isOpen>
        <span>The count is {count}</span>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </ReactModal>
    ),
    [count]
  );

  return <button onClick={showModal}>Show modal</button>;
};
```

Modals are also functional components and can use react hooks themselves:

```jsx
const App = () => {
  const [showModal] = useModal(() => {
    const [count, setCount] = useState(0);

    return (
      <ReactModal isOpen>
        <span>The count is {count}</span>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </ReactModal>
    );
  });

  return <button onClick={showModal}>Show modal</button>;
};
```

### Animated Modals

Use [`TransitionGroup`](https://github.com/reactjs/react-transition-group) as the container for the modals:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import App from "./App";

ReactDOM.render(
  <ModalProvider rootComponent={TransitionGroup}>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
```

When `TransitionGroup` detects of one of its children removed, it will set its `in` prop to false and wait for `onExited` callback to be called before removing it from the DOM.

Those props are automatically added to all components passed to `useModal`. You can can pass them down to [`CSSTransition`](http://reactcommunity.org/react-transition-group/css-transition/) or modal component with transition support.

Here's an example using Material-UI's [`Dialog`](https://material-ui.com/components/dialogs/):

```jsx
import React from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

const App = () => {
  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog open={open} onExited={onExited} onClose={hideModal}>
      <DialogTitle>Dialog Content</DialogTitle>
      <DialogActions>
        <Button onClick={hideModal}>Close</Button>
      </DialogActions>
    </Dialog>
  ));

  return <Button onClick={showModal}>Show modal</Button>;
};
```

## License

MIT © [mpontus](https://github.com/mpontus)
