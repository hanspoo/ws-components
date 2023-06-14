import { randomEmail } from '@starter-ws/shared';
import { dataSource } from '../lib/data-source';
import { Empresa } from '../lib/entity/auth/empresa.entity';
import { Token } from '../lib/entity/auth/token.entity';
import { Usuario } from '../lib/entity/auth/usuario.entity';

export class BuilderUsuarios {
  empresa: Empresa;

  withEmpresa(e: Empresa) {
    this.empresa = e;
  }

  async build(): Promise<
    [Usuario, Usuario, Usuario, Empresa, Token, Token, Token]
  > {
    const nueva = new Empresa();
    nueva.nombre = randomEmail();

    const e = this.empresa || nueva;
    const u1 = crearUsuario(e);
    const u2 = crearUsuario(e);
    const u3 = crearUsuario(e);
    u3.esAdmin = true;

    const empresa = await dataSource.getRepository(Empresa).save(e);
    const [usr1, usr2, usr3] = await dataSource
      .getRepository(Usuario)
      .save([u1, u2, u3]);

    const t1 = await tokenParaUsuario(usr1);
    const t2 = await tokenParaUsuario(usr2);
    const t3 = await tokenParaUsuario(usr3);

    return [u1, u2, u3, empresa, t1, t2, t3];
  }
}

function crearUsuario(e: Empresa) {
  const u = new Usuario();

  u.email = randomEmail();
  u.nombre = u.password = u.email;
  u.empresa = e;

  return u;
}

async function tokenParaUsuario(u: Usuario): Promise<Token> {
  const t1 = new Token();
  t1.usuario = u;

  return await dataSource.getRepository(Token).save(t1);
}
