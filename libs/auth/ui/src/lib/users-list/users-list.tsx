import { Button, Modal, Table, Typography } from 'antd';
import styles from './users-list.module.css';
import { Usuario } from '@starter-ws/db';
import { useState } from 'react';
import { UserDetail } from '../user-detail/user-detail';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;
/* eslint-disable-next-line */
export interface usuariosListProps {
  usuarios: Usuario[];
}

export function UsersList({ usuarios }: usuariosListProps) {
  const [usuario, setUsuario] = useState<Usuario>();

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      render: (id: string) => (
        <Button
          type="link"
          onClick={() => setUsuario(usuarios.find((u) => u.id === id))}
        >
          {id}
        </Button>
      ),
      sorter: (a: Usuario, b: Usuario) => a.id.localeCompare(b.id),
    },
    {
      title: 'nombre',
      dataIndex: 'nombre',
      sorter: (a: Usuario, b: Usuario) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: (a: Usuario, b: Usuario) => a.email.localeCompare(b.email),
    },
    { title: 'esAdmin', dataIndex: 'esAdmin', render: (esAdmin: boolean) => esAdmin ? <CheckOutlined /> : <CloseOutlined /> },
  ];

  const handleOk = () => {
    setUsuario(undefined);
  };

  const handleCancel = () => {
    setUsuario(undefined);
  };

  return (
    <div className={styles['container']}>
      <Title level={3}>Usuarios</Title>
      {usuario && (
        <Modal
          title={usuario.nombre}
          open={!!usuario}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          width={800}
        >
          <UserDetail usuario={usuario} />
        </Modal>
      )}
      <Table dataSource={usuarios} columns={columns} rowKey={() => 'id'} />
    </div>
  );
}

export default UsersList;
