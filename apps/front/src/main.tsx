import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@starter-ws/reductor';
import { StrictMode } from 'react';

import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
