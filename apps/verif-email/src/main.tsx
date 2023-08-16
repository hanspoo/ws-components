import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const ele = document.getElementById('leer-email') as HTMLElement;
if (!ele) throw Error('Elemento raíz leer-email no encontrado');

if ((window as any).emailValidadoHandler === undefined)
  throw Error(
    'Debe definir una función global emailValidadoHandler para llamar cuando hayamos validado el correo'
  );

const root = ReactDOM.createRoot(ele);
// const onsuccess = (window as any).emailOk

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
