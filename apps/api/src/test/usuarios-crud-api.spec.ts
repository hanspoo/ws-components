import {
  BuilderUsuarios,
  Usuario,
  dataSource,
  inicializarSistema,
} from '@starter-ws/db';
import request from 'supertest';
import { logear } from './utils';
import { app } from '../app';
import { randomEmail } from '@starter-ws/shared';

beforeAll(async () => {
  await inicializarSistema();
});

let usuario: Usuario;
beforeEach(() => {
  usuario = new Usuario();
  usuario.nombre = 'Pato donald';
  usuario.email = randomEmail();
  usuario.password = '123456';
});

describe('crud de usuarios', () => {
  it('usuario válido y logeado responde con 200', async () => {
    const token = await logear();
    const response = await request(app)
      .post('/api/usuarios')
      .send(usuario)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    const u = response.body as Usuario;
    expect(u.nombre).toEqual('Pato donald');
    expect(u.id).toBeTruthy();
    expect(u.empresa).toBeTruthy();
  });
});

/**
 * Modificar un usuario
 *
 * - Seguridad ¿ quien puede modificarlo ?
 *
 * 1.- un administrador de su misma empresa
 * 2.- el mismo
 *
 * pruebas:
 * 1.- Un usuario sin logear, debe dar error de autorización
 *
 * como es modificación
 * tenemos el usuario admin principal
 *
 * 2.- Un usuario logeado de otra empresa, debe dar error de autorización
 * 3.- Un usuario logeado de misma empresa pero no admin, debe dar error de autorización
 * 4.- El mismo usuario logeado, debe dar 200
 * 5.- Un admin de la misma empresa, debe dar 200
 *
 * 6.- Si pasa empresa, la debe dejar igual
 * 7.- Si pasa flag de admin y no es admin, la debe dejar igual
 *
 *
 *
 * - Que datos puede cambiar
 *
 * - Sólo: nombre, contraseña y email
 *
 */

describe('Modificar un usuario', () => {
  it('Un usuario sin logear, debe dar error de autorización', async () => {
    const response = await request(app).put('/api/usuarios').send(usuario);
    expect(response.status).toBe(401);
  });
  it('Un usuario logeado de otra empresa, debe dar error de autorización', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsuarios().build();
    const response = await request(app)
      .put('/api/usuarios/' + usuario.id)
      .set('Authorization', `Basic ${token.id}`)
      .send(usuario);
    expect(response.status).toBe(401);
  });
  it('Un usuario logeado de misma empresa pero no admin, debe dar error de autorización', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsuarios().build();
    const response = await request(app)
      .put('/api/usuarios/' + u2.id)
      .set('Authorization', `Basic ${t1.id}`)
      .send(usuario);
    expect(response.status).toBe(401);
  });
  it('El mismo usuario logeado, debe dar 200', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsuarios().build();
    const response = await request(app)
      .put('/api/usuarios/' + u1.id)
      .set('Authorization', `Basic ${t1.id}`)
      .send(usuario);

    console.log(response.text);
    expect(response.status).toBe(200);
  });
  it('Se modifica el nombre de acuerdo a entregado', async () => {
    const [u1, u2, admin, token, t1, t2, t3] =
      await new BuilderUsuarios().build();
    const response = await request(app)
      .put('/api/usuarios/' + u1.id)
      .set('Authorization', `Basic ${t1.id}`)
      .send({ ...usuario, nombre: 'Luke', email: 'start@wars.com' });

    const repo = dataSource.getRepository(Usuario);
    const modificado = await repo.findOne({
      where: { id: u1.id },
    });

    expect(modificado.nombre).toBe('Luke');
    expect(modificado.email).toBe('start@wars.com');
  });
});
