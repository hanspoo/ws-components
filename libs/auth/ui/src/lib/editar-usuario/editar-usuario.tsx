import React, { useState } from 'react';
import { Alert, Button, Checkbox, Form, Input, Spin } from 'antd';
import { Usuario } from '@starter-ws/db';
import axios from 'axios';
import { useHttpClient } from '../useHttpClient';
import { useDispatch } from 'react-redux';
import { actualizarUsuario } from '@starter-ws/reductor';


type EditarUsuarioProps = {
  usuario: Usuario;
  cancelar(): void
}

export function EditarUsuario({ usuario, cancelar }: EditarUsuarioProps) {

  const dispatch = useDispatch();
  const httpClient = useHttpClient();

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean>();
  const [error, setError] = useState('');

  const onFinish = (values: any) => {
    setLoading(true);

    httpClient.put(`/api/usuarios/${usuario.id}`, values)
      .then((response) => {
        setOk(true);
        dispatch(actualizarUsuario(response.data as Usuario))
        setLoading(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error.response.data));
        setLoading(false);
      });


  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (loading) return <Spin />;
  if (error)
    return <p>{error}</p>

  if (ok === true)
    return <div>
      <span>
        <span>
          <p>
            <Alert
              message="Actualización de usuario"
              description={<div><p>El usuario fue actualizado correctamente.</p><Button onClick={cancelar}>Continuar</Button></div>}
              type="success"
              showIcon
            ></Alert>
          </p>
        </span>
      </span>

    </div>


  return (
    <Form
      layout='vertical'
      name="editar-usuario"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true, nombre: usuario.nombre, email: usuario.email }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Por favor ingrese su email!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
        <Button style={{ marginLeft: '0.25em' }} htmlType="button" onClick={cancelar}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditarUsuario;



