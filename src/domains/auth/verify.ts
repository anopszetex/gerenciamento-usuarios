import { auth } from '@/infra/config';
import { FastifyReply, FastifyRequest } from 'fastify';

import jwt from 'jsonwebtoken';
async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: 'Token não fornecido' });
  }

  try {
    const [token] = authHeader.split(' ');
    console.log(auth.JWT_KEY);
    const decoded = jwt.verify(token, auth.JWT_KEY);
  } catch {
    // console.log(err?.message);
    return reply.status(400).send({ error: 'Token inválido' });
  }
}

export { verifyJWT };
