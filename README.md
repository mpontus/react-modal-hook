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

export const App = () => {
  const [showModal, hideModal] = useModal(() => (
    <div role="dialog" className="modal">
      <span>This is a modal window</span> <a onClick={hideModal}>Close</a>
    </div>
  ));

  return (
    <div>
      <a onClick={showModal}>Open modal</a>
    </div>
  );
};
```

## License

MIT © [mpontus](https://github.com/mpontus)
