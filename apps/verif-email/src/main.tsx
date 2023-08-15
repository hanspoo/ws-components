import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const ele = document.getElementById('leer-email') as HTMLElement;
if (!ele) throw Error('Elemento raíz leer-email no encontrado');

// const onsuccess = eval(ele.getAttribute('onsuccess') + '');

const root = ReactDOM.createRoot(ele);
root.render(
  <StrictMode>
    <App onSuccess={(window as any).emailOk} />
  </StrictMode>
);
