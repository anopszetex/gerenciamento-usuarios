import fastify from 'fastify';

import { userRoutes } from '@/routes';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Server, ServerListen, Database } from './types';
import type { Logger } from 'pino';

function factoryServer(database: Database, logger: Logger): Server {
  const app = fastify({
    logger: false,
  });

  app.register(userRoutes<FastifyRequest, FastifyReply>, {
    prefix: '/api',
    database,
    logger,
  });

  return {
    async listen(options: ServerListen): Promise<string> {
      const { port, host } = options;

      return app.listen({ port, host });
    },
    async stop(): Promise<void> {
      await app.close();
    },
  };
}

export { factoryServer };
