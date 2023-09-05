import styles from './validated-email.module.css';

/* eslint-disable-next-line */
export interface ValidatedEmailProps {}

export function ValidatedEmail(props: ValidatedEmailProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ValidatedEmail!</h1>
    </div>
  );
}

export default ValidatedEmail;
