import * as express from 'express';
import { Request, Response } from 'express';

import { dataSource, Empresa, Usuario, Validacion } from '@starter-ws/db';
import { log } from 'console';

const usuarios = express.Router();
usuarios.get('/', async function (req: Request, res: Response) {
  const e: Empresa = req['empresa'];
  const list = await dataSource
    .getRepository(Usuario)
    .find({ where: { empresa: e } });
  res.json(
    list.map((u) => {
      delete u.password;
      return u;
    })
  );
});

usuarios.post('/', async (req: Request, res) => {
  const repo = dataSource.getRepository(Usuario);

  const user: Usuario = repo.create(req.body) as any as Usuario;
  user.empresa = req.empresa;

  const nuevoUsuario = await repo.save(user);

  res.send(nuevoUsuario);
});

usuarios.put(
  '/:id',
  async (req: Request<{ id: string }, any, Partial<Usuario>>, res) => {
    // recuperar el usuario que hay que modificar

    const { id } = req.params;
    const repo = dataSource.getRepository(Usuario);
    const usuarioModificar = await repo.findOne({
      where: { id },
      relations: ['empresa'],
    });
    if (!usuarioModificar)
      return res.status(404).send(`Usuario ${id} no encontrado`);

    const error = Validacion.puedeModificar(req.user, usuarioModificar);
    if (error) {
      return res.status(401).send(error);
    }

    usuarioModificar.email = req.body.email;
    usuarioModificar.nombre = req.body.nombre;

    const modificado = await repo.save(usuarioModificar);
    delete modificado.password;
    res.send(modificado);
  }
);
// usuarios.get(
//   '/:id',
//   async function (req: Request<{ id: number }>, res: Response) {
//     if (!req.params.id)
//       return res
//         .status(400)
//         .send('No viene el id de usuario: ' + req.params.id);
//     const usuario = await dataSource
//       .getRepository(Usuario)
//       .findOne({ where: { id: req.params.id } });
//     if (!usuario)
//       return res.status(404).send(`Usuario ${req.params.id} no encontrado`);
//     return res.send(usuario);
//   }
// );

// const upload = multer({ dest: UPLOAD_FOLDER });
// usuarios.post('/', upload.single('file'), async function (req: any, res) {
//   console.log(req.file);

//   const user = await dataSource.getRepository(Usuario).create(req.file);
//   const results = await dataSource.getRepository(Usuario).save(user);
//   return res.send(results);
// });

// usuarios.put('/:id', async function (req: Request, res: Response) {
//   const user = await dataSource.getRepository(Usuario).findOneBy({
//     id: req.params.id as unknown as number,
//   });
//   dataSource.getRepository(Usuario).merge(user, req.body);
//   const results = await dataSource.getRepository(Usuario).save(user);
//   return res.send(results);
// });

// usuarios.delete('/:id', async function (req: Request, res: Response) {
//   const results = await dataSource.getRepository(Usuario).delete(req.params.id);
//   return res.send(results);
// });

export { usuarios };
