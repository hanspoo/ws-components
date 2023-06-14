export async function validate(
  u: Record<string, any>
): Promise<[boolean, Array<string>]> {
  const errors: Array<string> = [];
  if (!/\w+/.test(u.empresa)) errors.push('Empresa inválida');
  if (!/\w+/.test(u.identLegal)) errors.push('Ident legal inválido');
  if (!/\w+/.test(u.nombre)) errors.push('Nombre inválido');
  if (!/\w+/.test(u.email)) errors.push('Email inválido');
  if (!/\w+/.test(u.password)) errors.push('Contraseña inválida');
  if (errors.length > 0) return [false, errors];

  return [true, []];
}
