import { Me } from '@starter-ws/auth/api';
import { Empresa, Usuario } from '@starter-ws/db';
import express, { Request, Response } from 'express';

export const me = express.Router();

me.get('/', async function (req: Request, res: Response<Me>) {
  const u: Usuario = req['user'];
  const e: Empresa = req['empresa'];
  const me: Me = {
    nombre: u.nombre,
    email: u.email,
    empresa: e.nombre,
  };
  res.send(me);
});
