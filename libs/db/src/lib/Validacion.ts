import { Usuario } from './entity/auth/usuario.entity';

export class Validacion {
  // Verdadero si u1 puede modificar a u2
  static puedeModificar(u1: Usuario, u2: Usuario): string {
    if (!u1) throw Error('Debe entregar el usuario conectado, u1');
    if (!u2) throw Error('Debe entregar el usuario a modificar');

    const mismaEmpresa = u1.empresa.id === u2.empresa.id;
    const mismoUsuario = u1.id === u2.id;

    if (mismaEmpresa && mismoUsuario) return '';
    if (mismaEmpresa && u1.esAdmin) return '';

    return `${u1.id} no está autorizado param modificar a ${u2.id}`;
  }
}
