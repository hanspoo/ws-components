import { useState } from 'react';
import styles from '../../auth-form.module.css';
import { Button, Form, Input, Spin, Typography } from 'antd';
import { RequestValidaCodSeguridad } from '@starter-ws/auth/api';
import axios from 'axios';

const { Title } = Typography;

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

  const onFinish = (values: any) => {
    const { cseg } = values;

    setLoading(true);
    const data: RequestValidaCodSeguridad = { email, cseg };

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
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        layout="vertical"
        className={styles['ant-form']}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
              <Input disabled value={email} />
              <span style={{ display: 'none' }}>{email}</span>
            </Form.Item>
            <p>
              Ingresa el código de seguridad que hemos enviado a tu correo
              electrónico:
            </p>

            <Form.Item label="Código de seguridad" name="cseg">
              <Input autoFocus />
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '0.1em' }}
                >
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    'Validar código de seguridad'
                  )}
                </Button>
                <Button style={{ margin: '.5em 0' }} block>
                  Leer de nuevo el email
                </Button>
                <Button block>Reenviar código de seguridad</Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
