import { RegistrationRequest } from '@starter-ws/auth/api';
import customAxios from '../../customAxios';
import { useState } from 'react';

type RecoverComponentsArgs = {
  cancel: () => void;
  next: (email: string) => void;
};

const emailRegex = /^[a-z].*@(\w+\.)+\w+$/i;

export function RegistrationReadMail({ cancel, next }: RecoverComponentsArgs) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState<string>('');

  const onFinish = (values: any) => {
    const { email } = values;

    setLoading(true);
    const data: RegistrationRequest = { email };

    customAxios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/registration/validate-email`,
        data
      )
      .then(() => {
        next(email);
        // setError(response.statusText); setLoading(false);
      })
      .catch((error) => {
        // next();
        console.log(error);
        setError(error.response.statusText || error.message);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function onChange(e: any) {
    setEmail(e.target.value);
  }

  function onClick() {
    onFinish({ email });
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="form-group  ">
        <label htmlFor="email" className=" control-label">
          Email <span className="required">*</span>
        </label>{' '}
        <input
          className="form-control "
          name="email"
          maxLength={64}
          value={email}
          onChange={onChange}
        />
        <span className="error" />
      </div>
      <p>Validación: Pendiente</p>
      <p>Para continuar es necesario que validemos tu correo electrónico:</p>
      <button
        type="button"
        className="btn btn-primary block"
        disabled={!emailRegex.test(email || '')}
        onClick={onClick}
      >
        {loading ? 'Enviando...' : 'Validar email'}
      </button>
    </>
  );
}
