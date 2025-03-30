import type { FastifyInstance } from 'fastify';
import { UserRoutesOptions } from '@/adapters/server/fastify/types';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

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

    if (!nome?.trim()) {
      throw new TypeError('nome não pode ser vazio');
    }

    if (!email?.trim()) {
      throw new TypeError('email não pode ser vazio');
    }

    if (!senha?.trim()) {
      throw new TypeError('senha não pode ser vazio');
    }

    if (!cpf?.trim()) {
      throw new TypeError('cpf não pode ser vazio');
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      throw new TypeError('email inválido');
    }

    logger.info({ nome, email, cpf });

    const data = req.body;

    await database.create<RegisterBody>(data);

    logger.info('Cadastro realizado com sucesso');

    return reply.send('ok');
  });

  // app.post('/login', (req, reply) => {});

  app.get('/users', () => {
    return [];
  });
}

export { userRoutes };
