import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// import type { FastifyInstance } from 'fastify';
import type { LoginBody, RegisterBody, UsersBody } from './types';

import { UserRoutesOptions } from '@/adapters/server/fastify/types';
import { isEmpty, isValidEmail } from '@/domains/register';

// import { auth } from '@/infra/config';
// import { verifyJWT } from '@/domains/auth/verify';
// import { anonymizeCPF } from '@/domains/users/anonymizeCPF';
import { ServerAdapter } from '@/adapters/types';
import { auth } from '@/infra/config';

type ResponseLike = {
  status: (code: number) => ResponseLike;
  send: (body: unknown) => void;
};

function userRoutes<Request, Response extends ResponseLike>(
  app: ServerAdapter<Request, Response>,
  options: UserRoutesOptions
) {
  const { database, logger } = options;

  console.count('ok');

  app.post<RegisterBody>(
    '/register',
    async (req: Request & { body: RegisterBody }, reply: Response) => {
      console.log('chegou aqui dsakdjalksdjaskla');

      const { nome, email, senha, cpf } = req.body;

      if (isEmpty(nome)) {
        return reply.status(400).send({ error: 'nome não pode ser vazio' });
      }

      if (isEmpty(email)) {
        return reply.status(400).send({ error: 'email não pode ser vazio' });
      }

      if (isEmpty(senha)) {
        return reply.status(400).send({ error: 'senha não pode ser vazio' });
      }

      if (!isValidEmail(email)) {
        return reply.status(400).send({ error: 'email inválido' });
      }

      const [emailExists, cpfExists] = await Promise.all([
        database.findOne<RegisterBody>('usuarios', 'email', email),
        database.findOne<RegisterBody>('usuarios', 'cpf', cpf),
      ]);

      if (emailExists) {
        return reply.status(400).send({ error: 'email já existente' });
      }

      if (cpfExists) {
        return reply.status(400).send({ error: 'cpf já existente' });
      }

      await database.create<RegisterBody>('usuarios', {
        nome,
        email,
        senha: await argon2.hash(senha),
        cpf,
      });

      logger.info({ user: { nome, email, cpf } }, 'usuário cadastrado');

      return reply
        .status(201)
        .send({ message: 'usuário cadastrado com sucesso' });
    }
  );

  app.post<LoginBody>(
    '/login',
    async (req: Request & { body: LoginBody }, reply: Response) => {
      const { email, senha } = req.body;

      if (isEmpty(email)) {
        return reply.status(400).send({ error: 'email não pode ser vazio' });
      }

      if (isEmpty(senha)) {
        return reply.status(400).send({ error: 'senha não pode ser vazio' });
      }

      const user = await database.findOne<LoginBody & { id: number }>(
        'usuarios',
        'email',
        email
      );

      if (!user?.email) {
        logger.warn(`usuário não encontrado ${user?.email}`);
        return reply.status(400).send('Usuário não encontrado');
      }

      const isValidPassword = await argon2.verify(user?.senha, senha);

      if (!isValidPassword) {
        logger.warn(`Password not match: ${email}`);
        return reply.status(400).send({ error: 'usuário não encontrado' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, auth.JWT_KEY, {
        expiresIn: '2h',
      });

      logger.info('usuario autenticado com sucesso');

      return reply.status(200).send({ token });
    }
  );

  // app.get(
  //   '/users',
  //   { preHandler: verifyJWT(logger) },
  //   async (req: Request, reply: Response) => {
  //     const users = await database.findAll<UsersBody>('usuarios', ['*']);

  //     const list = [];

  //     for (const user of users) {
  //       list.push({
  //         id: user.id,
  //         email: user.email,
  //         cpf: anonymizeCPF(user.cpf),
  //       });
  //     }

  //     return reply.send(list);
  //   }
  // );
}

export { userRoutes };
