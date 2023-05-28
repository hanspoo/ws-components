import { Descriptions } from 'antd';
import { Usuario } from '@starter-ws/db';

const { Item } = Descriptions;

type UsuarioDetailProps = {
  usuario: Usuario
}


function UserDetail({ usuario }: UsuarioDetailProps) {

  return <Descriptions bordered column={1} >
    <Item label="id">{usuario.id}</Item>
    <Item label="nombre">{usuario.nombre}</Item>
    <Item label="email">{usuario.email}</Item>
  </Descriptions>

}

export { UserDetail }

