import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Message } from '@starter-ws/auth/api';
import { auth } from './routers/auth';
import { me } from './routers/me';
import { archivos } from './routers/archivos';
import { TokenService } from '@starter-ws/db';
import { registration } from './routers/registration-router';
import { usuarios } from './routers/usuarios';

type ReqWithSession = Request<
  unknown,
  unknown,
  { username: string; password: string }
> & {
  session: {
    user: string;
    admin: boolean;
    destroy: () => void;
  };
};

// create and setup express app
const app = express();
app.use(
  cors({
    exposedHeaders: ['*'],
    credentials: true,
  })
);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.url);

//   next();
// });
app.use(express.json());
app.use(express.static('public'));
const authMiddleware = async function (
  req: ReqWithSession,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers['authorization'];
  if (authorization) {
    const [, token] = authorization.trim().split(/ /);
    if (token) {
      const t = await new TokenService().find(token);
      if (!t) {
        return res.status(401).send(`Token ${token} no encontrado`);
      }
      req['user'] = t.usuario;
      req['empresa'] = t.usuario.empresa;

      return next();
    }
  } else {
    console.log('Petición sin token: ' + req.url);
    return res.sendStatus(401);
  }
};

const greeting: Message = { message: 'Welcome to the api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.use('/api/archivos', archivos);
app.use('/api/usuarios', authMiddleware, usuarios);
app.use('/api/auth', auth);
app.use('/api/registration', registration);
app.use('/api/me', authMiddleware, me);

export { app };
