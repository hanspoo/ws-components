import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { FileUploadSingle } from '@starter-ws/compis';
import { EmailValidado } from '@starter-ws/auth/ui';

{
  const ele = document.getElementById('div-file-upload') as HTMLElement;
  if (ele) {
    const campoId = ele.getAttribute('campo') || 'archivo.id';
    const actual = ele.getAttribute('actual') || '';

    const root = ReactDOM.createRoot(ele);
    root.render(
      <StrictMode>
        <FileUploadSingle campoId={campoId} actual={actual} />
      </StrictMode>
    );
  }
}

{
  const ele = document.getElementById('leer-email') as HTMLElement;
  if (ele) {
    if ((window as any).emailValidadoHandler === undefined)
      throw Error(
        'Debe definir una función global emailValidadoHandler para llamar cuando hayamos validado el correo'
      );

    const root = ReactDOM.createRoot(ele);
    // const onsuccess = (window as any).emailOk

    root.render(
      <StrictMode>
        <EmailValidado cancel={() => console.log('cancelando')} />
      </StrictMode>
    );
  }
}
