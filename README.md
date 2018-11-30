# react-modal-hook

> React hook for showing modal windows

[![NPM](https://img.shields.io/npm/v/react-modal-hook.svg)](https://www.npmjs.com/package/react-modal-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-modal-hook
```

## Usage

Use `ModalProvider` to provide modal context to your application components:

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

Call `useModal` in your functional component:

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

`useModal` accepts a second argument, which should be an array of inputs referenced inside modal callback.

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

Keep in mind, that modals themselves are functional components, and can also use react hooks:

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

You can customize the container component for modals using `container` prop on `ModalProvider`.

Using `TransitionGroup`, or a simliar component which tracks changes to children, will allow you to delay modal removal until exit animation finishes.

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

`TransitionGroup` will inject several props which you should pass to transition component.

Example below is given for Material-UI's dialog:

``` jsx
const App = () => {
  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog
      open={open}
      onExited={onExited}
      onClose={hideModal}
      aria-labelledby="example-dialog-title"
    >
      <DialogTitle id="example-dialog-title">Example</DialogTitle>
      <DialogContent>
        <DialogContentText>This is a modal window</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={hideModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ));

  return <Button onClick={showModal}>Show modal</Button>;
};
```

## License

MIT © [mpontus](https://github.com/mpontus)
