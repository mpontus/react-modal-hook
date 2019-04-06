import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ModalRoot } from '../ModalRoot';

describe("Modal Root", () => {
  it("should render safely in server-side environment", () => {
    const output = ReactDOMServer.renderToString(<ModalRoot modals={{}} />);

    expect(output).toBe("");
  })
})