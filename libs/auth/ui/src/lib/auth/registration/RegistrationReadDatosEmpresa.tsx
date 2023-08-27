import { useState } from 'react';
import styles from '../../auth-form.module.css';
import { Button, Form, Input, Spin, Typography } from 'antd';
import { ExecuteChangePassRequest } from '@starter-ws/auth/api';
import axios from 'axios';

const { Title } = Typography;

type RecoverComponentsArgs = {
  cancel: () => void;
  next: () => void;
  token: string;
  email: string;
};

export function RegistrationReadDatosEmpresa({
  email,
  token,
  cancel,
  next,
}: RecoverComponentsArgs) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = (values: any) => {
    const { password } = values;

    setLoading(true);
    const data: ExecuteChangePassRequest = { email, token, password };

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/registration/company-data`,
        data
      )
      .then(() => {
        next();
        // setError(response.statusText); setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.statusText || error.message);
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
          className="form-control disabled"
          name="email"
          maxLength={64}
          value={email}
          readOnly
        />
        <span className="error" />
      </div>
      <p>Validación: Correo validado exitosamente</p>
    </>
  );
}
