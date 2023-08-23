import { useState } from 'react';
import { RequestValidaCodSeguridad } from '@starter-ws/auth/api';
import axios from 'axios';

type RegistrationReadCodeArgs = {
  cancel: () => void;
  next: (token: string) => void;
  email: string;
};

export function RegistrationReadCode({
  email,
  cancel,
  next,
}: RegistrationReadCodeArgs) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [codigo, setCodigo] = useState<number>();

  const onFinish = (values: any) => {
    if (typeof codigo === 'undefined') {
      setError('Debe ingresar el código');
      return;
    }
    setLoading(true);
    const data: RequestValidaCodSeguridad = { email, cseg: codigo };

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/valida-cod-seguridad`,
        data
      )
      .then((response) => {
        const { token } = response.data;
        if (!token) {
          setError('Error grave, no llegó el token en respuesta');
          return;
        }
        next(token);
        // setError(response.statusText); setLoading(false);
      })
      .catch((error) => {
        // next();
        console.log(error);
        setError(error.response.statusText || error.message);
        setTimeout(() => setError(''), 2000);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
          disabled
        />
        <span className="error" />
      </div>
      <p>Validación: Pendiente</p>

      <p>
        Ingresa el código de seguridad que hemos enviado a tu correo
        electrónico:
      </p>

      <div className="form-group  ">
        <label htmlFor="codigo" className=" control-label">
          Código de seguridad <span className="required">*</span>
        </label>{' '}
        <input
          className="form-control "
          name="codigo"
          maxLength={64}
          value={codigo}
          onChange={(e: any) => setCodigo(e.target.value)}
        />
        <span className="error" />
      </div>

      <div>
        <div>
          <button
            disabled={!(codigo && codigo.toString().length === 6)}
            type="button"
            className="btn btn-primary"
            onClick={onFinish}
          >
            {loading ? 'enviando...' : 'Validar código de seguridad'}
          </button>
          <button
            type="button"
            className="btn btn-default"
            style={{ margin: '0.5em 0' }}
            onClick={cancel}
          >
            Cambiar el email
          </button>
        </div>
        {error && <p>Código inválido, intente nuevamente</p>}
      </div>
    </>
  );
}
