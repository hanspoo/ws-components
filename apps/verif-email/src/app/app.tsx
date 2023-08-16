// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.css';
import { RecoverPassword, Registration } from '@starter-ws/auth/ui';

export function App() {
  const cancel = () => console.log('ha presionado cancelar');
  return <Registration cancel={cancel} />;
}

export default App;
