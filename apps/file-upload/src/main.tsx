import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const ele = document.getElementById('div-file-upload') as HTMLElement;
const campoId = ele.getAttribute('campo') || 'archivo.id';

const root = ReactDOM.createRoot(ele);
root.render(
  <StrictMode>
    <App campoId={campoId} />
  </StrictMode>
);
