/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString} from 'react-dom/server';
import { ModalRoot } from '../ModalRoot';

describe("Modal Root", () => {
  it("should render safely in server-side environment", () => {
    const output = renderToString(<ModalRoot modals={{}} />);

    expect(output).toBe("");
  })
})
