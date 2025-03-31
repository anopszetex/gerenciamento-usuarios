import type { FastifyInstance } from 'fastify';
import argon2 from 'argon2';

import { UserRoutesOptions } from '@/adapters/server/fastify/types';
import { isEmpty, isValidEmail } from '@/domains/register';

interface RegisterBody {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
}

function userRoutes(app: FastifyInstance, options: UserRoutesOptions) {
  const { database, logger } = options;

  app.post<{ Body: RegisterBody }>('/register', async (req, reply) => {
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

    await database.create<RegisterBody>({
      nome,
      email,
      senha: await argon2.hash(senha),
      cpf,
    });

    logger.info({ user: { nome, email, cpf } }, 'usuário cadastrado');

    return reply
      .status(200)
      .send({ message: 'usuário cadastrado com sucesso' });
  });
}

export { userRoutes };
