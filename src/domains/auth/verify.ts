import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import { auth } from '@/infra/config';

import type { Logger } from 'pino';
import { TokenPayload } from './types';

function verifyJWT(logger: Logger) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      return reply.status(401).send({ error: 'Token não fornecido' });
    }

    try {
      const [token] = authHeader.split(' ');
      const { id, email } = jwt.verify(token, auth.JWT_KEY) as TokenPayload;
      logger.info({ id, email });
    } catch (err) {
      logger.error({ err });
      return reply.status(400).send({ error: 'Token inválido' });
    }
  };
}

export { verifyJWT };
