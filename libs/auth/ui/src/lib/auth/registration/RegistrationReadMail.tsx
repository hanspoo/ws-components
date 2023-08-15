import React, { useState } from 'react';
import styles from '../../auth-form.module.css';
import { Button, Form, Input, Spin, Typography } from 'antd';

import { RegistrationRequest } from '@starter-ws/auth/api';
import customAxios from '../../customAxios';

type RecoverComponentsArgs = {
  cancel: () => void;
  next: (email: string) => void;
};

export function RegistrationReadMail({ cancel, next }: RecoverComponentsArgs) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: 'email', required: true }]}
            >
              <Input autoFocus />
            </Form.Item>
            <p>Validación: Pendiente</p>
            <p>
              Para continuar es necesario que validemos tu correo electrónico:
            </p>
            <div style={{ textAlign: 'center' }}>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '0.1em' }}
                >
                  {loading ? <Spin size="small" /> : 'Validar email'}
                </Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
