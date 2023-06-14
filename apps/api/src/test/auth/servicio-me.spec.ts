import { inicializarSistema } from '@starter-ws/db';
import request from 'supertest';
import { app } from '../../app';
import { logear } from '../utils';

beforeAll(async () => {
  await inicializarSistema();
});

describe('servicio me', () => {
  it('debe entregar 401 no autorizado sin token', async () => {
    const response = await request(app).get('/api/me');
    expect(response.status).toBe(401);
  });
  it('debe entregar 200 cuando hay token', async () => {
    const token = await logear();
    const response = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('debe entregar datos de usuario cuando hay token', async () => {
    const token = await logear();
    const response = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      nombre: 'Admin',
      email: 'admin@starter.com',
      empresa: 'starter',
    });
  });
});
