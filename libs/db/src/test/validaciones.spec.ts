import { inicializarSistema } from '../lib/inicializarSistema';
import { Validacion } from '../lib/usuarios/Validacion';
import { BuilderUsuarios } from './BuilderUsuarios';

beforeAll(async () => {
  await inicializarSistema();
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
  it('Usuario de otra empresa no puede modificar', async () => {
    const [luke] = await new BuilderUsuarios().build();
    const [goku] = await new BuilderUsuarios().build();

    const error = Validacion.puedeModificar(luke, goku);
    expect(error).toBeTruthy();
  });
  it('Usuario misma empresa no admin no puede modificar', async () => {
    const [luke, han] = await new BuilderUsuarios().build();

    const error1 = Validacion.puedeModificar(luke, han);
    expect(error1).toBeTruthy();
    const error2 = Validacion.puedeModificar(han, luke);
    expect(error2).toBeTruthy();
  });
  it('Usuario misma empresa admin lo puede modificar', async () => {
    const [luke, han, yoda] = await new BuilderUsuarios().build();

    const error = Validacion.puedeModificar(yoda, han);
    expect(error).toBe('');
  });
  it('se puede modificar a si mismo', async () => {
    const [luke] = await new BuilderUsuarios().build();

    const error = Validacion.puedeModificar(luke, luke);
    expect(error).toBe('');
  });
});
