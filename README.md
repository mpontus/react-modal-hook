# react-modal-hook

[![NPM](https://img.shields.io/npm/v/react-modal-hook.svg)](https://www.npmjs.com/package/react-modal-hook)

> Modal windows made easy with react hooks

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

Call `useModal` to receive modal callbacks in your functional component:

```jsx
import React from "react";
import { useModal } from "react-modal-hook";

const App = () => {
  const [showModal, hideModal] = useModal(() => (
    <div role="dialog" className="modal">
      <p>Modal content</p>
      <button onClick={hideModal}>Hide modal</button>
    </div>
  ));

  return <button onClick={showModal}>Show modal</button>;
};
```

### Updating Modals

Second argument to `useModals` should contain an array of values referenced inside the modal:

``` jsx
const App = () => {
  const [count, setCount] = useState(0);
  const [showModal] = useModal(
    () => (
      <div role="dialog" className="modal">
        <span>The count is {count}</span>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    ),
    [count]
  );

  return <button onClick={showModal}>Show modal</button>;
};
```

Modals are also functional components and can use react hooks themselves:

``` jsx
const App = () => {
  const [showModal] = useModal(() => {
    const [count, setCount] = useState(0);

    return (
      <div role="dialog" className="modal">
        <span>The count is {count}</span>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  });

  return <button onClick={showModal}>Show modal</button>;
};
```

### Animated Modals

Use [`TransitionGroup`](https://github.com/reactjs/react-transition-group) as the modals container:

``` jsx
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import App from "./App";

ReactDOM.render(
  <ModalProvider container={TransitionGroup}>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
```

When `TransitionGroup` detects of one of its children being removed, it will set its `in` prop to `false`, and wait for `onExited` callback to be called at the end of the animation.

You will receive those props in the function you pass to `useModal` and can translate them to the transition props of your modal component:

``` jsx
import React from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

const App = () => {
  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog open={open} onExited={onExited}>
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
