import { Empresa } from '@starter-ws/db';

declare module '*.module.css';

declare global {
  namespace Express {
    export interface Request {
      empresa: Empresa;
      user: Usuario;
    }
  }
}
