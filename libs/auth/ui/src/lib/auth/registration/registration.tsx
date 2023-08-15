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
export const Registration: React.FC<{
  cancel: () => void;
  onSuccess: (email: string, token: string) => void;
}> = ({ cancel, onSuccess }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['login-form']}>
        <DoRegistration cancel={cancel} onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export const DoRegistration: React.FC<{
  cancel: () => void;
  onSuccess: (email: string, token: string) => void;
}> = ({ cancel, onSuccess }) => {
  const [view, setView] = useState(View.READ_EMAIL);
  const [email, setEmail] = useState<string>();
  const [token, setToken] = useState<string>();

  if (view === View.READ_NEW_PASSWORD) {
    if (!email) return <p>Error interno, no está definido el email (2)</p>;
    if (!token) return <p>Error interno, no está definido el token (2)</p>;

    onSuccess(email, token);
    return (
      <RegistrationReadDatosEmpresa
        token={token}
        email={email}
        cancel={cancel}
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
        cancel={cancel}
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
