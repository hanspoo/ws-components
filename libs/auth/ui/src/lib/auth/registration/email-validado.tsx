import { useState } from 'react';
import styles from '../../auth-form.module.css';
import { RegistrationReadMail } from './RegistrationReadMail';
import { RegistrationReadCode } from './RegistrationReadCode';
import { RegistrationReadDatosEmpresa } from './RegistrationReadDatosEmpresa';
import { RegistrationSuccessLanding } from './RegistrationSuccessLanding';

enum View {
  READ_EMAIL,
  READ_SECURITY_CODE,
  READ_NEW_PASSWORD,
  LANDING_RECOVER_PASS,
}
export function EmailValidado({ cancel }: { cancel: () => void }) {
  return (
    <div className={styles['container']}>
      <div className={styles['login-form']}>
        <DoRegistration cancel={cancel} />
      </div>
    </div>
  );
}

export const DoRegistration: React.FC<{
  cancel: () => void;
}> = ({ cancel }) => {
  const [view, setView] = useState(View.READ_EMAIL);
  const [email, setEmail] = useState<string>();
  const [token, setToken] = useState<string>();

  if (view === View.READ_NEW_PASSWORD) {
    if (!email) return <p>Error interno, no está definido el email (2)</p>;
    if (!token) return <p>Error interno, no está definido el token (2)</p>;

    // eslint-disable-next-line no-eval
    (window as any).emailValidadoHandler(email, token);

    return (
      <RegistrationReadDatosEmpresa
        token={token}
        email={email}
        cancel={() => setView(View.READ_EMAIL)}
        next={() => setView(View.LANDING_RECOVER_PASS)}
      />
    );
  }

  if (view === View.LANDING_RECOVER_PASS)
    return <RegistrationSuccessLanding cancel={cancel} next={cancel} />;

  if (view === View.READ_SECURITY_CODE) {
    if (!email) return <p>Error interno, no está definido el email</p>;
    return (
      <RegistrationReadCode
        email={email}
        cancel={() => setView(View.READ_EMAIL)}
        next={(token) => {
          setToken(token);
          setView(View.READ_NEW_PASSWORD);
        }}
      />
    );
  }

  return (
    <RegistrationReadMail
      cancel={cancel}
      next={(mail: string) => {
        setEmail(mail);
        setView(View.READ_SECURITY_CODE);
      }}
    />
  );
};
