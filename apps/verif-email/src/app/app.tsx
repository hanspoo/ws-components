// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.css';
import { RecoverPassword, Registration } from '@starter-ws/auth/ui';

const emailRegex = /^\w[A-Z0-9!"#$%&/().]*@\w+\.\w+$/i;

type AppProps = {
  onSuccess: (email: string, token: string) => void;
};

export function App({ onSuccess }: AppProps) {
  const cancel = () => console.log('ha presionado cancelar');
  return <Registration cancel={cancel} onSuccess={onSuccess} />;
}

export default App;
