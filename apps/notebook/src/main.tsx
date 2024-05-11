import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { NotebookContainer } from './app/app';

const els = document.getElementsByClassName('notebook');
Array.from(els).forEach((ele) => {
  const root = ReactDOM.createRoot(ele);
  const idString = ele.getAttribute('data-notebook-id');

  if (idString) {
    const id = parseInt(idString);
    root.render(
      <StrictMode>
        <NotebookContainer notebookId={id} />
      </StrictMode>
    );
  } else {
    root.render(<p>No viene el id del notebook</p>);
  }
});
