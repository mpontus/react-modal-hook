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
      <p>This is a modal window</p>
      <button onClick={hideModal}>Close</button>
    </div>
  ));

  return <button onClick={showModal}>Show modal</button>;
};
```

### Updating Modals

`useModal` accepts a second argument, which should be an array of inputs referenced inside modal callback.

``` jsx
const App = ({ task, requestPending, onDelete }) => {
  const [count, setCount] = useState(0);
  const [showModal, hideModal] = useModal(
    () => (
      <div role="dialog" className="modal">
        <p>Count is: {count}</p>
        <button onClick={hideModal}>Close</button>
        <button onClick={() => setCount(n => n + 1)}>Increment count</button>
      </div>
    ),
    [count]
  );

  return (
    <div>
      <button onClick={showModal}>Show modal</button>
    </div>
  );
};
```

## License

MIT © [mpontus](https://github.com/mpontus)
