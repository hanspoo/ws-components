import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { FileUploadSingle } from '@starter-ws/components';

const ele = document.getElementById('div-file-upload') as HTMLElement;
const campoId = ele.getAttribute('campo') || 'archivo.id';

const root = ReactDOM.createRoot(ele);
root.render(
  <StrictMode>
    <FileUploadSingle campoId={campoId} />
  </StrictMode>
);
