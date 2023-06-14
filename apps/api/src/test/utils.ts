import request from 'supertest';
import { LoginRequest } from '@starter-ws/auth/api';
import { dataSource, Archivo } from '@starter-ws/db';
import { app } from '../app';

const archivo = {
  originalname: 'orden-un-local.xls',
  mimetype: 'application/vnd.ms-excel',
  destination: '/home/julian/embarcadero/uploads',
  filename: '5d3b12762f0a5879d7e6be12d62c4154',
  path: '/home/julian/embarcadero/b2b-alone/apps/api/src/test/orden-una-linea.xls',
  size: 665088,
};

const repoArchivo = dataSource.getRepository(Archivo);
export async function crearArchivoValido(): Promise<Archivo> {
  return await repoArchivo.save({ ...archivo });
}
export async function crearArchivoInvalido(): Promise<Archivo> {
  return await repoArchivo.save({
    ...archivo,
    filename: '',
    path: '',
    destination: '',
  });
}

export async function logear() {
  const credentials: LoginRequest = {
    email: 'admin@starter.com',
    password: '123456',
  };
  const loginResult = await request(app)
    .post('/api/auth/login')
    .send(credentials);

  return loginResult.headers['x-token'];
}
