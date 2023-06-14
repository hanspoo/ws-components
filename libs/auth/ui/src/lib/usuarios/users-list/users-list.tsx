import { Breadcrumb, Button, Modal, Table, Typography } from 'antd';
import styles from './users-list.module.css';
import { Usuario } from '@starter-ws/db';
import { useState } from 'react';
import { UserDetail } from '../user-detail/user-detail';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;
/* eslint-disable-next-line */
export interface usuariosListProps {
  usuarios: Usuario[];
}

const crumbs = [{ title: <Link to="/">home</Link> }, { title: <Link to="/usuarios">usuarios</Link> }];

export function UsersList({ usuarios }: usuariosListProps) {
  const [usuario, setUsuario] = useState<Usuario>();

  const columns = [
    {
      title: 'nombre',
      dataIndex: 'nombre',
      render: (nombre: string, row: Usuario) => <Link to={`/usuarios/${row.id}`}>{nombre}</Link>,
      sorter: (a: Usuario, b: Usuario) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: (a: Usuario, b: Usuario) => a.email.localeCompare(b.email),
    },
    {
      title: 'esAdmin',
      dataIndex: 'esAdmin',
      render: (esAdmin: boolean) =>
        esAdmin ? <CheckOutlined /> : <CloseOutlined />,
    },
  ];



  return (
    <div className={styles['container']}>
      <Breadcrumb items={crumbs} />
      <Table style={{ marginTop: '1em' }} dataSource={usuarios} columns={columns} rowKey={() => 'id'} />
    </div>
  );
}

export default UsersList;
