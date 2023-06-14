import { Col, Descriptions } from 'antd';
import { Usuario } from '@starter-ws/db';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditarUsuario from '../editar-usuario/editar-usuario';

const { Item } = Descriptions;

type UsuarioDetailProps = {
  usuario: Usuario;
};


const box: React.CSSProperties = {
  fontSize: '100px',
  backgroundColor: 'coral',
  height: '300px',
  width: '300px',
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  color: "white"
}

const container: React.CSSProperties = {

  marginTop: '1em',
  display: 'flex',
  justifyContent: "flex-start",
  alignItems: "flex-start",
}
function UserDetail({ usuario }: UsuarioDetailProps) {

  const [editar, setEditar] = useState(false);

  return (
    <div style={container}>
      <Col style={{ margin: '1em' }}>
        <div style={box}>{usuario.nombre.substring(0, 1).toUpperCase()}</div>
      </Col>
      <Col style={{ margin: '1em' }} span={16}>

        {editar ? <EditarUsuario usuario={usuario} cancelar={() => setEditar(false)} /> :
          <Descriptions column={1} layout='vertical'>
            <Item label="nombre">{usuario.nombre} <EditOutlined onClick={() => setEditar(true)} style={{ color: "brown", marginLeft: '1em' }} /></Item>
            <Item label="email">{usuario.email}</Item>
            <Item label="id">{usuario.id}</Item>
            <Item label="esAdmin">{usuario.esAdmin ? "Si" : "No"}</Item>
          </Descriptions>}

      </Col>
    </div >
  );
}

export { UserDetail };
