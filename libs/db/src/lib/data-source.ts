import * as crypto from 'node:crypto';
import { DataSource } from 'typeorm';
import { Archivo } from './entity/archivo.entity';
import { Empresa } from './entity/auth/empresa.entity';
import { Token } from './entity/auth/token.entity';
import { Usuario } from './entity/auth/usuario.entity';

import { SolicitudRegistro } from './entity/auth/solicitud-registro.entity';
import { SolicitudAutenticarEmail } from './entity/auth/solicitud-autenticar-email.entity';
import { PermisoUsarEmail } from './entity/auth/permiso-usar-email.entity';
const LOGGING = !!process.env['DEBUG_DB'] || false;
const testEnv = 'test';

const dbArgs: any = {
  type: 'sqlite',
  host: process.env['VITE_DB_HOST'] || 'localhost',
  username: process.env['VITE_DB_USER'] || 'starter',
  password: process.env['VITE_DB_PASS'] || 'starter',

  database:
    process.env['NODE_ENV'] === testEnv
      ? '/tmp/db/' + crypto.randomBytes(12).toString('hex')
      : process.env['VITE_DB_NAME'] || 'starter',
};

const dataSource = new DataSource({
  ...dbArgs,
  entities: [
    Archivo,
    Empresa,
    Usuario,
    Token,
    SolicitudRegistro,
    SolicitudAutenticarEmail,
    PermisoUsarEmail,
  ],
  logging: LOGGING,
  synchronize: true,

  extra: { max: 10, connectionTimeoutMillis: 3000 },
});

export { dataSource };
