import styles from './auth-ui.module.css';

/* eslint-disable-next-line */
export interface AuthUiProps {}

export function AuthUi(props: AuthUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AuthUi!</h1>
    </div>
  );
}

export default AuthUi;
